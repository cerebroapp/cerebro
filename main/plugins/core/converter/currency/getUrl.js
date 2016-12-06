// List of available currencies
import { CURRENCIES } from './constants.js'

/**
 * Build url to get exchange rates
 * @param  {String} base Base currency
 * @return {String} url
 */
export default (base) => {
  const pairs = CURRENCIES.map(cur => `${base}${cur}`.toUpperCase()).join(',')
  return `https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22${pairs}%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`
}
