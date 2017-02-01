import { BrowserWindow, globalShortcut, app } from 'electron'
import EventEmitter from 'events'
import trackEvent from '../lib/trackEvent'

import {
  INPUT_HEIGHT,
  WINDOW_WIDTH,
  THEME
} from './constants/ui'

import buildMenu from './createWindow/buildMenu'
import toggleWindow from './createWindow/toggleWindow'
import handleUrl from './createWindow/handleUrl'
import config from '../lib/config'

const themeMode = (src) => {
  let mode = 'light'

  if (src.indexOf('dark') >= 0) {
    mode = 'ultra-dark'
  }
  return mode
}

export default ({ src, isDev }) => {
  const mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    width: WINDOW_WIDTH,
    minWidth: WINDOW_WIDTH,
    height: INPUT_HEIGHT,
    frame: false,
    resizable: false,
    vibrancy: THEME,
    // Show main window on launch only when application started for the first time
    show: config.get('firstStart')
  })

  mainWindow.loadURL(src)
  mainWindow.settingsChanges = new EventEmitter()

  // Get global shortcut from app settings
  let shortcut = config.get('hotkey')

  // Function to toggle main window
  const toggleMainWindow = () => toggleWindow(mainWindow)
  // Function to show main window
  const showMainWindow = () => {
    mainWindow.show()
    mainWindow.focus()
  }

  // Setup event listeners for main window
  globalShortcut.register(shortcut, toggleMainWindow)

  // Set the theme vibrancy from config
  mainWindow.setVibrancy(themeMode(config.get('theme')))

  mainWindow.on('blur', () => {
    if (!isDev()) {
      // Hide window on blur in production
      // In development we usually use developer tools that can blur a window
      mainWindow.hide()
    }
  })

  // Change global hotkey if it is changed in app settings
  mainWindow.settingsChanges.on('hotkey', (value) => {
    globalShortcut.unregister(shortcut)
    shortcut = value
    globalShortcut.register(shortcut, toggleMainWindow)
  })

  // Change theme css file
  mainWindow.settingsChanges.on('theme', (value) => {
    mainWindow.setVibrancy(themeMode(value))
    mainWindow.webContents.send('message', {
      message: 'updateTheme',
      payload: value
    })
  })

  // Show main window when user opens application, but it is already opened
  app.on('open-file', (event, path) => handleUrl(mainWindow, path))
  app.on('open-url', (event, path) => handleUrl(mainWindow, path))
  app.on('activate', showMainWindow)

  // Track app start event
  trackEvent({
    category: 'App Start',
    event: config.get('firstStart') ? 'First' : 'Secondary'
  })

  // Save in config information, that application has been started
  config.set('firstStart', false)

  buildMenu(mainWindow)
  return mainWindow
}
