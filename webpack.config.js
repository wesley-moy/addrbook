'use strict';

const path = require('path');
const webpack = require('webpack');

const nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    root: [nodeModulesPath],
    extensions: ['', '.js', '.jsx', 'less']
  },
  resolveLoader: {
    root: nodeModulesPath
  },
  module: {
    loaders: [{
      test: /\.js?$|\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};