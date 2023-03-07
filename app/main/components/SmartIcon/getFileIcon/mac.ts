const remote = require('@electron/remote')

/**
 * Get system icon for file
 *
 * @param  {String} path File path
 * @param  {Number} options.width
 * @param  {[type]} options.height
 * @return {Promise<String>} Promise resolves base64-encoded source of icon
 */
module.exports = async function getFileIcon(path: string, { width = 24, height = 24 } = {}) {
  // eslint-disable-next-line global-require
  const plist = require('simple-plist')

  if (!path.endsWith('.app') && !path.endsWith('.app/')) {
    const icon = await remote.nativeImage.createThumbnailFromPath(path, { width, height })
    return icon.toDataURL()
  }
  const { CFBundleIconFile } = plist.readFileSync(`${path}/Contents/Info.plist`)

  if (!CFBundleIconFile) {
    return null
  }

  const iconFileName = CFBundleIconFile.endsWith('.icns')
    ? CFBundleIconFile : `${CFBundleIconFile}.icns`
  const icon = await remote.nativeImage
    .createThumbnailFromPath(
      `${path}/Contents/Resources/${iconFileName}`,
      { width, height }
    )
  return icon.toDataURL()
}
