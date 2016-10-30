import { app, remote } from 'electron';
import fs from 'fs';
import { ipcRenderer } from 'electron';

const electronApp = remote ? remote.app : app;

const CONFIG_FILE = `${electronApp.getPath('userData')}/config.json`;

export const get = (key) => {
  let config;
  if (!fs.existsSync(CONFIG_FILE)) {
    // Save default config to local storage
    const locale = electronApp.getLocale() || 'en-US';
    const [ lang, country ] = locale.split('-');
    config = {
      locale,
      lang,
      country,
      hotkey: 'Control+Space',
    };
    fs.writeFile(CONFIG_FILE, JSON.stringify(config));
  } else {
    config = JSON.parse(fs.readFileSync(CONFIG_FILE).toString());
  }
  return config[key];
}

export const set = (key, value) => {
  const config = JSON.parse(fs.readFileSync(CONFIG_FILE).toString());
  config[key] = value;
  fs.writeFile(CONFIG_FILE, JSON.stringify(config));
  if (ipcRenderer) {
    console.log('notify main process', key, value);
    // Notify main process about settings changes
    ipcRenderer.send('updateSettings', key, value);
  }
}
