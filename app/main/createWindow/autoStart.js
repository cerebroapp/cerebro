import { app } from 'electron'
import AutoLaunch from 'auto-launch'

const isLinux = !['win32', 'darwin'].includes(process.platform)
const isDevelopment = process.env.NODE_ENV === 'development'

const appLauncher = isLinux
  ? new AutoLaunch({ name: 'Cerebro' })
  : null

const isEnabled = async () => (
  isLinux
    ? appLauncher.isEnabled()
    : app.getLoginItemSettings().openAtLogin
)

const set = async (openAtLogin) => {
  const openAtStartUp = openAtLogin && !isDevelopment
  if (isLinux) {
    return openAtStartUp
      ? appLauncher.enable()
      : appLauncher.disable()
  }

  return app.setLoginItemSettings({ openAtLogin: openAtStartUp })
}

export default { isEnabled, set }
