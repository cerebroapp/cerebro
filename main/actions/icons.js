import { ICON_LOADED } from '../constants/actionTypes';
import getNativeIcon from 'lib/getNativeIcon';

/**
 * Action to read and and save in store native OSx icon for file
 * @param  {String} path to file
 * @return {Object}  redux action
 */
export function loadIcon(path) {
  return (dispatch) => {
    getNativeIcon(path).then(icon => {
      dispatch({
        type: ICON_LOADED,
        payload: {
          path,
          icon,
        }
      });
    }).catch(() => {
      // Icon can't be fetched
    });
  };
}
