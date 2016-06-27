const REGEXP = /^(\d+(?:(?:\.|\,)\d+)?)\s?([\wa-я\$\€£]+)\s*(?:to|in|at|в)?\s?([\wа-я\$\€£]+)?$/i;

// TODO: show autocomplete with other targets, i.e.
// 100$ → (in rub, in eur, others...)
// TODO: add converters to mass, distance
const SYNONIMS = {
  'франк*': 'chf',
  'franc*': 'chf',
  '₣': 'chf',

  'real*': 'brl',
  'реал*': 'brl',

  'kun*': 'hrk',
  'кун*': 'hrk',

  'форинт*': 'HUF',
  'forint*': 'HUF',

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
  'euro': 'eur',
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

const MATCH_SYNONIMS = Object.keys(SYNONIMS).filter(key => key.indexOf('*') !== -1);

const DISPLAY_NAMES = {
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'RUB': '₽',
  'ILS': '₪',
  'CHF': '₣',
  'THB': '฿',
}

const BASE_CURRENCY = 'RUB';

let cache = null;

//TODO expire cache every day

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
function defaultTarget(currency) {
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
  const to = match[3] ? toCurrency(match[3]) : defaultTarget(from);
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
