import iconutil from 'iconutil';
import plist from 'plist';
import { nativeImage } from 'electron';
import fs from 'fs';

function getIcnsPath(path) {
  if (path.match(/\.icns$/)) {
    return Promise.resolve(path);
  }
  return new Promise((resolve, reject) => {
    fs.readFile(`${path}/Contents/Info.plist`, 'utf8', (err, content) => {
      if (err) {
        return reject(err);
      }
      let iconFile = plist.parse(content).CFBundleIconFile;
      if (!iconFile.match(/\.icns$/)) {
        iconFile += '.icns';
      }
      resolve(`${path}/Contents/Resources/${iconFile}`);
    });
  });
}

/**
 * Read .icns file and get icon buffer
 * @param  {String} path Path to .icns file
 * @return {Promise} promise that resolves with image buffer
 */
function readIcns(path) {
  return new Promise((resolve, reject) => {
    iconutil.toIconset(path, (err, icons) => {
      if (err) {
        return reject(err);
      }
      resolve(icons[Object.keys(icons)[0]]);
    });
  });
}

/**
 * Convert image buffer to dataUri
 * @param  {Buffer} buffer [description]
 * @return {string} data URL
 */
function bufferToDataUri(buffer) {
  return nativeImage.createFromBuffer(buffer).toDataURL();
}

/**
 * Util function to read icon for the OSx application
 * TODO: it takes too much time to get icon for app and it is better to cache these icons
 * @param  {String} path Path to .app file
 * @return {Promise} promise that resolved with src for the app icon
 */
export default function getAppIcon(path) {
  return getIcnsPath(path)
    .then(readIcns)
    .then(bufferToDataUri);
}
