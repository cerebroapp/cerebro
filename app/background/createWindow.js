import { BrowserWindow } from 'electron'

export default ({ src }) => {
  const backgroundWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,
      enableRemoteModule: true,
      contextIsolation: false
    },
  })

  backgroundWindow.loadURL(src)
  return backgroundWindow
}
