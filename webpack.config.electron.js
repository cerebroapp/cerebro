const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  })
]

module.exports = {
  ...baseConfig,
  mode: process.env.NODE_ENV,
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: ['babel-loader']
    }]
  },

  plugins,

  devtool: 'source-map',
  entry: './app/main.development',

  output: {
    ...baseConfig.output,
    path: __dirname,
    filename: './app/main.js'
  },

  target: 'electron-main',

  node: {
    __dirname: false,
    __filename: false
  },
}
