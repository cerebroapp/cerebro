import config from 'lib/config'
import plugins from 'plugins'

const getSettings = pluginName => config.get('plugins')[pluginName] || {}

const getUserSettings = (pluginName) => {
  const settings = getSettings(pluginName)
  if (plugins[pluginName].settings) {
    // Provide default values if nothing is set by user
    Object.keys(plugins[pluginName].settings).forEach((key) => {
      settings[key] = settings[key] || plugins[pluginName].settings[key].defaultValue
    })
  }
  return settings
}

export default getUserSettings
