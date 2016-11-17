import wrap from '../wrap';
import memoize from 'memoizee';

const MEMOIZE_OPTIONS = {
  length: false,
  promise: 'then',
  maxAge: 30 * 1000, // Default cache expires in 30 seconds,
  preFetch: true
}

// Export RPC-versions of lib functions
export const readFile = wrap('readFile')

export const getFileDetails = memoize(wrap('getFileDetails'), MEMOIZE_OPTIONS)
export const getFileSize = memoize(wrap('getFileSize'), MEMOIZE_OPTIONS)
export const listArchive = memoize(wrap('listArchive'), MEMOIZE_OPTIONS)
export const getFileIcon = memoize(wrap('getFileIcon'), MEMOIZE_OPTIONS)
export const readDir = memoize(wrap('readDir'), MEMOIZE_OPTIONS)

export { default as initializePlugins } from './initializePlugins';
