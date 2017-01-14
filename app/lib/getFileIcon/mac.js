/* eslint new-cap: 0 */
import macOS from 'nodobjc'

macOS.framework('Foundation')
macOS.framework('AppKit')

/**
 * Return NSImage for icns for provided file.
 * In case of .icns icon path we read this file intead of system icon for `.icns` extension
 *
 * @param  {String} path Path to the file
 * @return {macOS.NSImage}
 */
const readIcon = (path) => {
  const nativePath = macOS.NSString('stringWithUTF8String', path)
  if (path.match(/\.icns$/)) {
    return macOS.NSImage('alloc')('initWithContentsOfFile', nativePath)
  }
  return macOS.NSWorkspace('sharedWorkspace')('iconForFile', nativePath)
}

/**
 * Get system icon for file
 *
 * @param  {String} path File path
 * @param  {Number} options.width
 * @param  {[type]} options.height
 * @return {Promise<String>} Promise resolves base64-encoded source of icon
 */
export default function getFileIcon(path, { width = 128, height = 128 } = {}) {
  return new Promise(resolve => {
    const pool = macOS.NSAutoreleasePool('alloc')('init')
    const icon = readIcon(path)
    const dict = macOS.NSDictionary(
      'dictionaryWithObject',
      macOS(1),
      'forKey',
      macOS.NSString('stringWithUTF8String', '')
    )
    const rect = macOS.NSMakeRect(0, 0, width, height)
    const bestIcon = icon('bestRepresentationForRect', rect, 'context', null, 'hints', null)
    const bestImage = macOS.NSImage('alloc')('init')
    bestImage('addRepresentation', bestIcon)
    const bitmap = macOS.NSBitmapImageRep(
      'imageRepsWithData',
      bestImage('TIFFRepresentation')
    )('objectAtIndex', 0)
    const png = bitmap('representationUsingType', macOS.NSPNGFileType, 'properties', dict)
    const base64 = png('base64Encoding')
    resolve(`data:image/png;base64,${base64.toString()}`)
    pool('drain')
  })
}
