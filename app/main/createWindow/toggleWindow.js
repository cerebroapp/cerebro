import { app } from 'electron'

/**
 * Show or hide main window
 * @return {BrowserWindow} appWindow
 */
export default (appWindow) => {
  if (appWindow.isVisible()) {
    appWindow.hide()
    if (process.platform === 'darwin') {
      // Restore focus in previous application
      // MacOS only: https://github.com/electron/electron/blob/master/docs/api/app.md#apphide-macos
      app.hide()
    }
  } else {
    appWindow.show()
    appWindow.focus()
  }
}
