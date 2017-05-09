const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

// all dependecies from app/package.json will be included in build/node_modules
const externals = Object.assign(
  require('./app/package.json').dependencies,
  require('./app/package.json').optionalDependencies
);

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: (modulePath) => (
        modulePath.match(/node_modules/) && !modulePath.match(/node_modules\/cerebro-ui/)
      )
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
      loader: 'url-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'app'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./app'),
      path.resolve('./node_modules'),
    ]
  },
  postcss: () => [
    require('autoprefixer'),
    require('postcss-nested'),
  ],
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyWebpackPlugin([
      { from: 'app/main/css/themes/*', to: './main/css/themes/[name].[ext]' }
    ])
  ],
  externals: Object.keys(externals || {})
};
