/* eslint-disable import/no-mutable-exports, global-require */

// Core plugins
const plugins = {
  ...require('./cerebro'),
  files: require('./files')
}

if (process.platform === 'darwin') {
  plugins.apps = require('./osx-apps')
} else {
  plugins.apps = require('./basic-apps')
}

module.exports = plugins
