import expect from 'expect';
import searchInjector from 'inject!../../main/actions/search';

import {
  MOVE_CURSOR,
  SELECT_ELEMENT,
  RESET,
} from '../../main/constants/actionTypes';

const testPlugin = {
  fn: () => {}
};

const pluginsMock = {
  'test-plugin': testPlugin
};

const actions = searchInjector({
  electron: {},
  '../plugins/': pluginsMock,
  'lib/config': {}
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
