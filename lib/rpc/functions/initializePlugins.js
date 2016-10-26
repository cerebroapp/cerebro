import wrap from '../wrap';
import * as plugins from 'main/plugins/';
import { on } from 'lib/rpc/events';

const initialize = wrap('initializePlugins');

/**
 * RPC-call for plugins initializations
 */
export default () => {
  // Start listening for replies from plugin initializers
  on('plugin.message', ({name, data}) => {
    const plugin = plugins[name];
    if (plugin.onMessage) plugin.onMessage(data);
  });

  return initialize();
}
