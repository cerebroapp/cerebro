import { app } from 'electron'

/**
 * Show or hide main window
 * @return {BrowserWindow} appWindow
 */
export default (appWindow) => {
  if (appWindow.isVisible()) {
    appWindow.hide()
    app.hide()
  } else {
    appWindow.show()
    appWindow.focus()
  }
}
