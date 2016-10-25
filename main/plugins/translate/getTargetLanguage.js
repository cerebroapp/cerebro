import { LANGS } from './constants';
import { lang as  localeLanguage } from 'lib/config';

/**
 * Get default target language by source language
 *
 * @param  {String} lang
 * @return {String}
 */
export default (lang) => {
  if (lang !== localeLanguage) {
    return localeLanguage;
  }
  // We suppose that LANGS sorted by priority so we just return first language
  // that is not from locale
  return LANGS.find(lang => lang !== localeLanguage);
}
