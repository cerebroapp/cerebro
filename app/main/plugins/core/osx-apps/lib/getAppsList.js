import mdfind from './mdfind'


/**
 * List of supported files
 * @type {Array}
 */
const supportedTypes = [
  'com.apple.application-bundle',
  'com.apple.systempreference.prefpane'
]

/**
 * Build mdfind query
 *
 * @return {String}
 */
const buildQuery = () => (
  supportedTypes.map(type => `kMDItemContentType=${type}`).join('||')
)

/**
 * Function to terminate previous query
 *
 * @return {Function}
 */
let cancelPrevious = () => {}

/**
 * Get list of all installed applications
 * @return {Promise<Array>}
 */
export default () => {
  cancelPrevious()
  return new Promise(resolve => {
    const { output, terminate } = mdfind({
      query: buildQuery()
    })
    cancelPrevious = terminate
    const result = []
    output.on('data', (file) => result.push(file))
    output.on('end', () => resolve(result))
  })
}
