import { flow, lowerCase, words, capitalize, trim, map, join } from 'lodash/fp'

/**
 * Remove unnecessary information from plugin name or description
 * like `Cerebro plugin for`
 * @param  {String} str
 * @return {String}
 */
const removeNoise = str => (
  str.replace(/^cerebro\s?(plugin)?\s?(to|for)?/i, '')
)

export const name = flow(
  lowerCase,
  removeNoise,
  trim,
  words,
  map(capitalize),
  join(' ')
)

export const description = flow(
  removeNoise,
  trim,
  capitalize,
)

export const version = plugin => (
  plugin.isUpdateAvailable ?
    `${plugin.installedVersion} → ${plugin.version}` :
    plugin.version
)
