import getUrl from './getUrl';
import { BASE_CURRENCY, SYNONIMS, DISPLAY_NAMES, PRIORITY_CURRENCIES } from './constants';
import { parseUnitName, buildExtract, linearConverter } from '../base/';

const URL = getUrl(BASE_CURRENCY);

// Hash of exchange rates
const rates = {};

// Date of fetching exchange rates
let ratesDate = null;

/**
 * Get yesterday's date
 * @return {Date}
 */
function yesterday() {
  return new Date(Date.now() - 24 * 3600 * 1000);
}

/**
 * Check that saved exchange rates are still valid
 * @return {Boolean}
 */
function cacheValid() {
  return ratesDate && ratesDate >= yesterday();
}

/**
 * Fetch & save rates from yahoo API
 * @return {Promise} promise that resolves with rates JSON
 */
function getRates() {
  if (cacheValid()) return Promise.resolve(rates);
  return fetch(URL)
    .then(resp => resp.json())
    .then(response => {
      // Save exchange rates date
      ratesDate = new Date(response.query.created);
      // Convert response array with exchange rates to hash
      response.query.results.rate.forEach(value => {
        rates[value.Name.split('/')[1].toLowerCase()] = parseFloat(value.Rate);
      });
    });
}

/**
 * Convert string to real currency
 * @param  {String} unit
 * @return {String}
 */
function toUnit(unit) {
  return parseUnitName(SYNONIMS, rates, unit);
}

/**
 * Get target currency when it is not defined
 * @param  {string} currency
 * @return {string}
 */
function defaultTarget(currency) {
  if (BASE_CURRENCY !== currency) {
    return BASE_CURRENCY;
  }
  return PRIORITY_CURRENCIES.find(cur => cur !== currency);
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
  };
}

export default {
  getRates,
  extract: buildExtract(toUnit, toUnitStruct, defaultTarget),
  convert: linearConverter(rates),
};
