import * as plugins from '../plugins/';

import {
 UPDATE_TERM,
 MOVE_CURSOR,
 SELECT_ELEMENT,
 SHOW_RESULT,
 RESET,
 CHANGE_VISIBLE_RESULTS,
} from '../constants/actionTypes';


/**
 * Pass search term to all plugins and handle their results
 * @param {String} term Search tem
 * @param {Function} callback Callback function that receives used search term and found results
 */
const eachPlugin = (term, callback) => {
  // TODO: set priority to plugins
  Object.keys(plugins).forEach(name => {
    plugins[name].fn(term, callback);
  });
};


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
  };
}


/**
 * Action that clears everthing in search box
 *
 * @return {Object}  redux action
 */
export function reset() {
  return {
    type: RESET,
  };
}

/**
 * Action that updates search term
 *
 * @param  {String} term
 * @return {Object}  redux action
 */
export function updateTerm(term) {
  if (term === '') {
    return reset();
  }
  return (dispatch) => {
    dispatch({
      type: UPDATE_TERM,
      payload: term,
    });
    eachPlugin(term, (payload) => {
      const result = Array.isArray(payload) ? payload : [payload];
      if (result.length === 0) {
        // Do not dispatch for empty results
        return;
      }
      dispatch(onResultFound(term, result));
    });
  };
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
  };
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
  };
}

/**
 * Change count of visible results (without scroll) in list
 */
export function changeVisibleResults(count) {
  return {
    type: CHANGE_VISIBLE_RESULTS,
    payload: count,
  };
}
