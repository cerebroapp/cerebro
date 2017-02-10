/* eslint max-len: 0 */
import webpack from 'webpack';
import baseConfig from './webpack.config.base';

const config = {
  ...baseConfig,

  debug: true,

  devtool: 'inline-source-map',

  entry: {
    background: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      'fix-path',
      './app/background/background',
    ],
    main: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      'fix-path',
      './app/main/main',
    ]
  },

  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:3000/dist/'
  },

  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders,

      {
        test: /global\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },

      {
        test: /^((?!global).)*\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        ]
      }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  target: 'electron-renderer'
};

export default config;
