import fs from 'fs';

/**
 * Promise-wrapper for fs.readdir
 *
 * @param  {String} path
 * @param  {String} options
 * @return {Promise}
 */
export default (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      err ? reject(err) : resolve(files);
    })
  });
}
