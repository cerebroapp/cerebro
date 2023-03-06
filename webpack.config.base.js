const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  module: {
    rules: [{
      test: /\.(js|ts)x?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
      type: 'asset/inline'
    }]
  },
  output: {
    path: path.join(__dirname, 'app'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'app'),
      'node_modules'
    ],
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'app/main/css/themes/*',
        to: './main/css/themes/[name][ext]'
      }]
    })
  ]
}
