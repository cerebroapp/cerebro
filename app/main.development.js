import { app, ipcMain, crashReporter } from 'electron'

import createMainWindow from './main/createWindow'
import createBackgroundWindow from './background/createWindow'

let mainWindow
let backgroundWindow

if (process.env.NODE_ENV !== 'development') {
  // Set up crash reporter before creating windows in production builds
  crashReporter.start({
    productName: 'Cerebro',
    companyName: 'Cerebro',
    submitURL: 'http://crashes.cerebroapp.com/post',
    autoSubmit: true
  })
}

app.on('ready', () => {
  mainWindow = createMainWindow(
    // Main window html
    `file://${__dirname}/main/index.html`,
    // Fullpath for menu bar icon
    `${__dirname}/tray_iconTemplate@2x.png`
  )
  backgroundWindow = createBackgroundWindow(`file://${__dirname}/background/index.html`)

  app.dock && app.dock.hide()
})

ipcMain.on('message', (event, payload) => {
  const toWindow = event.sender === mainWindow.webContents ? backgroundWindow : mainWindow
  toWindow.webContents.send('message', payload)
})

ipcMain.on('updateSettings', (event, key, value) => {
  mainWindow.settingsChanges.emit(key, value)
})
