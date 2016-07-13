import { BrowserWindow, globalShortcut } from 'electron';
import {
  INPUT_HEIGHT,
  WINDOW_WIDTH,
  RESULT_HEIGHT,
  MIN_VISIBLE_RESULTS
} from './constants/ui';

import buildMenu from './createWindow/buildMenu';

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

  if (process.env.NODE_ENV !== 'development') {
    // Hide window on blur in production move
    // In development we usually use developer tools
    mainWindow.on('blur', () => mainWindow.hide());
  }

  // const HOTKEY = 'Cmd+Alt+Shift+Control+Space';
  const HOTKEY = 'Control+Space';

  globalShortcut.register(HOTKEY, () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  buildMenu(mainWindow);
  return mainWindow;
}
