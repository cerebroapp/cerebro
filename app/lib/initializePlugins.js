import { on } from 'lib/rpc'
import PluginsService from 'plugins'
import initPlugin from './initPlugin'

function listenToAsyncMessages() {
  on('plugin.message', ({ name, data }) => {
    const plugin = PluginsService.getAllPlugins()[name]
    if (plugin.onMessage) plugin.onMessage(data)
  })
}

/**
 * Initialize all plugins and start listening for replies from plugin async initializers
 */
export default () => {
  // Start listening for replies from plugin async initializers
  listenToAsyncMessages()

  const allPlugins = PluginsService.getAllPlugins()

  Object.keys(allPlugins).forEach((name) => initPlugin(allPlugins[name], name))
}
