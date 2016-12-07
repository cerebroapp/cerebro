import { memoize } from 'cerebro-tools'

/**
 * Get google suggestions for entered query
 * @param  {String} query
 * @return {Promise}
 */
const getSuggestions = (query) => {
  const url = `http://suggestqueries.google.com/complete/search?client=firefox&q=${query}`
  return fetch(url)
    .then(response => response.json())
    .then(response => response[1] || [])
}


export default memoize(getSuggestions, {
  length: false,
  promise: 'then',
  // Expire translation cache in 30 minutes
  maxAge: 30 * 60 * 1000,
  preFetch: true
})
