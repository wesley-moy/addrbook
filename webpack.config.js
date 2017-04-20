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
  resolve: {
    root: [nodeModulesPath],
    extensions: ['', '.js', '.jsx', 'less','.css']
  },
  resolveLoader: {
    root: nodeModulesPath
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    },
  ]
  }
};
