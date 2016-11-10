/**
 * Show settings in main window
 * @return {BrowserWindow} appWindow
 */
export default (appWindow) => {
  appWindow.show();
  appWindow.focus();
  appWindow.webContents.send('message', {
    message: 'showTerm',
    payload: 'Preferences'
  });
}
