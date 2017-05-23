import register from 'lib/rpc/register'

import initializePlugins from 'lib/initializePlugins'

/**
 * Register some functions.
 * After `register` function can be called using rpc from main window
 */
export default () => {
  register('initializePlugins', initializePlugins)
}
