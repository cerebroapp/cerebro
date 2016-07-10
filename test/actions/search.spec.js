import expect from 'expect';
import searchInjector from 'inject!../../app/actions/search';

import {
  UPDATE_TERM,
  MOVE_CURSOR,
  SELECT_ELEMENT,
  SHOW_RESULT,
  RESET,
} from '../../app/constants/actionTypes';

let testPlugin = {
  fn: () => {}
};

let pluginsMock = {
  'test-plugin': testPlugin
}

let actions = searchInjector({
  '../plugins/': pluginsMock,
});

describe('reset', () => {
  it('returns valid action', () => {
    expect(actions.reset()).toEqual({
      type: RESET,
    });
  });
});

describe('moveCursor', () => {
  it('returns valid action for +1', () => {
    expect(actions.moveCursor(1)).toEqual({
      type: MOVE_CURSOR,
      payload: 1
    });
  });

  it('returns valid action for -1', () => {
    expect(actions.moveCursor(-1)).toEqual({
      type: MOVE_CURSOR,
      payload: -1
    });
  });
});

describe('selectElement', () => {
  it('returns valid action', () => {
    expect(actions.selectElement(15)).toEqual({
      type: SELECT_ELEMENT,
      payload: 15
    });
  });
});

describe('updateTerm', () => {
  context('for empty term', () => {
    it('returns reset action', () => {
      expect(actions.updateTerm('')).toEqual({
        type: RESET,
      });
    });
  });
});
