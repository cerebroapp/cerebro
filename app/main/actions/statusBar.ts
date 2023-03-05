import {
  SET_STATUS_BAR_TEXT
} from '../constants/actionTypes'

export function reset(): { type: string, payload: null } {
  return {
    type: SET_STATUS_BAR_TEXT,
    payload: null
  }
}

export function setValue(text: string): { type: string, payload: string } {
  return {
    type: SET_STATUS_BAR_TEXT,
    payload: text
  }
}
