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

  '/System/Library/PreferencePanes/*.prefPane',
];

// Cache expiration for list of applications
const CACHE_EXPIRATION = 30 * 60 * 60; // 30mins

let cacheDate;
let cache;

/**
 * Check that cache is still valid
 * @return {[type]} [description]
 */
function cacheValid() {
  return cacheDate && new Date().getTime() <= cacheDate + CACHE_EXPIRATION;
}

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

export default function () {
  if (cacheValid()) return Promise.resolve(cache);
  return Promise.all(PATTERNS.map(pattern => globPromise(pattern)))
    .then(files => {
      cacheDate = new Date().getTime();
      cache = flatten(files).map(path => ({
        path,
        name: path.match(/\/([^\/]+)\.(app|prefPane)$/i)[1],
      }));
      return cache;
    });
}
