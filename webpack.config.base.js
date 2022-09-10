const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

// all dependecies from app/package.json will be included in build/node_modules
const externals = Object.assign(
  require('./app/package.json').dependencies,
  require('./app/package.json').optionalDependencies
)

module.exports = {
  module: {
    rules: [{
      test: /\.jsx?$/,
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
    extensions: ['.js'],
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'app/main/css/themes/*',
        to: './main/css/themes/[name][ext]'
      }]
    })
  ],
  externals: Object.keys(externals || {})
}
