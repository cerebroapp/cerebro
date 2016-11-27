import { app, remote } from 'electron';
import fs from 'fs';
import path from 'path';

const electronApp = remote ? remote.app : app;
const externalPluginsPath = electronApp.getPath('userData') + '/plugins';

export default () => {
  if (!fs.existsSync(externalPluginsPath)) {
    fs.mkdirSync(externalPluginsPath);
  }
  const files = fs.readdirSync(externalPluginsPath);
  const plugins = files.reduce((acc, file) => {
    const pluginPath = path.join(externalPluginsPath, file);
    const isDir = fs.statSync(pluginPath).isDirectory();
    if (isDir) {
      console.log('Load external plugin...', pluginPath);
      // Use window.require instead of webpack require because
      acc[file] = window.require(pluginPath);
    }
    return acc;
  }, {});
  return plugins;
}
