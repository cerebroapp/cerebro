import {
  BrowserWindow, globalShortcut, app, shell
} from 'electron'
import debounce from 'lodash/debounce'
import EventEmitter from 'events'
import config from 'lib/config'

import {
  INPUT_HEIGHT,
  WINDOW_WIDTH
} from './constants/ui'

import buildMenu from './createWindow/buildMenu'
import toggleWindow from './createWindow/toggleWindow'
import handleUrl from './createWindow/handleUrl'
import * as donateDialog from './createWindow/donateDialog'

export default ({ src, isDev }) => {
  const [x, y] = config.get('winPosition')

  const browserWindowOptions = {
    width: WINDOW_WIDTH,
    minWidth: WINDOW_WIDTH,
    height: INPUT_HEIGHT,
    x,
    y,
    frame: false,
    resizable: false,
    transparent: true,
    show: config.get('firstStart'),
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,
      enableRemoteModule: true,
      contextIsolation: false
    },
    // Show main window on launch only when application started for the first time
  }

  if (process.platform === 'linux') {
    browserWindowOptions.type = 'splash'
  }

  const mainWindow = new BrowserWindow(browserWindowOptions)

  // Workaround to set the position the first time (centers the window)
  config.set('winPosition', mainWindow.getPosition())

  // Float main window above full-screen apps
  mainWindow.setAlwaysOnTop(true, 'modal-panel')

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

  mainWindow.on('blur', () => {
    if (!isDev() && config.get('hideOnBlur')) {
      // Hide window on blur in production
      // In development we usually use developer tools that can blur a window
      mainWindow.hide()
    }
  })

  // Save window position when it is being moved
  mainWindow.on('move', debounce(() => {
    if (!mainWindow.isVisible()) {
      return
    }

    config.set('winPosition', mainWindow.getPosition())
  }, 100))

  mainWindow.on('close', app.quit)

  mainWindow.webContents.on('new-window', (event, url) => {
    shell.openExternal(url)
    event.preventDefault()
  })

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url !== mainWindow.webContents.getURL()) {
      shell.openExternal(url)
      event.preventDefault()
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
    mainWindow.webContents.send('message', {
      message: 'updateTheme',
      payload: value
    })
  })

  mainWindow.settingsChanges.on('proxy', (value) => {
    mainWindow.webContents.session.setProxy({
      proxyRules: value
    })
  })

  // Handle window.hide: if cleanOnHide value in preferences is true
  // we clear all results and show empty window every time
  const resetResults = () => {
    mainWindow.webContents.send('message', {
      message: 'showTerm',
      payload: ''
    })
  }

  // Handle change of cleanOnHide value in settins
  const handleCleanOnHideChange = (value) => {
    if (value) {
      mainWindow.on('hide', resetResults)
    } else {
      mainWindow.removeListener('hide', resetResults)
    }
  }

  // Set or remove handler when settings changed
  mainWindow.settingsChanges.on('cleanOnHide', handleCleanOnHideChange)

  // Set initial handler if it is needed
  handleCleanOnHideChange(config.get('cleanOnHide'))

  // Restore focus in previous application
  // MacOS only: https://github.com/electron/electron/blob/master/docs/api/app.md#apphide-macos
  if (process.platform === 'darwin') {
    mainWindow.on('hide', () => {
      app.hide()
    })
  }

  // Show main window when user opens application, but it is already opened
  app.on('open-file', (event, path) => handleUrl(mainWindow, path))
  app.on('open-url', (event, path) => handleUrl(mainWindow, path))
  app.on('activate', showMainWindow)

  // Someone tried to run a second instance, we should focus our window.
  const shouldQuit = app.requestSingleInstanceLock()

  if (!shouldQuit) {
    app.quit()
  } else {
    app.on('second-instance', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
    })
  }

  if (donateDialog.shouldShow()) {
    setTimeout(donateDialog.show, 1000)
  }

  // Save in config information, that application has been started
  config.set('firstStart', false)

  buildMenu(mainWindow)
  return mainWindow
}
