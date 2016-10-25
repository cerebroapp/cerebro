import { ICON_LOADED } from '../constants/actionTypes';
import getNativeIcon from 'lib/getNativeIcon';

/**
 * Action to save in store native OSx icon for file
 * @param  {Object} payload icon and path
 * @return {Object}  redux action
 */
export function saveIcon(payload) {
  return {
    type: ICON_LOADED,
    payload
  }
}

/**
 * Action to read and and save in store native OSx icon for file
 * @param  {String} path to file
 * @return {Object}  redux action
 */
export function loadIcon(path) {
  return (dispatch) => {
    getNativeIcon(path).then(icon => {
      const payload = {
        path,
        icon,
      };
      dispatch(saveIcon(payload));
    }).catch(() => {
      // Icon can't be fetched
    });
  };
}
