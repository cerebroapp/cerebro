import { on, send } from './events'

/**
 * Register listener for rpc-calls.
 * @param  {String}   name Name of a function that is sent throuth messaging system
 * @param  {Function} fn  Function registered for this name
 */
export default (name, fn) => {
  on(`rpc.fn.${name}`, ({ args, callId }) => {
    fn.apply(null, args).then(result => send(callId, result))
  })
}
