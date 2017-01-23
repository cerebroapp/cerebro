import * as os from "os";
import { dialog, } from 'electron'
import { autoUpdater } from "electron-updater";

const event = 'update-downloaded'

export default class AppUpdater {
  constructor(w) {
    if (process.env.NODE_ENV === 'development' || os.platform() === "linux") {
      return
    }

    autoUpdater.on(event, (payload) => {
      w.webContents.send('message', {
        message: event,
        payload
      })
    })

    autoUpdater.checkForUpdates()
  }
}
