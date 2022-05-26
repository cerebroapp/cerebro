import { app, ipcMain, crashReporter } from 'electron'

import createMainWindow from './main/createWindow'
import createBackgroundWindow from './background/createWindow'
import config from './lib/config'
import AppTray from './main/createWindow/AppTray'
import autoStart from './main/createWindow/autoStart'
import initAutoUpdater from './initAutoUpdater'

let trayIconSrc = `${__dirname}/tray_icon.png`
if (process.platform === 'darwin') {
  trayIconSrc = `${__dirname}/tray_iconTemplate@2x.png`
} else if (process.platform === 'win32') {
  trayIconSrc = `${__dirname}/tray_icon.ico`
}

const isDev = () => (
  process.env.NODE_ENV === 'development' || config.get('developerMode')
)

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

app.on('ready', () => {
  mainWindow = createMainWindow({
    isDev,
    // Main window html
    src: `file://${__dirname}/main/index.html`,
  })

  backgroundWindow = createBackgroundWindow({
    src: `file://${__dirname}/background/index.html`,
  })

  tray = new AppTray({
    src: trayIconSrc,
    isDev: isDev(),
    mainWindow,
    backgroundWindow,
  })

  // Show tray icon if it is set in configuration
  if (config.get('showInTray')) {
    tray.show()
  }

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
    value ? tray.show() : tray.hide()
  }

  // Show or hide "development" section in tray menu
  if (key === 'developerMode') {
    tray.setIsDev(isDev())
  }

  // Enable or disable auto start
  if (key === 'openAtLogin') {
    autoStart.isEnabled().then((enabled) => {
      if (value !== enabled) {
        autoStart.set(value)
      }
    })
  }
})
