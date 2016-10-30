import { LANGS } from './constants';
import { get } from 'lib/config';

/**
 * Get default target language by source language
 *
 * @param  {String} lang
 * @return {String}
 */
export default (lang) => {
  if (lang !== get('lang')) {
    return get('lang');
  }
  // We suppose that LANGS sorted by priority so we just return first language
  // that is not from locale
  return LANGS.find(lang => lang !== get('lang'));
}
