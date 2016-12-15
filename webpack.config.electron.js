import webpack from 'webpack';
import baseConfig from './webpack.config.base';


const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  })
];

const externals = [
  ...baseConfig.externals,
];

if (!isProduction) {
  plugins.push(
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    )
  );

  externals.push('source-map-support');
}

export default {
  ...baseConfig,

  plugins,
  externals,

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
};
