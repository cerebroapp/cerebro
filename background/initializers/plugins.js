import * as plugins from '../../main/plugins/';

/**
 * Initialize plugins
 *
 * @param  {Function} send Function that sends data back to main window
 */
export default (send) => {
  Object.keys(plugins).forEach(plugin => {
    const { initialize } = plugins[plugin];
    if (!initialize) return;
    initialize(data => send({
      // Send message back to main window with initialization result
      type: `plugin.message`,
      plugin,
      data,
    }));
  });
}

