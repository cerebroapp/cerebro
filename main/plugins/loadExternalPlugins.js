import { app, remote } from 'electron';
import fs from 'fs';
import path from 'path';

const electronApp = remote ? remote.app : app;
const externalPluginsPath = electronApp.getPath('userData') + '/plugins/node_modules';

/**
 * Validate plugin module signature
 *
 * @param  {[type]} plugin [description]
 * @return {[type]}        [description]
 */
const validatePlugin = (plugin) => (
  plugin &&
    // Check existing of main plugin function
    typeof plugin.fn === 'function' &&
    // Check that plugin function accepts 0 or 1 argument
    plugin.fn.length <= 1
);

export default () => {
  if (!fs.existsSync(externalPluginsPath)) {
    fs.mkdirSync(externalPluginsPath);
  }
  const files = fs.readdirSync(externalPluginsPath);
  return files.reduce((acc, file) => {
    const pluginPath = path.join(externalPluginsPath, file);
    const isDir = fs.statSync(pluginPath).isDirectory();
    if (isDir) {
      try {
        console.log('Loading external plugin ', pluginPath);
        const plugin = window.require(pluginPath);
        if (!validatePlugin(plugin)) {
          console.log('External plugin is not valid');
          return;
        }
        acc[file] = plugin;
      } catch(error) {
        // catch all errors from plugin loading
        console.log('Error loading external plugin');
        console.log(error);
      }
    }
    return acc;
  }, {});
}
