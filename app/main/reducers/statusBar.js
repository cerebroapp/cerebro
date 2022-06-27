/* eslint no-shadow: [2, { "allow": ["comments"] }] */

import {
  SET_STATUS_BAR_TEXT
} from 'main/constants/actionTypes'

const initialState = {
  text: null
}


export default function search(state = initialState, { type, payload }) {
  switch (type) {
    case SET_STATUS_BAR_TEXT: {
      return {
        ...state,
        text: payload
      }
    }
    default:
      return state
  }
}
