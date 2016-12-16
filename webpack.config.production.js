import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './webpack.config.base';
import OptimizeJsPlugin from 'optimize-js-plugin';
import Visualizer from 'webpack-visualizer-plugin';

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

    loaders: [
      ...baseConfig.module.loaders,

      {
        test: /global\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader'
        )
      },

      {
        test: /^((?!global).)*\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        )
      }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new OptimizeJsPlugin({
      sourceMap: false
    }),
    new webpack.optimize.DedupePlugin()
  ],

  target: 'electron-renderer'
};

if (process.env.ANALYZE) {
  config.plugins.push(new Visualizer())
}

export default config;
