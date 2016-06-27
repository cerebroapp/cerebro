/* eslint no-shadow: [2, { "allow": ["comments"] }] */

import {
  ICON_LOADED,
} from '../constants/actionTypes';


const initialState = {
  // Search term in main input
  byPath: {},
};

export default function icons(state = initialState, { type, payload }) {
  switch (type) {
    case ICON_LOADED: {
      return {
        byPath: {
          ...state.byPath,
          [payload.path]: payload.icon
        },
      };
    }
    default:
      return state;
  }
}
