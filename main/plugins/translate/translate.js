import { API_KEY, LANGS } from './constants.js'

/**
 * Translate text using Yandex.Translate api
 *
 * @param  {String} text
 * @param  {String} direction Target language code
 * @return {Promise}
 */
export default (text, direction) => {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${encodeURIComponent(text)}&lang=${direction}`;
  return fetch(url)
    .then(response => response.json())
    .then(response => {
      if (response.code !== 200) {
        throw response.message;
      }
      return response;
    });
}
