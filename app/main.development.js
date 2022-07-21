import {
  app, ipcMain, crashReporter, screen
} from 'electron'
import {
  WINDOW_WIDTH,
  INPUT_HEIGHT,
  RESULT_HEIGHT,
  MIN_VISIBLE_RESULTS,
} from 'main/constants/ui'

import createMainWindow from './main/createWindow'
import createBackgroundWindow from './background/createWindow'
import config from './lib/config'
import AppTray from './main/createWindow/AppTray'
import autoStart from './main/createWindow/autoStart'
import initAutoUpdater from './initAutoUpdater'

const iconSrc = {
  DEFAULT: `${__dirname}/tray_icon.png`,
  darwin: `${__dirname}/tray_iconTemplate@2x.png`,
  win32: `${__dirname}/tray_icon.ico`
}

const trayIconSrc = iconSrc[process.platform] || iconSrc.DEFAULT

const isDev = () => (process.env.NODE_ENV === 'development' || config.get('developerMode'))

let mainWindow
let backgroundWindow
let tray

if (process.env.NODE_ENV !== 'development') {
  // Set up crash reporter before creating windows in production builds
  if (config.get('crashreportingEnabled')) {
    crashReporter.start({
      globalExtra: {
        _companyName: 'Cerebro',
      },
      productName: 'Cerebro',
      submitURL: 'http://crashes.cerebroapp.com/post',
      autoSubmit: true,
      compress: false
    })
  }
}

app.whenReady().then(() => {
  mainWindow = createMainWindow({
    isDev,
    src: `file://${__dirname}/main/index.html`, // Main window html
  })
  // eslint-disable-next-line global-require
  require('@electron/remote/main').initialize()
  // eslint-disable-next-line global-require
  require('@electron/remote/main').enable(mainWindow.webContents)

  backgroundWindow = createBackgroundWindow({
    src: `file://${__dirname}/background/index.html`,
  })

  // eslint-disable-next-line global-require
  require('@electron/remote/main').enable(backgroundWindow.webContents)

  tray = new AppTray({
    src: trayIconSrc,
    isDev: isDev(),
    mainWindow,
    backgroundWindow,
  })

  // Show tray icon if it is set in configuration
  if (config.get('showInTray')) { tray.show() }

  autoStart.isEnabled().then((enabled) => {
    if (config.get('openAtLogin') !== enabled) {
      autoStart.set(config.get('openAtLogin'))
    }
  })

  initAutoUpdater(mainWindow)

  app.dock && app.dock.hide()
})

ipcMain.on('message', (event, payload) => {
  const toWindow = event.sender === mainWindow.webContents ? backgroundWindow : mainWindow
  toWindow.webContents.send('message', payload)
})

ipcMain.on('updateSettings', (event, key, value) => {
  mainWindow.settingsChanges.emit(key, value)

  // Show or hide menu bar icon when it is changed in setting
  if (key === 'showInTray') {
    value
      ? tray.show()
      : tray.hide()
  }

  // Show or hide "development" section in tray menu
  if (key === 'developerMode') { tray.setIsDev(isDev()) }

  // Enable or disable auto start
  if (key === 'openAtLogin') {
    autoStart.isEnabled().then((enabled) => {
      if (value !== enabled) autoStart.set(value)
    })
  }
})

ipcMain.on('get-window-position', (event, { width, heightWithResults }) => {
  const winWidth = typeof width !== 'undefined' ? width : WINDOW_WIDTH

  const winHeight = typeof heightWithResults !== 'undefined'
    ? heightWithResults
    : MIN_VISIBLE_RESULTS * RESULT_HEIGHT + INPUT_HEIGHT

  const display = screen.getPrimaryDisplay()

  const x = parseInt(display.bounds.x + (display.workAreaSize.width - winWidth) / 2, 10)
  const y = parseInt(display.bounds.y + (display.workAreaSize.height - winHeight) / 2, 10)

  // eslint-disable-next-line no-param-reassign
  event.returnValue = [x, y]
})

ipcMain.on('quit', () => app.quit())
