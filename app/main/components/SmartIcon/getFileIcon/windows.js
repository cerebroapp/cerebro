const remote = require('@electron/remote')

/**
 * Get system icon for file
 *
 * @param  {String} path File path
 * @return {Promise<String>} Promise resolves base64-encoded source of icon
 */
module.exports = async function getFileIcon(path) {
  const nativeIcon = await remote.app.getFileIcon(path)
  return nativeIcon.toDataURL()
}
