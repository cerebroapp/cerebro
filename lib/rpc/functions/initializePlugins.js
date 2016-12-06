import wrap from '../wrap'
import plugins from 'main/plugins/'
import { on } from 'lib/rpc/events'

const asyncInitializePlugins = wrap('initializePlugins')

const initializePlugins = () => {
  // Call background initializers
  asyncInitializePlugins()

  // Call foreground initializers
  Object.keys(plugins).forEach(name => {
    const { initialize } = plugins[name]
    if (initialize) {
      // Sync plugin initialization
      initialize()
    }
  })
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

  return initializePlugins()
}
