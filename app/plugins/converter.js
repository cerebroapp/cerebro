import define from '../lib/define';

const REGEXP = /^(\d+(?:(?:\.|\,)\d+)?)\s?([\wa-я\$\€£]+)\s*(?:to|in|at|в)?\s?([\wа-я\$\€£]+)?$/i;

const SYNONIMS = {
  'dollar*': 'usd',
  'долл*': 'usd',
  'bucks': 'usd',
  '$': 'usd',
  '€': 'eur',
  '£': 'gbp',
  '₽': 'rub',
  'руб': 'rub',
  'рубл*': 'rub',
  'euro': 'eur',
  'евро': 'eur'
};

const MATCH_SYNONIMS = Object.keys(SYNONIMS).filter(key => key.indexOf('*') !== -1);

const DISPLAY_NAMES = {
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'RUB': '₽',
}

const BASE_CURRENCY = 'RUB';

let cache = null;

/**
 * Fetch & save rates from API
 * @return {Promise} promise that resolves with rates JSON
 */
function getRates() {
  if (cache) {
    return Promise.resolve(cache);
  }
  return new Promise((resolve, reject) => {
    fetch(`http://api.fixer.io/latest?base=${BASE_CURRENCY}`)
      .then(response => response.json())
      .then(json => {
        cache = json;
        resolve(cache);
      });
  });
}

/**
 * Convert string to real currency from dictionary
 * @param  {String} currency
 * @return {String}
 */
function toCurrency(currency) {
  let result = currency;
  if (SYNONIMS[result]) {
    result = SYNONIMS[result];
  } else {
    const match = MATCH_SYNONIMS.find(key =>
      currency.match(new RegExp(key.replace(/\*/g, '.*')))
    );
    result = SYNONIMS[match] || result;
  }
  return result.toUpperCase();
}

/**
 * Get target currency when it is not defined
 * @param  {string} currency
 * @return {string}
 */
function defaultForSource(currency) {
  if (BASE_CURRENCY !== currency) {
    return BASE_CURRENCY
  }
  return 'EUR';
}

/**
 * Parse regexp match to amoun,
 * @param  {Array} match Result of regexp match
 * @return {Array} amount, fromCurrency and toCurrency
 */
function parseMatch(match) {
  const amount = parseFloat(match[1].toString().replace(',', '.'));
  const from = toCurrency(match[2]);
  const to = match[3] ? toCurrency(match[3]) : defaultForSource(from);
  return [amount, from, to];
}

/**
 * Get rate for currency
 * @param  {String} currency
 * @return {Float}
 */
function getRate(currency) {
  if (cache.base === currency) {
    return 1;
  }
  return cache.rates[currency];
}

/**
 * Prettified name of currency. It is currency sign if it is supported
 * @param  {String} currency
 * @return {Strgin}
 */
function displayName(currency) {
  return DISPLAY_NAMES[currency] || currency;
}

/**
 * Convert currency
 * @param  {String} term
 */
const converterPlugin = (term, callback) => {
  const match = term.match(REGEXP);
  if (match) {
    const [amount, from, to] = parseMatch(match);
    getRates().then(rates => {
      const fromRate = getRate(from);
      const toRate = getRate(to);
      if (!fromRate || !toRate) {
        // We don't know currency(
        return;
      }
      const result = Math.round(amount / fromRate * toRate * 100) / 100;
      callback(term, {
        id: 'converter',
        title: `${amount}${displayName(from)} = ${result}${displayName(to)}`,
        term: `${term} = ${result}${displayName(to)}`,
        clipboard: result.toString(),
      });
    });
  }
};

export default {
  name: 'Convert',
  fn: converterPlugin,
};
