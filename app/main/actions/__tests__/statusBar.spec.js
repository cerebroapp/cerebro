/**
 * @jest-environment jsdom
 */

import {
  SET_STATUS_BAR_TEXT
} from 'main/constants/actionTypes'

import * as actions from '../statusBar'

describe('reset', () => {
  it('returns valid action', () => {
    expect(actions.reset()).toEqual({
      type: SET_STATUS_BAR_TEXT,
      payload: null
    })
  })
})

describe('setValue', () => {
  it('returns valid action when value passed', () => {
    expect(actions.setValue('test value')).toEqual({
      type: SET_STATUS_BAR_TEXT,
      payload: 'test value'
    })
  })
})
