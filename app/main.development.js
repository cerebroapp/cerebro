import { app, ipcMain } from 'electron'
import path from 'path'

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
  setupEnvVariables()

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
