const config = require('./webpack.config.base');

config.target = 'electron-renderer'

module.exports = config
