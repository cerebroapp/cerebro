/**
 * Detect target language by source text
 * @param  {String} text
 * @return {String}
 */
export default (text) => {
  if (text.match(/[а-яА-Я]/i)) {
    return 'en';
  }
  return 'ru';
}
