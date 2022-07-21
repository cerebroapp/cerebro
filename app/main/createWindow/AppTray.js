import { Menu, Tray, app } from 'electron'
import showWindowWithTerm from './showWindowWithTerm'
import toggleWindow from './toggleWindow'
import checkForUpdates from './checkForUpdates'
import { donate } from './donateDialog'

/**
 * Class that controls state of icon in menu bar
 */
export default class AppTray {
  /**
   * @param  {String} options.src Absolute path for tray icon
   * @param  {Function} options.isDev Development mode or not
   * @param  {BrowserWindow} options.mainWindow
   * @param  {BrowserWindow} options.backgroundWindow
   * @return {AppTray}
   */
  constructor(options) {
    this.tray = null
    this.options = options
  }

  /**
   * Show application icon in menu bar
   */
  show() {
    const tray = new Tray(this.options.src)
    tray.setToolTip('Cerebro')
    tray.setContextMenu(this.buildMenu())
    this.tray = tray
  }

  setIsDev(isDev) {
    this.options.isDev = isDev
    if (this.tray) {
      this.tray.setContextMenu(this.buildMenu())
    }
  }

  buildMenu() {
    const { mainWindow, backgroundWindow, isDev } = this.options
    const separator = { type: 'separator' }

    const template = [
      {
        label: 'Toggle Cerebro',
        click: () => toggleWindow(mainWindow)
      },
      separator,
      {
        label: 'Plugins',
        click: () => showWindowWithTerm(mainWindow, 'plugins'),
      },
      {
        label: 'Preferences...',
        click: () => showWindowWithTerm(mainWindow, 'Cerebro Settings'),
      },
      separator,
      {
        label: 'Check for updates',
        click: () => checkForUpdates(),
      },
      separator,
      {
        label: 'Donate...',
        click: donate
      }
    ]

    if (isDev) {
      template.push(separator)
      template.push({
        label: 'Development',
        submenu: [
          {
            label: 'DevTools (main)',
            click: () => mainWindow.webContents.openDevTools({ mode: 'detach' })
          },
          {
            label: 'DevTools (background)',
            click: () => backgroundWindow.webContents.openDevTools({ mode: 'detach' })
          },
          {
            label: 'Reload',
            click: () => {
              mainWindow.reload()
              backgroundWindow.reload()
              backgroundWindow.hide()
            }
          }]
      })
    }

    template.push(separator)
    template.push({
      label: 'Quit Cerebro',
      click: () => app.quit()
    })
    return Menu.buildFromTemplate(template)
  }

  /**
   * Hide icon in menu bar
   */
  hide() {
    if (this.tray) {
      this.tray.destroy()
      this.tray = null
    }
  }
}
