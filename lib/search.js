import lowerCase from 'lodash/lowerCase';
import memoize from 'memoizee';
import escapeStringRegexp from 'escape-string-regexp';

/**
 * Convert string to searchable lower-case string prepared for regexp search of search term
 * NOTE: lodash lowerCase convers `AppName` to `app name` (that we need),
 *       when standard js `.toLowerCase` converts it to `appname`.
 *
 * @param  {String} string
 * @return {String}
 */
const toSearchString = memoize((string) => lowerCase(string));

/**
 * Get regexp for search term
 *
 * @param  {String} term
 * @return {Regexp}
 */
const toSearchRegexp = memoize((term) => new RegExp(`(^|\\s)${escapeStringRegexp(toSearchString(term))}`));

/**
 * Search term in array
 * @param  {Array} items Array of items
 * @param  {String} term Search term
 * @param  {Function} toString Function that converts item from array to string
 * @return {Array}
 */
export default (items, term, toString = (item) => item) => {
  const searchRegexp = toSearchRegexp(term);
  return items.filter(item =>
    toSearchString(toString(item)).match(searchRegexp)
  );
};
