import { once, send } from './events'

/**
 * Generate uniq id for function call
 * @return {String}
 */
const generateId = () => {
  const now = new Date()
  return (+now + Math.random()).toString(16)
}

/**
 * Execute function by name in background.
 *
 * @param  {String} name Registered name of function.
 *   This name should be registered in `background/rpc/initialize`
 * @return {Function} Function that returns promise that is resolved
 *   with result of registered function
 */
export default (name) => (...args) => {
  return new Promise(resolve => {
    const callId = generateId()
    once(callId, resolve);
    send(`rpc.fn.${name}`, {args, callId});
  });
}
