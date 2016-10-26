import * as plugins from '../main/plugins/';
import { send } from 'lib/rpc/events';

export default () => {
  // Run plugin initializers only when main window is loaded
  Object.keys(plugins).forEach(name => {
    const { initialize } = plugins[name];
    if (!initialize) return;
    initialize(data => {
      // Send message back to main window with initialization result
      send('plugin.message', {
        name,
        data,
      });
    });
  });
}
