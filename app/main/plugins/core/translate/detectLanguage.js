import { API_KEY, LANGS } from './constants.js'
import memoize from 'memoizee'

/**
 * Detect language of provided text
 *
 * @param  {String} text
 * @return {Promise}
 */
const detectLanguage = (text) => {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/detect?key=${API_KEY}&text=${encodeURIComponent(text)}&hint=${LANGS.join(',')}`
  return fetch(url)
    .then(response => response.json())
    .then(response => {
      if (response.code !== 200) {
        throw response.message
      }
      return response.lang
    })
}

export default memoize(detectLanguage, {
  maxAge: 10 * 60 * 1000
})
