import fs from 'fs'
import { memoize } from 'cerebro-tools'

/**
 * Promise-wrapper for fs.stat
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
const getFileDetails = path => (
  new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => (
      err ? reject(err) : resolve(stat)
    ))
  })
)

export default memoize(getFileDetails)
