import distance from './distance';
import mass from './mass';
import currency from './currency';
import temperature from './temperature';

// Array of all available converters
const CONVERTERS = [
  distance,
  mass,
  currency,
  temperature,
];

const numberRegexp = /-?\d+(?:(?:\.|,)\d+)?/;
const unitRegexp = /[\wa-я\$€£'"°℃]+/;

const mainRegexpString = [
  // Start of line
  '^',
  // Number that we want to convert
  `(${numberRegexp.source})`,
  // Maybe space before source unit
  '\\s?',
  // Source unit name
  `(${unitRegexp.source})`,
  // Maybe spaces and any of word, like 'to' or 'in'
  '\\s*(?:to|in|at|в)?\\s*',
  // Maybe target unit (we can try to get default target unit by source unit)
  `(${unitRegexp.source})?`,
  // End of line
  '$'
].join('');

// Main regexp to match conversation strings
const REGEXP = new RegExp(mainRegexpString, 'i');

/**
 * Get rates for all units
 * @return {Promise} promise that resolves when all units are ready
 */
function eachConverter(fn) {
  CONVERTERS.forEach(converter => {
    converter.getRates().then(() => fn(converter));
  });
}

/**
 * Convert currency
 * @param  {String} term
 */
const converterPlugin = (term, callback) => {
  const match = term.toLowerCase().match(REGEXP);
  if (match) {
    const amount = parseFloat(match[1].toString().replace(',', '.'));
    eachConverter(converter => {
      const pair = converter.extract(match);
      if (!pair) {
        return;
      }
      const [from, to] = pair;
      const result = converter.convert(amount, from, to);
      callback({
        id: `converter-${from.unit}-${to.unit}`,
        title: `${amount}${from.displayName} = ${result}${to.displayName}`,
        term: `${term} = ${result}${to.displayName}`,
        clipboard: result.toString(),
        icon: '/Applications/Calculator.app',
      });
    });
  }
};

export default {
  name: 'Convert',
  fn: converterPlugin,
};
