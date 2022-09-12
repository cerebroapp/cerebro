/**
 * @jest-environment jsdom
 */

import {
  MOVE_CURSOR,
  SELECT_ELEMENT,
  UPDATE_RESULT,
  HIDE_RESULT,
  RESET,
} from 'main/constants/actionTypes'

import * as actions from '../search'

describe('reset', () => {
  it('returns valid action', () => {
    expect(actions.reset()).toEqual({
      type: RESET,
    })
  })
})

describe('moveCursor', () => {
  it('returns valid action for +1', () => {
    expect(actions.moveCursor(1)).toEqual({
      type: MOVE_CURSOR,
      payload: 1
    })
  })

  it('returns valid action for -1', () => {
    expect(actions.moveCursor(-1)).toEqual({
      type: MOVE_CURSOR,
      payload: -1
    })
  })
})

describe('selectElement', () => {
  it('returns valid action', () => {
    expect(actions.selectElement(15)).toEqual({
      type: SELECT_ELEMENT,
      payload: 15
    })
  })
})

describe('updateTerm', () => {
  describe('for empty term', () => {
    it('returns reset action', () => {
      expect(actions.updateTerm('')).toEqual({
        type: RESET,
      })
    })
  })
})

describe('updateElement', () => {
  it('returns valid action', () => {
    const id = 1
    const result = { title: 'updated' }
    expect(actions.updateElement(id, result)).toEqual({
      type: UPDATE_RESULT,
      payload: { id, result }
    })
  })
})

describe('hideElement', () => {
  it('returns valid action', () => {
    const id = 1
    expect(actions.hideElement(id)).toEqual({
      type: HIDE_RESULT,
      payload: { id }
    })
  })
})
