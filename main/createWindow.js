import { BrowserWindow, globalShortcut, app } from 'electron';
import EventEmitter from 'events';

import {
  INPUT_HEIGHT,
  WINDOW_WIDTH,
  RESULT_HEIGHT,
  MIN_VISIBLE_RESULTS
} from './constants/ui';

import buildMenu from './createWindow/buildMenu';
import AppTray from './createWindow/AppTray';
import * as config from '../lib/config';

export default (url, trayIconSrc) => {
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
  mainWindow.settingsChanges = new EventEmitter();

  // Get global shortcut from app settings
  let shortcut = config.get('hotkey');

  // Show or hide main window
  const toggleWindow = () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  };

  // Show settings in main window
  const showSettings = () => {
    mainWindow.show();
    mainWindow.focus();
    mainWindow.webContents.send('message', {
      message: 'showTerm',
      payload: 'Preferences'
    });
  }

  const tray = new AppTray({
    src: trayIconSrc,
    onToggleWindow: toggleWindow,
    onShowSettings: showSettings,
    onQuit: () => app.quit()
  })

  // Setup event listeners for main window
  globalShortcut.register(shortcut, toggleWindow);
  if (process.env.NODE_ENV !== 'development') {
    // Hide window on blur in production move
    // In development we usually use developer tools
    mainWindow.on('blur', () => mainWindow.hide());
  }

  if (config.get('showInTray')) {
    tray.show();
  }

  // Change global hotkey if it is changes in app settins
  mainWindow.settingsChanges.on('hotkey', (value) => {
    globalShortcut.unregister(shortcut);
    shortcut = value;
    globalShortcut.register(shortcut, toggleWindow);
  });

  // Show or hide menu bar icon what it is changed in setting
  mainWindow.settingsChanges.on('showInTray', (value) => {
    value ? tray.show() : tray.hide();
  });

  buildMenu(mainWindow);
  return mainWindow;
}
