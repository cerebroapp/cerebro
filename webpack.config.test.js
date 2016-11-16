const config = require('./webpack.config.base');

config.target = 'electron-renderer'

config.module = Object.assign(config.module,{
  loaders: Array.prototype.concat.call(config.module.loaders, [
    {
      test: /\.global\.css$/,
      loaders: [
        'style-loader',
        'css-loader?sourceMap'
      ]
    },

    {
      test: /^((?!\.global).)*\.css$/,
      loaders: [
        'style-loader',
        'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      ]
    }
  ])
});

module.exports = config
