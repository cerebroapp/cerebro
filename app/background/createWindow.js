import { BrowserWindow } from 'electron'

export default ({ src }) => {
  const backgroundWindow = new BrowserWindow({
    show: false,
  })
  backgroundWindow.loadURL(src)
  return backgroundWindow
}
