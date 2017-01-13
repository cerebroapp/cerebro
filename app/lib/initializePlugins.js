import plugins from '../main/plugins/'
import { send } from 'lib/rpc/events'

export default () => {
  // Run plugin initializers only when main window is loaded
  Object.keys(plugins).forEach(name => {
    if (!plugins[name])
      return;
    const { initializeAsync } = plugins[name]
    if (!initializeAsync) return
    initializeAsync(data => {
      // Send message back to main window with initialization result
      send('plugin.message', {
        name,
        data,
      })
    })
  })
}
