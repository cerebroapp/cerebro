const path = require('path');

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
      loader: 'url-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('.'),
      path.resolve('./node_modules'),
    ]
  },
  postcss: () => [
    require('autoprefixer'),
    require('postcss-nested'),
  ],
  plugins: [

  ],
  externals: ['nodobjc', 'universal-analytics']
};
