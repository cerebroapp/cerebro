import { loadIcon } from '../../main/actions/icons';
import getAppsList from 'lib/getAppsList.js';

// List of generic icons for preload
const GENERIC_ICONS = [
  '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/GenericFolderIcon.icns',
  '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/ExecutableBinaryIcon.icns',
  '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/GenericApplicationIcon.icns',
];

const ARCHIVE_ICONS = [
  '/System/Library/CoreServices/Applications/Archive\ Utility.app/Contents/Resources/bah-zip.icns',
  '/System/Library/CoreServices/Applications/Archive\ Utility.app/Contents/Resources/bah-tar.icns',
  '/System/Library/CoreServices/Applications/Archive\ Utility.app/Contents/Resources/bah-tgz.icns',
  '/System/Library/CoreServices/Applications/Archive\ Utility.app/Contents/Resources/bah-gz.icns',
  '/System/Library/CoreServices/Applications/Archive\ Utility.app/Contents/Resources/bah.icns'
];

export default (send) => {
  const dispatch = (action) => {
    send({
      type: 'redux-action',
      action
    });
  }

  // Preload all application icons
  getAppsList().then(items => {
    items
      .concat(GENERIC_ICONS)
      .concat(ARCHIVE_ICONS)
      .forEach(app => loadIcon(app.path)(dispatch))
  });
}
