import getAppsList from 'lib/getAppsList.js';
import getNativeIcon from 'lib/getNativeIcon';

/**
 * List of generic icons for preload
 * @type {Array}
 */
const GENERIC_ICONS = [
  // Folder icon
  '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/GenericFolderIcon.icns',
  // Executable file icon
  '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/ExecutableBinaryIcon.icns',
  // Application
  '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/GenericApplicationIcon.icns',
];

/**
 * Icons for archives
 * @type {Array}
 */
const ARCHIVE_ICONS = [
  '/System/Library/CoreServices/Applications/Archive\ Utility.app/Contents/Resources/bah-zip.icns',
  '/System/Library/CoreServices/Applications/Archive\ Utility.app/Contents/Resources/bah-tar.icns',
  '/System/Library/CoreServices/Applications/Archive\ Utility.app/Contents/Resources/bah-tgz.icns',
  '/System/Library/CoreServices/Applications/Archive\ Utility.app/Contents/Resources/bah-gz.icns',
  '/System/Library/CoreServices/Applications/Archive\ Utility.app/Contents/Resources/bah.icns'
];

/**
 * Initializer for applications plugin that preloads all applications icons.
 */
export default (callback) => {
  getAppsList().then(items => {
    [
      ...items,
      ...GENERIC_ICONS,
      ...ARCHIVE_ICONS
    ].forEach(({path}) => {
      getNativeIcon(path).then(icon => callback({
        icon,
        path
      }));
    })
  });
}
