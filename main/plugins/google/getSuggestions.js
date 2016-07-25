/**
 * Get google suggestions for entered query
 * @param  {String} query
 * @return {Promise}
 */
export default function(query) {
  const url = `http://suggestqueries.google.com/complete/search?client=firefox&q=${query}`;
  return fetch(url)
    .then(response => response.json())
    .then(response => response[1])
}
