import { flow, words, capitalize, trim, map, join } from 'lodash/fp'

/**
 * Remove unnecessary information from plugin description
 * like `Cerebro plugin for`
 * @param  {String} str
 * @return {String}
 */
const removeDescriptionNoise = (str) => (
  (str || '').replace(/^cerebro\s?(plugin)?\s?(to|for)?/i, '')
)


/**
 * Remove unnecessary information from plugin name
 * like `cerebro-plugin-` or `cerebro-`
 * @param  {String} str
 * @return {String}
 */
const removeNameNoise = (str) => (
  (str || '').replace(/^cerebro-(plugin)?-?/i, '')
)

export const name = (text = '') => flow(
  trim,
  words,
  map(capitalize),
  join(' ')
)(removeNameNoise(text.toLowerCase()))

export const description = flow(
  removeDescriptionNoise,
  trim,
  capitalize,
)

export const version = (plugin) => (
  plugin.isUpdateAvailable ?
    `${plugin.installedVersion} → ${plugin.version}` :
    plugin.version
)
