import { app } from 'electron'
import AutoLaunch from 'auto-launch'

let appLauncher

const isLinux = ['win32', 'darwin'].indexOf(process.platform) === -1

if (isLinux) {
  appLauncher = new AutoLaunch({ name: 'Cerebro' })
}

const isEnabled = () => (
  isLinux
    ? appLauncher.isEnabled()
    : Promise.resolve(app.getLoginItemSettings().openAtLogin)
)

const set = (openAtLogin) => {
  if (isLinux) {
    return openAtLogin ? appLauncher.enable() : appLauncher.disable()
  }
  return app.setLoginItemSettings({ openAtLogin })
}

export default { isEnabled, set }
