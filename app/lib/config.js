import { app, ipcRenderer } from 'electron'
import fs from 'fs'
import path from 'path'
import { memoize } from 'cerebro-tools'
import themes from './themes'

const remote = process.type === 'browser'
  ? undefined
  : require('@electron/remote')

const electronApp = remote ? remote.app : app

// initiate portable mode
// set data directory to ./userdata
process.argv.forEach((arg) => {
  if (arg.toLowerCase() === '-p' || arg.toLowerCase() === '--portable') {
    electronApp.setPath('userData', path.join(process.cwd(), 'userdata'))
  }
})

const CONFIG_FILE = path.join(electronApp.getPath('userData'), 'config.json')

const defaultSettings = memoize(() => {
  const locale = electronApp.getLocale() || 'en-US'
  const [lang, country] = locale.split('-')
  return {
    locale,
    lang,
    country,
    theme: themes[0].value,
    hotkey: 'Control+Space',
    showInTray: true,
    firstStart: true,
    developerMode: false,
    cleanOnHide: true,
    hideOnBlur: true,
    skipDonateDialog: false,
    lastShownDonateDialog: null,
    plugins: {},
    isMigratedPlugins: false,
    crashreportingEnabled: true,
    openAtLogin: true
  }
})

const readConfig = () => {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE).toString())
  } catch (err) {
    const config = defaultSettings()

    if (err.code !== 'ENOENT') {
      console.error('Error reading config file', err)
      return config
    }

    if (process.env.NODE_ENV === 'test') return config

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2))
    return defaultSettings()
  }
}

/**
 * Get a value from global configuration
 * @param  {String} key
 * @return {Any}
 */
const get = (key) => {
  const config = readConfig()
  return config[key]
}

/**
 * Write a value to global config. It immedately rewrites global config
 * and notifies all listeners about changes
 *
 * @param  {String} key
 * @param  {Any} value
 */
const set = (key, value) => {
  const config = {
    // If after app update some keys were added to config
    // we use default values for that keys
    ...defaultSettings(),
    ...readConfig()
  }
  config[key] = value
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2))

  if (ipcRenderer) {
    console.log('notify main process', key, value)
    // Notify main process about settings changes
    ipcRenderer.send('updateSettings', key, value)
  }
}

export default { get, set }
