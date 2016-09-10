import { API_KEY, LANGS } from './constants.js'

/**
 * Detect language of provided text
 *
 * @param  {String} text
 * @return {Promise}
 */
export default (text) => {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/detect?key=${API_KEY}&text=${encodeURIComponent(text)}&hint=${LANGS.join(',')}`;
  return fetch(url)
    .then(response => response.json())
    .then(response => {
      if (response.code !== 200) {
        throw response.message;
      }
      return response.lang;
    });
}
