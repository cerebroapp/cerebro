import { on } from 'lib/rpc'
import plugins from 'plugins'
import initPlugin from './initPlugin'

/**
 * Initialize all plugins and start listening for replies from plugin async initializers
 */
const initializePlugins = () => {
  // Start listening for replies from plugin async initializers
  on('plugin.message', ({ name, data }) => {
    const plugin = plugins.getAllPlugins()[name]
    if (plugin.onMessage) plugin.onMessage(data)
  })

  const allPlugins = plugins.getAllPlugins()

  Object.keys(allPlugins).forEach((name) => initPlugin(allPlugins[name], name))
}

export default initializePlugins
