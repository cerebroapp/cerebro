import { send } from 'lib/rpc'
import { settings as pluginSettings } from 'lib/plugins'

/**
 * Initialices plugin sync and/or async by calling the `initialize` and `initializeAsync` functions
 * @param {Object} plugin A plugin object
 * @param {string} name The name entry in the plugin package.json
 */
const initPlugin = (plugin, name) => {
  const { initialize, initializeAsync } = plugin

  // Foreground plugin initialization
  if (initialize) {
    console.log('Initialize sync plugin', name)
    try {
      initialize(pluginSettings.getUserSettings(plugin, name))
    } catch (e) {
      console.error(`Failed to initialize plugin: ${name}`, e)
    }
  }

  // Background plugin initialization
  if (initializeAsync) {
    console.log('Initialize async plugin', name)
    send('initializePluginAsync', { name })
  }
}

export default initPlugin
