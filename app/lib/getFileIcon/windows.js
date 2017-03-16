const extractIcon = require('win-icon-extractor')

/**
 * Get system icon for file
 *
 * @param  {String} path File path
 * @return {Promise<String>} Promise resolves base64-encoded source of icon
 */
export default function getFileIcon(path) {
  return extractIcon(path)
}
