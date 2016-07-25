import du from 'du';
import memoize from 'lodash/memoize';

function getSize(path) {
  return new Promise((resolve, reject) => {
    du(path, (err, size) => {
      err ? reject(err) : resolve(size);
    });
  });
}

export default memoize(getSize);
