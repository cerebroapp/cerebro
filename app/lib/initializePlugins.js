import { on } from 'lib/rpc'
import plugins from 'plugins'
import initPlugin from './initPlugin'

/**
 * Starts listening for `initializePlugin` events and initializes all plugins
 */
export default () => {
  // Start listening for replies from plugin async initializers
  on('plugin.message', ({ name, data }) => {
    const plugin = plugins[name]
    if (plugin.onMessage) plugin.onMessage(data)
  })

  Object.keys(plugins).forEach((name) => initPlugin(plugins[name], name))
}
