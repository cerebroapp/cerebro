import wrap from '../wrap';

const getAppsList = wrap('getAppsList');

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
 * RPC + memoizable version of lib/getAppsList
 */
export default (...args) => {
  if (cacheValid()) return cache;
  cacheDate = new Date().getTime();
  cache = getAppsList(...args)
  return cache
}
