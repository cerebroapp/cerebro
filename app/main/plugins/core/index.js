/* eslint-disable import/no-mutable-exports, global-require */

// Core plugins
const plugins = {
  autocomplete: require('./autocomplete'),
  converter: require('./converter'),
  files: require('./files'),
  google: require('./google'),
  maps: require('./maps'),
  math: require('./math'),
  openWeb: require('./openWeb'),
  plugins: require('./plugins'),
  settings: require('./settings'),
  translate: require('./translate')
}

if (process.platform === 'darwin') {
  // Add osx-only plugins
  plugins.apps = require('./apps')
  plugins.contacts = require('./contacts')
  plugins.define = require('./define')
}

module.exports = plugins
