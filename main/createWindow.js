import { BrowserWindow, globalShortcut } from 'electron';
import {
  INPUT_HEIGHT,
  WINDOW_WIDTH,
  RESULT_HEIGHT,
  MIN_VISIBLE_RESULTS
} from './constants/ui';

import buildMenu from './createWindow/buildMenu';

import { get } from '../lib/config';

export default (url) => {
  const mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    show: false,
    width: WINDOW_WIDTH,
    minWidth: WINDOW_WIDTH,
    height: INPUT_HEIGHT,
    minHeight: INPUT_HEIGHT + RESULT_HEIGHT * MIN_VISIBLE_RESULTS,
    frame: false,
    resizable: false
  });

  mainWindow.loadURL(url);

  // Get global shortcut from app settings
  let shortCut = get('hotkey');

  if (process.env.NODE_ENV !== 'development') {
    // Hide window on blur in production move
    // In development we usually use developer tools
    mainWindow.on('blur', () => mainWindow.hide());
  }

  /**
   * Handle global shortcut function. Show or hide main window
   *
   * @return {Function}
   */
  const handleShortcut = () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  };

  globalShortcut.register(shortCut, handleShortcut);

  mainWindow.onUpdateSettings = (key, value) => {
    if (key === 'hotkey' && value != shortCut) {
      console.log('hotkey updated to', value);
      globalShortcut.unregister(shortCut);
      shortCut = value;
      globalShortcut.register(shortCut, handleShortcut);
    }
  }

  buildMenu(mainWindow);
  return mainWindow;
}
