/* eslint max-len:0 */
/**
 * Yandex translate API key:
 * @type {String}
 */
export const API_KEY = 'trnsl.1.1.20160805T150627Z.ae65df04cc8d53ee.aa50e499437fd517837eabb12220e8e61e99217a'

/**
 * List of synonims for languages
 * @type {Object}
 */
export const SYNONIMS = {
  'испан*': 'es',
  'spani*': 'es',
  'espa*': 'es',

  'eng*': 'en',
  'англ*': 'en',

  'rus*': 'ru',
  'рус*': 'ru',

  'ital*': 'it',
  'итал*': 'it',

  'germ*': 'de',
  'немец*': 'de',
  'герм*': 'de',

  'fra*': 'fr',
  'фра*': 'fr',
}


/**
 * List of Display names for languages
 * TODO: Use i18n or something like this?
 *
 * @type {Object}
 */
export const DISPLAY_NAMES = {
  en: 'English',
  ru: 'Russian',
  es: 'Spanish',
  it: 'Italian',
  de: 'German',
  fr: 'French'
}

/**
 * List of supported languages
 * @type {Array}
 */
export const LANGS = Object.keys(DISPLAY_NAMES)

// Main regexp parts
const textRegexp = /.+/
const langRegexp = /[\W\wа-яА-Я]+/

const mainRegexpString = [
  // Start of line
  '^',
  // Text to translate
  `(${textRegexp.source})`,
  // Any count of spaces and any of word that shows direction of translation
  '\\s+(?:to|in|по)?\\s+',
  // Target language
  `(${langRegexp.source})`,
  // End of line
  '$'
].join('')

// Main regexp to match translation
export const REGEXP = new RegExp(mainRegexpString, 'i')


// Id for item in results list
export const id = 'web-translate'
