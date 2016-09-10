import { API_KEY } from './constants.js'

/**
 * Translate text using Yandex.Translate api
 *
 * @param  {String} text
 * @param  {String} direction Translation direction
 *    it can be target language (in this case source language will be detected)
 *    or pair of source and target languages, like `en-ru`
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
