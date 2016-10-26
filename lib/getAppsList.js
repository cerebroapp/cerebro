import glob from 'glob';
import flatten from 'lodash/flatten';

// Patters that we use for searching files
const PATTERNS = [
  // Apps in root applications folder
  '/Applications/*.app',
  // Apps inside other apps
  '/Applications/*.app/Contents/Applications/*.app',
  // Apps in folders
  '/Applications/!(*.app)/**.app',
  // System preferences
  '/System/Library/PreferencePanes/*.prefPane',
];

/**
 * Promise-wrapper for glob function
 * @param  {String} pattern Pattern for glob function
 * @param  {Object} options
 * @return {Promise}
 */
const globPromise = (pattern, options) => new Promise((resolve, reject) => {
  glob(pattern, options, (err, files) => {
    if (err) return reject(err);
    resolve(files);
  });
});

/**
 * Get list of all installed applications
 * @return {Promise<Array>}
 */
export default function () {
  return Promise.all(PATTERNS.map(pattern => globPromise(pattern)))
    .then(files => {
      return flatten(files).map(path => ({
        path,
        name: path.match(/\/([^\/]+)\.(app|prefPane)$/i)[1],
      }));
    });
}
