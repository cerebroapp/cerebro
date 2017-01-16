/* eslint no-eval: 0 */

import distance from './distance'
import mass from './mass'
import currency from './currency'
import temperature from './temperature'
import icon from './icon.png'

// Array of all available converters
const CONVERTERS = [
  distance,
  mass,
  currency,
  temperature,
]

const numberRegexp = /[-+/*\d\s,\.\( )]+/
const unitRegexp = /[\wa-я\$€£'"°℃]+/

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
].join('')

// Main regexp to match conversation strings
const REGEXP = new RegExp(mainRegexpString, 'i')

/**
 * Get rates for all units
 * @return {Promise} promise that resolves when all units are ready
 */
function eachConverter(fn) {
  CONVERTERS.forEach(converter => {
    converter.getRates().then(() => fn(converter))
  })
}

/**
 * Convert currency
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const converterPlugin = ({ term, display }) => {
  const match = term.toLowerCase().match(REGEXP)
  if (match) {
    let amount
    try {
      amount = parseFloat(eval(match[1].toString().replace(/,/g, '.')))
    } catch (err) {
      // do nothing when amount parse failed
      return
    }
    eachConverter(converter => {
      const pair = converter.extract(match)
      if (!pair) {
        return
      }
      const [from, to] = pair
      const result = converter.convert(amount, from, to).toLocaleString()
      display({
        icon,
        title: `${amount.toLocaleString()}${from.displayName} = ${result}${to.displayName}`,
        term: `${term} = ${result}${to.displayName}`,
        clipboard: result.toString(),
      })
    })
  }
}

export default {
  name: 'Convert',
  fn: converterPlugin,
}
