const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

const config = {
  ...baseConfig,

  mode: 'development',

  devtool: 'inline-source-map',

  entry: {
    background: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      './app/background/background',
    ],
    main: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      './app/main/main',
    ]
  },

  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:3000/dist/'
  },

  module: {
    ...baseConfig.module,
    rules: [
      ...baseConfig.module.rules,

      {
        test: /global\.css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },

      {
        test: /^((?!global).)*\.css$/,
        use: [
          'style-loader',
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
          'postcss-loader'
        ]
      }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  target: 'electron-renderer'
}

module.exports = config
