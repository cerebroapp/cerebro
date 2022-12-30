import { on } from 'lib/rpc'
import plugins from 'plugins'
import initPlugin from './initPlugin'

/**
 * Initialize all plugins and start listening for replies from plugin async initializers
 */
const initializePlugins = () => {
  const { allPlugins } = plugins
  Object.keys(allPlugins).forEach((name) => initPlugin(allPlugins[name], name))

  // Start listening for replies from plugin async initializers
  on('plugin.message', ({ name, data }) => {
    const plugin = allPlugins[name]
    if (plugin && plugin.onMessage) plugin.onMessage(data)
  })
}

export default initializePlugins
