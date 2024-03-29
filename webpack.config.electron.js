const baseConfig = require('./webpack.config.base')

module.exports = {
  ...baseConfig,
  module: {
    rules: [{
      test: /\.(js|ts)x?$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  },
  devtool: 'source-map',
  entry: './app/main.development',
  output: {
    ...baseConfig.output,
    filename: './main.js'
  },
  target: 'electron-main'
}
