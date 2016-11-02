import { Menu, Tray } from 'electron';

/**
 * Class that controls state of icon in menu bar
 */
export default class AppTray {
  /**
   * @param  {String} options.src Absolute path for tray icon
   * @param  {Function} options.onToggleWindow Handle toggle main window
   * @param  {Function} options.onShowSettings Handle show settings
   * @param  {Function} options.onQuit  Handle quit from application
   * @return {AppTray}
   */
  constructor({src, onToggleWindow, onShowSettings, onQuit}){
    this.tray = null;
    this.src = src;
    this._contextMenu = Menu.buildFromTemplate([
      {
        label: 'Toggle Cerebro',
        click: onToggleWindow
      },
      { type: 'separator' },
      {
        label: 'Preferences',
        click: onShowSettings
      },
      { type: 'separator' },
      {
        label: 'Quit Cerebro',
        click: onQuit
      }
    ])
  }
  /**
   * Show application icon in menu bar
   */
  show() {
    const tray =  new Tray(this.src);
    tray.setToolTip('Cerebro')
    tray.setContextMenu(this._contextMenu)
    this.tray = tray;
  }
  /**
   * Hide icon in menu bar
   */
  hide() {
    if (this.tray) {
      this.tray.destroy();
      this.tray = null;
    }
  }
}
