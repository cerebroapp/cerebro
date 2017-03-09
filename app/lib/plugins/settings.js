import config from 'lib/config'
import { isEqual } from 'lodash'

const VALID_TYPES = new Set([
  'array',
  'string',
  'number',
  'bool',
  'option',
])

const isValidSetting = setting => {
  const { type, options } = setting
  if (!type || !VALID_TYPES.has(type)) {
    return false
  }

  if (type == 'option') {
    return Array.isArray(options) && options.length
  }

  return true
}

export default ({ settings }, base) => {
  if (! settings) return

  const externalSettings = config.get('external') || {}
  const pluginSettings = externalSettings[base] || {}

  Object.keys(settings).forEach(key => {
    const setting = settings[key]
    if (! isValidSetting(setting)) {
      console.log(`Invalid setting '${key}'`)
      return
    }

    const { value, ...pluginSetting } = pluginSettings[key] || {}

    if (!isEqual(setting, pluginSetting)) {
      const { description, type, defaultValue, multi, options } = setting
      pluginSettings[key] = { description, type, defaultValue, multi, options }
    }
  })

  externalSettings[base] = pluginSettings
  config.set('external', externalSettings)
}
