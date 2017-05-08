/* eslint-disable import/no-mutable-exports, global-require */

// Core plugins
const plugins = {
  ...require('./cerebro'),
  files: require('./files'),
  google: require('./google'),
  maps: require('./maps'),
  math: require('./math'),
  openWeb: require('./openWeb'),
  translate: require('./translate')
}

if (process.platform === 'darwin') {
  plugins.apps = require('./osx-apps')
} else {
  plugins.apps = require('./basic-apps')
}

if (process.platform === 'win32') {
  // Add windows-only plugins
  plugins.apps = require('./windows-apps')
}

module.exports = plugins
