const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const baseConfig = require('./webpack.config.base')

const config = {
  ...baseConfig,

  mode: 'production',

  devtool: 'source-map',

  entry: {
    main: './app/main/main',
    background: './app/background/background'
  },

  output: {
    ...baseConfig.output,
    path: path.join(__dirname, 'app', 'dist'),
    publicPath: '../dist/'
  },

  module: {
    ...baseConfig.module,

    rules: [
      ...baseConfig.module.rules,

      {
        test: /global\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },

      {
        test: /^((?!global).)*\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              import: true,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
                // auto: true,
              },
              esModule: false,
              sourceMap: true,
              importLoaders: 1,
            }
          },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin()
  ],

  target: 'electron-renderer'
}

if (process.env.ANALYZE) {
  config.plugins.push(new Visualizer())
}

module.exports = config
