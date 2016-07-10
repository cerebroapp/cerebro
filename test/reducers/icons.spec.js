import expect from 'expect';
import iconsReducer from '../../app/reducers/icons.js';
import {
  ICON_LOADED,
} from '../../app/constants/actionTypes';


describe('icons reducer', () => {
  let icon = 'icon.png';
  let path = '/path/to/app.app';
  it('adds new icon', () => {
    let state = {byPath: {}};

    const newState = iconsReducer(state, {
      type: ICON_LOADED,
      payload: {
        icon,
        path
      }
    })
    expect(newState.byPath[path]).toEqual(icon);
  });

  it('replaces existing icon', () => {
    let state = {byPath: {
      [path]: 'old-icon.png'
    }};

    const newState = iconsReducer(state, {
      type: ICON_LOADED,
      payload: {
        icon,
        path
      }
    })
    expect(newState.byPath[path]).toEqual(icon);
  });
});
