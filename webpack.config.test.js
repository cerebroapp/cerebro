const config = require('./webpack.config.base');

config.target = 'electron-renderer'

config.module = Object.assign(config.module,{
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  loaders: Array.prototype.concat.call(config.module.loaders, [
    {
      test: /\.(css|svg|jpe?g|png)$/,
      loader: 'null-loader'
    }
  ])
});

module.exports = config
