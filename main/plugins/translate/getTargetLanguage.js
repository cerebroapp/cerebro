import { LANGS } from './constants';

/**
 * Get default target language by source language
 *
 * @param  {String} lang
 * @return {String}
 */
export default (lang, userLang) => {
  if (lang !== userLang) {
    return userLang;
  }
  // We suppose that LANGS sorted by priority so we just return first language
  // that is not from locale
  return LANGS.find(lang => lang !== userLang);
}
