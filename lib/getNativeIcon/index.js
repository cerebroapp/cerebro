import shellCommand from '../shellCommand';
import { CACHE_DIR } from 'lib/config';
import fs from 'fs';

function getIconCommand(path) {
  if (path.match(/.*\.icns$/i)) {
    return `ICON="${path}"`;
  }
  return [
    'ICON=',
    `"${path}/Contents/Resources/"`,
    `\`defaults read "${path}/Contents/Info" CFBundleIconFile|sed -e 's/\.icns$//'\``,
    '.icns'
  ].join('');
}

/**
 * Fast hash string function
 *
 * @param  {String} str
 * @return {String}
 */
function hash(str) {
  let hash = 5381;
  let i = str.length;

  while(i)
    hash = (hash * 33) ^ str.charCodeAt(--i)

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

/**
 * Util function to read icon for the OSx application
 *
 * @param  {String} path Path to .app file
 * @return {Promise} promise that resolved with src for the app icon
 */
export default function getAppIcon(path) {
  const out = `${CACHE_DIR}/${hash(path)}.png`;
  if (fs.existsSync(out)) {
    return Promise.resolve(out);
  }
  // FIX TODO: The domain/default pair of (/System/Library/PrivateFrameworks/CoreSpotlight.framework/Support/com.app/Contents/Info, CFBundleIconFile) does not exist
  return shellCommand([
    getIconCommand(path),
    `MAXAVAIL=\`/usr/bin/sips -g pixelWidth "$ICON"|tail -1|awk '{print $2}'\``,
    `/usr/bin/sips -s format png --resampleHeightWidthMax $MAXAVAIL "$ICON" --out "${out}"`
  ].join("\n")).then(stdout => {
    return out;
  });
}
