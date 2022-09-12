import config from 'lib/config'

/**
 * Returns the settings established by the user and previously saved in the config file
 * @param {string} pluginName The name entry of the plugin package.json
 * @returns An object with keys and values of the **stored** plugin settings
 */
const getExistingSettings = (pluginName) => config.get('plugins')[pluginName] || {}

/**
 * Returns the sum of the default settings and the user settings
 * We use packageJsonName to avoid conflicts with plugins that export
 * a different name from the bundle. Two plugins can export the same name
 * but can't have the same package.json name
 * @param {Object} plugin
 * @param {string} packageJsonName
 * @returns An object with keys and values of the plugin settings
 */
const getUserSettings = (plugin, packageJsonName) => {
  const userSettings = {}
  const existingSettings = getExistingSettings(packageJsonName)
  const { settings: pluginSettings } = plugin

  if (pluginSettings) {
    // Provide default values if nothing is set by user
    Object.keys(pluginSettings).forEach((key) => {
      userSettings[key] = existingSettings[key] || pluginSettings[key].defaultValue
    })
  }

  return userSettings
}

export default getUserSettings
