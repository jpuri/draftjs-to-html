const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './js/index',
  ],
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'index.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json'],
  },
};
