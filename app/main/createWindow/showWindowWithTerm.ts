/**
 * Show main window with updated search term
 *
 * @return {BrowserWindow} appWindow
 */
export default (appWindow: any, term: string) => {
  appWindow.show()
  appWindow.focus()
  appWindow.webContents.send('message', {
    message: 'showTerm',
    payload: term
  })
}
