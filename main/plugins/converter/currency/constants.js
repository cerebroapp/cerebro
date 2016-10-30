/* eslint quote-props: 0 */

import { get } from 'lib/config';

/**
 * List of all supported currencies
 * @type {Array}
 */
export const CURRENCIES = [
  'aud', 'bgn', 'brl', 'cad', 'chf', 'cny',
  'czk', 'dkk', 'eur', 'gbp', 'hkd', 'hrk',
  'huf', 'idr', 'ils', 'inr', 'jpy', 'krw',
  'mxn', 'myr', 'nok', 'nzd', 'php', 'pln',
  'ron', 'rub', 'sek', 'sgd', 'thb', 'try',
  'usd', 'zar'
];

/**
 * Array of prioritized currencies
 * @type {Array}
 */
export const PRIORITY_CURRENCIES = [
  'rub',
  'usd',
  'eur'
];

/**
 * Hash of currencies by locale countries
 * @type {Object}
 */
const CURRENCY_BY_COUNTRY = {
  'AU': 'aud',
  'US': 'usd',
  'CA': 'cad',
  'CH': 'chf',
  'CN': 'cny',
  'GB': 'gbp',
  'HK': 'hkd',
  'KR': 'krw',
  'NZ': 'nzd',
  'PH': 'php',
  'RU': 'rub',
  'SG': 'sgd',
  'ZA': 'zar',
  'AD': 'EUR',
  'AT': 'EUR',
  'AX': 'EUR',
  'BE': 'EUR',
  'BL': 'EUR',
  'CY': 'EUR',
  'DE': 'EUR',
  'EE': 'EUR',
  'ES': 'EUR',
  'FI': 'EUR',
  'FR': 'EUR',
  'GF': 'EUR',
  'GP': 'EUR',
  'GR': 'EUR',
  'IE': 'EUR',
  'IT': 'EUR',
  'LU': 'EUR',
  'MC': 'EUR',
  'ME': 'EUR',
  'MF': 'EUR',
  'MQ': 'EUR',
  'MT': 'EUR',
  'NL': 'EUR',
  'PM': 'EUR',
  'PT': 'EUR',
  'RE': 'EUR',
  'SI': 'EUR',
  'SK': 'EUR',
  'SM': 'EUR',
  'TF': 'EUR',
  'VA': 'EUR',
  'YT': 'EUR'
}

/**
 * Hash of currencies by locale language
 * @type {Object}
 */
const CURRENCY_BY_LANG = {
  'bg': 'bgn',
  'cs': 'czk',
  'da': 'dkk',
  'hr': 'hrk',
  'hu': 'huf',
  'id': 'idr',
  'he': 'ils',
  'hi': 'inr',
  'ja': 'jpy',
  'ms': 'myr',
  'nb': 'nok',
  'nn': 'nok',
  'no': 'nok',
  'ru': 'rub',
}

/**
 * Default currency for user. We are trying to guess it by locale.
 * @type {String}
 */
export const BASE_CURRENCY = CURRENCY_BY_COUNTRY[get('country')]
  || CURRENCY_BY_LANG[get('lang')]
  || 'usd';

/**
 * Object of synonims of currencies for better matching them in search queries
 * @type {Object}
 */
export const SYNONIMS = {
  'франк*': 'chf',
  'franc*': 'chf',
  '₣': 'chf',

  'real*': 'brl',
  'реал*': 'brl',

  'kun*': 'hrk',
  'кун*': 'hrk',

  'форинт*': 'huf',
  'forint*': 'huf',

  'ringgit*': 'myr',
  'ринггит*': 'myr',

  '฿': 'thb',
  'бат*': 'thb',
  'bat*': 'thb',

  'lir*': 'try',
  'лир*': 'try',

  'rand*': 'zar',
  'рэнд*': 'zar',
  'ренд*': 'zar',

  'zlot*': 'pln',
  'злот*': 'pln',

  'bucks': 'usd',
  '$': 'usd',
  'dollar*': 'usd',
  'долл*': 'usd',

  '€': 'eur',
  'eur*': 'eur',
  'евро': 'eur',

  '£': 'gbp',
  'фунт*': 'gbp',
  'pound*': 'gbp',

  '₽': 'rub',
  'руб': 'rub',
  'рубл*': 'rub',

  '₪': 'ils',
  'шекел*': 'ils',

  'йен*': 'jpy',

  'юан*': 'cny',
  'yuan': 'cny',
};

/**
 * Hash of special display names for some currencies. Default name of currency displayed
 * @type {Object}
 */
export const DISPLAY_NAMES = {
  'usd': '$',
  'eur': '€',
  'gbp': '£',
  'rub': '₽',
  'ils': '₪',
  'chf': '₣',
  'thb': '฿',
};
