import distance from './distance';
import mass from './mass';
import currency from './currency';

// Array of all available converters
const CONVERTERS = [
  distance,
  mass,
  currency,
];

const numberRegexp = /\d+(?:(?:\.|\,)\d+)?/;
const unitRegexp = /[\wa-я\$\€£\'\"]+/;

const mainRegexpString = [
  // Start of line
  '^',
  // Number that we want to convert
  `(${numberRegexp.source})`,
  //Maybe space before source unit
  '\\s?',
  // Source unit name
  `(${unitRegexp.source})`,
  // Maybe spaces and any of word, like 'to' or 'in'
  '\\s*(?:to|in|at|в)?\\s*',
  // Maybe target unit (we can try to get default target unit by source unit)
  `(${unitRegexp.source})?`,
  // End of line
  '$'
].join('')

const REGEXP = new RegExp(mainRegexpString, 'i');

// const REGEXP = /^(\d+(?:(?:\.|\,)\d+)?)\s?([\wa-я\$\€£]+)\s*(?:to|in|at|в)?\s?([\wа-я\$\€£]+)?$/i;

/**
 * Get rates for all units
 * @return {Promise} promise that resolves when all units are ready
 */
function getRates() {
  return Promise.all(CONVERTERS.map(converter => converter.getRates()));
}

/**
 * Parse regexp match to amount,
 * @param  {Array} match Result of regexp match
 * @return {Array} amount, fromCurrency and toCurrency
 */
function parseMatch(match) {
  const amount = parseFloat(match[1].toString().replace(',', '.'));
  const pairs = CONVERTERS.map(conv => conv.extract(match)).filter(pair =>
    pair && pair[0] && pair[1]
  );
  return [amount, pairs];
}

/**
 * Convert currency
 * @param  {String} term
 */
const converterPlugin = (term, callback) => {
  const match = term.match(REGEXP);
  if (match) {
    getRates().then(rates => {
      const [amount, pairs] = parseMatch(match);
      const results = pairs.map(([from, to]) => {
        const result = Math.round(amount / from.rate * to.rate * 100) / 100;
        return {
          id: `converter-${from.unit}-${to.unit}`,
          title: `${amount}${from.displayName} = ${result}${to.displayName}`,
          term: `${term} = ${result}${to.displayName}`,
          clipboard: result.toString(),
        }
      });
      callback(term, results);
    });
  }
};

export default {
  name: 'Convert',
  fn: converterPlugin,
};
