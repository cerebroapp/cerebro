import { BrowserWindow } from 'electron'

export default (url) => {
  const backgroundWindow = new BrowserWindow({
    show: false,
  })
  backgroundWindow.loadURL(url)
  return backgroundWindow
}
