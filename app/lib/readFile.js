import fs from 'fs'

/**
 * Promise-wrapper for fs.readFile
 *
 * @param  {String} path
 * @param  {String} options
 * @return {Promise}
 */
export default (path, options = 'utf8') => (
  new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, source) => (
      err ? reject(err) : resolve(source)
    ))
  })
)
