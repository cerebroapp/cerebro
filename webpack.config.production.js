const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const OptimizeJsPlugin = require('optimize-js-plugin')
const Visualizer = require('webpack-visualizer-plugin')

const config = {
  ...baseConfig,

  devtool: 'source-map',

  entry: {
    main: './app/main/main',
    background: './app/background/background'
  },

  output: {
    ...baseConfig.output,
    path: path.join(__dirname, 'app/dist'),
    publicPath: '../dist/'
  },

  module: {
    ...baseConfig.module,

    rules: [
      ...baseConfig.module.rules,

      {
        test: /global\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },

      {
        test: /^((?!global).)*\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
      ignoreOrder: true
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    })
  ],

  target: 'electron-renderer'
}

if (process.env.ANALYZE) {
  config.plugins.push(new Visualizer())
}

module.exports = config
