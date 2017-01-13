import plugins from '../plugins/'
import config from 'lib/config'
import { shell, clipboard } from 'electron'
import store from '../store'

import {
 UPDATE_TERM,
 MOVE_CURSOR,
 SELECT_ELEMENT,
 SHOW_RESULT,
 HIDE_RESULT,
 UPDATE_RESULT,
 RESET,
 CHANGE_VISIBLE_RESULTS,
} from '../constants/actionTypes'

/**
 * Default scope object would be first argument for plugins
 *
 * @type {Object}
 */
const DEFAULT_SCOPE = {
  config,
  actions: {
    open: (q) => shell.openExternal(q),
    reveal: (q) => shell.showItemInFolder(q),
    copyToClipboard: (q) => clipboard.writeText(q),
    replaceTerm: (term) => store.dispatch(updateTerm(term)),
  }
}

/**
 * Pass search term to all plugins and handle their results
 * @param {String} term Search tem
 * @param {Function} callback Callback function that receives used search term and found results
 */
const eachPlugin = (term, display) => {
  // TODO: order results by frequency?
  Object.keys(plugins).forEach(name => {
    try {
      plugins[name] && plugins[name].fn({
        ...DEFAULT_SCOPE,
        term,
        hide: (id) => store.dispatch(hideElement(`${name}-${id}`)),
        update: (id, result) => store.dispatch(updateElement(`${name}-${id}`, result)),
        display: (payload) => display(name, payload)
      })
    } catch (error) {
      // Do not fail on plugin errors, just log them to console
      console.log('Error running plugin', name, error)
    }
  })
}


/**
 * Handle results found by plugin
 *
 * @param  {String} term Search term that was used for found results
 * @param  {Array or Object} result Found results (or result)
 * @return {Object}  redux action
 */
function onResultFound(term, result) {
  return {
    type: SHOW_RESULT,
    payload: {
      result,
      term,
    }
  }
}


/**
 * Action that clears everthing in search box
 *
 * @return {Object}  redux action
 */
export function reset() {
  return {
    type: RESET,
  }
}

/**
 * Action that updates search term
 *
 * @param  {String} term
 * @return {Object}  redux action
 */
export function updateTerm(term) {
  if (term === '') {
    return reset()
  }
  return (dispatch) => {
    dispatch({
      type: UPDATE_TERM,
      payload: term,
    })
    eachPlugin(term, (plugin, payload) => {
      let result = Array.isArray(payload) ? payload : [payload]
      result = result.map(x => ({
        ...x,
        plugin,
        // Scope result ids with plugin name and use title if id is empty
        id: `${plugin}-${x.id || x.title}`
      }))
      if (result.length === 0) {
        // Do not dispatch for empty results
        return
      }
      dispatch(onResultFound(term, result))
    })
  }
}

/**
 * Action to move highlighted cursor to next or prev element
 * @param  {Integer} diff 1 or -1
 * @return {Object}  redux action
 */
export function moveCursor(diff) {
  return {
    type: MOVE_CURSOR,
    payload: diff
  }
}

/**
 * Action to change highlighted element
 * @param  {Integer} index of new highlighted element
 * @return {Object}  redux action
 */
export function selectElement(index) {
  return {
    type: SELECT_ELEMENT,
    payload: index
  }
}

/**
 * Action to remove element from results list by id
 * @param  {String} id
 * @return {Object}  redux action
 */
export function hideElement(id) {
  return {
    type: HIDE_RESULT,
    payload: { id }
  }
}

/**
 * Action to update displayed element with new result
 * @param  {String} id
 * @return {Object}  redux action
 */
export function updateElement(id, result) {
  return {
    type: UPDATE_RESULT,
    payload: { id, result }
  }
}

/**
 * Change count of visible results (without scroll) in list
 */
export function changeVisibleResults(count) {
  return {
    type: CHANGE_VISIBLE_RESULTS,
    payload: count,
  }
}
