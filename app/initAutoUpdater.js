import { autoUpdater } from 'electron-updater'

const event = 'update-downloaded'

const TEN_SECONDS = 10 * 1000
const ONE_HOUR = 60 * 60 * 1000

export default (w) => {
  if (process.env.NODE_ENV === 'development' || process.platform === 'linux') {
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
  }, TEN_SECONDS)

  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, ONE_HOUR)
}
