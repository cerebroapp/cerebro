import { app, ipcMain } from 'electron'
import path from 'path'

import createMainWindow from './main/createWindow'
import createBackgroundWindow from './background/createWindow'
import config from './lib/config'
import AppTray from './main/createWindow/AppTray'
import autoStart from './main/createWindow/autoStart'
import initAutoUpdater from './initAutoUpdater'

import {
  WINDOW_WIDTH,
} from 'main/constants/ui'

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

const setupEnvVariables = () => {
  process.env.CEREBRO_VERSION = app.getVersion()

  const isPortableMode = process.argv.some((arg) => arg.toLowerCase() === '-p' || arg.toLowerCase() === '--portable')
  // initiate portable mode
  // set data directory to ./userdata
  if (isPortableMode) {
    const userDataPath = path.join(process.cwd(), 'userdata')
    app.setPath('userData', userDataPath)
    process.env.CEREBRO_DATA_PATH = userDataPath
  } else {
    process.env.CEREBRO_DATA_PATH = app.getPath('userData')
  }
}

app.whenReady().then(() => {
  // We cannot require the screen module until the app is ready.
  const { screen } = require('electron')

  setupEnvVariables()

  mainWindow = createMainWindow({
    isDev,
    src: `file://${__dirname}/main/index.html`, // Main window html
  })

  mainWindow.on('show', (event) => {
    const cursorScreenPoint = screen.getCursorScreenPoint()
    const nearestDisplay = screen.getDisplayNearestPoint(cursorScreenPoint)

    const goalWidth = WINDOW_WIDTH
    const goalX = Math.floor(nearestDisplay.bounds.x + (nearestDisplay.size.width - goalWidth) / 2)
    const goalY = nearestDisplay.bounds.y + 200 // "top" is hardcoded now, should get from config or calculate accordingly?

    config.set('winPosition', [goalX, goalY])
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

  app?.dock?.hide()
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

ipcMain.on('quit', () => app.quit())
ipcMain.on('reload', () => {
  app.relaunch()
  app.exit()
})
