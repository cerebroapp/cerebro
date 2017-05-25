import * as os from "os";
import { dialog, } from 'electron'
import { autoUpdater } from "electron-updater";

const event = 'update-downloaded'

export default (w) => {
  if (process.env.NODE_ENV === 'development' || os.platform() === "linux") {
    return
  }

  autoUpdater.on(event, (payload) => {
    w.webContents.send('message', {
      message: event,
      payload
    })
  })

  setTimeout(() => {
    autoUpdater.checkForUpdates()
  }, 10 * 1000)

  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 60 * 60 * 1000)
}