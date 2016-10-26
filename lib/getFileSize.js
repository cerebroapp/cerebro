import du from 'du';
import memoize from 'lodash/memoize';

/**
 * Get size of file
 * @param  {String} path
 * @return {Promise<Integer>}
 */
function getSize(path) {
  return new Promise((resolve, reject) => {
    du(path, (err, size) => {
      err ? reject(err) : resolve(size);
    });
  });
}

export default memoize(getSize);
