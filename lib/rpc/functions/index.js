import wrap from '../wrap';
import memoize from 'lodash/memoize';

// Export RPC-versions of lib functions
export const getFileDetails = wrap('getFileDetails')
export const getFileSize = wrap('getFileSize')
export const getFileIcon = memoize(wrap('getFileIcon'))
export const listArchive = wrap('listArchive')
export const readFile = wrap('readFile')

export { default as getAppsList } from './getAppsList'
export { default as initializePlugins } from './initializePlugins';
