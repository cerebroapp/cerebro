import { app, remote } from 'electron';
import fs from 'fs';
import { ipcRenderer } from 'electron';
import memoize from 'memoizee';
import trackEvent from './trackEvent';

const electronApp = remote ? remote.app : app;

const CONFIG_FILE = `${electronApp.getPath('userData')}/config.json`;

const defaultSettings = memoize(() => {
  const locale = electronApp.getLocale() || 'en-US';
  const [ lang, country ] = locale.split('-');
  return {
    locale,
    lang,
    country,
    hotkey: 'Control+Space',
    showInTray: true,
    firstStart: true
  };
})

/**
 * Get a value from global configuration
 * @param  {String} key
 * @return {Any}
 */
const get = (key) => {
  let config;
  if (!fs.existsSync(CONFIG_FILE)) {
    // Save default config to local storage
    config = defaultSettings();
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config));
  } else {
    config = JSON.parse(fs.readFileSync(CONFIG_FILE).toString());
  }
  return config[key];
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
    ...JSON.parse(fs.readFileSync(CONFIG_FILE).toString())
  }
  config[key] = value;
  fs.writeFile(CONFIG_FILE, JSON.stringify(config));
  // Track settings changes
  trackEvent({
    category: 'Settings',
    event: `Change ${key}`,
    label: value,
  });
  if (ipcRenderer) {
    console.log('notify main process', key, value);
    // Notify main process about settings changes
    ipcRenderer.send('updateSettings', key, value);
  }
}

export default { get, set }
