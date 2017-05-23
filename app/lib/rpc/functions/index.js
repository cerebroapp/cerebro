import wrap from '../wrap'
import { memoize } from 'cerebro-tools'

const MEMOIZE_OPTIONS = {
  length: false,
  promise: 'then',
  maxAge: 30 * 1000, // Default cache expires in 30 seconds,
  preFetch: true
}

// Export RPC-versions of lib functions
export const getFileDetails = memoize(wrap('getFileDetails'), MEMOIZE_OPTIONS)
export const getFileSize = memoize(wrap('getFileSize'), MEMOIZE_OPTIONS)
export const readDir = memoize(wrap('readDir'), MEMOIZE_OPTIONS)

export { default as initializePlugins } from './initializePlugins'
