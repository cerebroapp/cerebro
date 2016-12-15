import { LANGS } from './constants'

/**
 * Get default target language by source language
 *
 * @param  {String} language
 * @return {String}
 */
export default (language, userLang) => {
  if (language !== userLang) {
    return userLang
  }
  // We suppose that LANGS sorted by priority so we just return first language
  // that is not from locale
  return LANGS.find(lang => lang !== userLang)
}
