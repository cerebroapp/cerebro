import { ipcRenderer } from 'electron'
import Store from 'electron-store'
import themes from './themes'

const schema = {
  locale: { type: 'string', default: 'en-US' },
  lang: { type: 'string', default: 'en' },
  country: { type: 'string', default: 'US' },
  theme: { type: 'string', default: themes[0].value },
  hotkey: { type: 'string', default: 'Control+Space' },
  showInTray: { type: 'boolean', default: true },
  firstStart: { type: 'boolean', default: true },
  developerMode: { type: 'boolean', default: false },
  cleanOnHide: { type: 'boolean', default: true },
  selectOnShow: { type: 'boolean', default: false },
  hideOnBlur: { type: 'boolean', default: true },
  skipDonateDialog: { type: 'boolean', default: false },
  lastShownDonateDialog: { type: 'number', default: 0 },
  plugins: { type: 'object', default: {} },
  isMigratedPlugins: { type: 'boolean', default: false },
  openAtLogin: { type: 'boolean', default: true },
  winPosition: { type: 'array', default: [] },
}

const store = new Store({
  schema,
  migrations: {
    '>=0.9.0': (oldStore) => {
      oldStore.delete('positions')
    },
    '>=0.10.0': (oldStore) => {
      oldStore.delete('crashreportingEnabled')
    }
  }
})

/**
 * Get a value from global configuration
 * @param  {String} key
 * @return {Any}
 */
const get = (key) => store.get(key)

/**
 * Write a value to global config. It immedately rewrites global config
 * and notifies all listeners about changes
 *
 * @param  {String} key
 * @param  {Any} value
 */
const set = (key, value) => {
  store.set(key, value)
  if (ipcRenderer) {
    console.log('notify main process', key, value)
    // Notify main process about settings changes
    ipcRenderer.send('updateSettings', key, value)
  }
}

export default { get, set }
