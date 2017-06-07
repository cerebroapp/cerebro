import { on, send } from 'lib/rpc'
import plugins from 'plugins'

export const initializePlugin = (name) => {
  const { initialize, initializeAsync } = plugins[name]
  if (initialize) {
    // Foreground plugin initialization
    try {
      initialize()
    } catch (e) {
      console.error(`Failed to initialize plugin: ${name}`, e)
    }
  }

  if (initializeAsync) {
    // Background plugin initialization
    send('initializePluginAsync', { name })
  }
}

/**
 * RPC-call for plugins initializations
 */
export default () => {
  // Start listening for replies from plugin async initializers
  on('plugin.message', ({ name, data }) => {
    const plugin = plugins[name]
    if (plugin.onMessage) plugin.onMessage(data)
  })

  Object.keys(plugins).forEach(initializePlugin)
}
