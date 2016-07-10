import expect from 'expect';
import actionsInjector from 'inject!../../app/actions/icons';

import { ICON_LOADED } from '../../app/constants/actionTypes';

const icon = 'icon.jpg';
const getNativeIconMock = () => Promise.resolve('icon.jpg');

const actions = actionsInjector({
  '../lib/getNativeIcon': getNativeIconMock,
});

describe('loadIcon', () => {
  it('dispatch an action', () => {
    const path = 'Something.app';
    const dispatch = (action) => {
      expect(action).toEqual({
        type: ICON_LOADED,
        payload: {
          path,
          icon,
        }
      });
    }
    actions.loadIcon(path)(dispatch);
  });
});
