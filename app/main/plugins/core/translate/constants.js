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

  'голлан*': 'nl',
  'dutc*': 'nl',

  'pers*': 'fa',
  'перс*': 'fa',

  'укра*': 'uk',
  'ukra*': 'uk',

  'catal*': 'ca',
  'катал*': 'ca',

  'chin*': 'zh',
  'кита*': 'zh',

  'arab*': 'ar',
  'араб*': 'ar',

  'belarus*': 'be',
  'белорус*': 'be',

  'hungar*': 'hu',
  'венгер*': 'hu',

  'viet*': 'vi',
  'вьет*': 'vi',

  'дастк*': 'da',

  'hebr*': 'he',
  'иври*': 'he',

  'идиш*': 'yi',
  'yidd*': 'yi',

  'indones*': 'id',
  'индонез*': 'id',

  'ирлан*': 'ga',

  'icela*': 'is',
  'ислан*': 'is',

  'казах*': 'kz',
  'киргиз*': 'ky',

  'корей*': 'ko',
  'korea*': 'ko',

  'latv*': 'lv',
  'латв*': 'lv',

  'lith*': 'lt',
  'литов*': 'lt',

  'norw*': 'no',
  'норв*': 'no',

  'польск*': 'pl',

  'portug*': 'pt',
  'португ*': 'pt',

  'румын*': 'ro',

  'словац*': 'sk',

  'sloven*': 'sl',
  'словен*': 'sl',

  'тай*': 'th',
  'турец*': 'tr',

  'finni*': 'fi',
  'финск*': 'fi',

  'чешс*': 'cs',
  'шведс*': 'sv',

  'эстон*': 'et',
  'эсперан*': 'eo',
  'япон*': 'ja'
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
  fr: 'French',
  nl: 'Dutch',
  fa: 'Persian',
  uk: 'Ukrainian',
  ca: 'Catalan',
  zh: 'Chinese',
  ar: 'Arab',
  be: 'Belarusian',
  hu: 'Hungarian',
  vi: 'Vietnamese',
  da: 'Danish',
  he: 'Hebrew',
  yi: 'Yiddish',
  id: 'Indonesian',
  ga: 'Irish',
  is: 'Icelandic',
  kk: 'Kazakh',
  ky: 'Kyrgyz',
  ko: 'Korean',
  lv: 'Latvian',
  lt: 'Lithuanian',
  no: 'Norwegian',
  pl: 'Polish',
  pt: 'Portuguese',
  ro: 'Romanian',
  sk: 'Slovak',
  sl: 'Slovenian',
  th: 'Thai',
  tr: 'Turkish',
  fi: 'Finnish',
  hi: 'Hindi',
  cs: 'Czech',
  sv: 'Swedish',
  et: 'Estonian',
  eo: 'Esperanto',
  ja: 'Japanese'
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
