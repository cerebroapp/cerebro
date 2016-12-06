import du from 'du'
import { memoize } from 'cerebro-tools'

/**
 * Get size of file
 * @param  {String} path
 * @return {Promise<Integer>}
 */
const getFileSize = (path) => (
  new Promise((resolve, reject) => {
    du(path, (err, size) => (
      err ? reject(err) : resolve(size)
    ))
  })
)

export default memoize(getFileSize)
