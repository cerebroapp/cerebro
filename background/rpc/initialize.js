import getAppsList from 'lib/getAppsList'
import getFileDetails from 'lib/getFileDetails'
import getFileSize from 'lib/getFileSize'
import getFileIcon from 'lib/getFileIcon'
import listArchive from 'lib/listArchive'
import register from 'lib/rpc/register'
import initializePlugins from 'lib/initializePlugins'

/**
 * Register some functions.
 * After `register` function can be called using rpc from main window
 */
export default () => {
  register('getAppsList', getAppsList)
  register('getFileDetails', getFileDetails)
  register('getFileSize', getFileSize)
  register('getFileIcon', getFileIcon)
  register('listArchive', listArchive)
  register('initializePlugins', initializePlugins)
}
