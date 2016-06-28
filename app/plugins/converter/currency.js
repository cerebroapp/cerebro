import parseUnitName from './parseUnitName';

const CURRENCIES = [
  'AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR',
  'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB',
  'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'
]

const BASE_CURRENCY = 'RUB';

const SYNONIMS = {
  'франк*': 'CHF',
  'franc*': 'CHF',
  '₣': 'CHF',

  'real*': 'BRL',
  'реал*': 'BRL',

  'kun*': 'HRK',
  'кун*': 'HRK',

  'форинт*': 'HUF',
  'forint*': 'HUF',

  'ringgit*': 'MYR',
  'ринггит*': 'MYR',

  '฿': 'THB',
  'бат*': 'THB',
  'bat*': 'THB',

  'lir*': 'TRY',
  'лир*': 'TRY',

  'rand*': 'ZAR',
  'рэнд*': 'ZAR',
  'ренд*': 'ZAR',

  'zlot*': 'PLN',
  'злот*': 'PLN',

  'bucks': 'USD',
  '$': 'USD',
  'dollar*': 'USD',
  'долл*': 'USD',

  '€': 'EUR',
  'euro': 'EUR',
  'евро': 'EUR',

  '£': 'GBP',
  'фунт*': 'GBP',
  'pound*': 'GBP',

  '₽': 'RUB',
  'руб': 'RUB',
  'рубл*': 'RUB',

  '₪': 'ILS',
  'шекел*': 'ILS',

  'йен*': 'JPY',

  'юан*': 'CNY',
  'yuan': 'CNY',
};

const DISPLAY_NAMES = {
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'RUB': '₽',
  'ILS': '₪',
  'CHF': '₣',
  'THB': '฿',
}

const PAIRS = CURRENCIES.map(cur => `${BASE_CURRENCY}${cur}`).join(',')
const URL = `https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22${PAIRS}%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`

let cache = null;
let cacheDate = null;

function cacheValid() {
  return cache && cacheDate >= new Date().toDateString();
}

/**
 * Fetch & save rates from yahoo API
 * @return {Promise} promise that resolves with rates JSON
 */

function getRates() {
  if (cacheValid()) {
    return Promise.resolve(cache);
  }
  return fetch(URL).then(resp => resp.json()).then(response => {
    cacheDate = new Date(response.query.created).toDateString();
    cache = response.query.results.rate.reduce(function(acc, value){
      acc[value.Name.split('/')[1]] = parseFloat(value.Rate);
      return acc;
    }, {});
    return cache;
  });
}

/**
 * Convert string to real currency uni
 * @param  {String} unit
 * @return {String}
 */
function toUnit(unit) {
  return parseUnitName(SYNONIMS, cache, unit);
}

/**
 * Get target currency when it is not defined
 * @param  {string} currency
 * @return {string}
 */
function defaultTarget(currency) {
  if (BASE_CURRENCY !== currency) {
    return BASE_CURRENCY
  }
  return 'EUR';
}

/**
 * Prettified name of currency. It is currency sign if it is supported
 * @param  {String} currency
 * @return {String}
 */
function displayName(currency) {
  return DISPLAY_NAMES[currency] || currency;
}

function toUnitStruct(unit) {
  return {
    unit,
    displayName: displayName(unit),
    rate: cache[unit],
  }
}

function extract(match) {
  const from = toUnit(match[2]);
  console.log(from);
  const to = match[3] ? toUnit(match[3]) : defaultTarget(from);
  if (!from || !to) {
    return false;
  }
  console.log(from, to);
  return [
    toUnitStruct(from),
    toUnitStruct(to)
  ]
}

export default {
  getRates,
  extract,
}
