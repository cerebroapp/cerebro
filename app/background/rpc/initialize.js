import register from 'lib/rpc/register'

import getFileDetails from 'lib/getFileDetails'
import getFileSize from 'lib/getFileSize'
import initializePlugins from 'lib/initializePlugins'

/**
 * Register some functions.
 * After `register` function can be called using rpc from main window
 */
export default () => {
  register('getFileDetails', getFileDetails)
  register('getFileSize', getFileSize)
  register('initializePlugins', initializePlugins)
}
