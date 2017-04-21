import express from 'express';
import graphQLHTTP from 'express-graphql';
import mongoose from 'mongoose';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Schema } from './data/schema';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;
const MONGODB = process.env.MONGO || "mongodb://localhost:27017/address-book";

// Expose a GraphQL endpoint
express()
  .use('/', graphQLHTTP({
    schema: Schema,
    pretty: true
  }))
  .listen(GRAPHQL_PORT, () => { console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}` );
  });

// Connect to MongoDB
mongoose.connect(MONGODB, () => {
  console.log(`MongoDB conencted at ${MONGODB}`);
});

// Serve the Relay app
const compiler = webpack({
  entry: path.resolve(__dirname, 'src', 'index.js'),
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader?sourceMap'],
    },
  ]
  },
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
});
const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/src/',
  stats: {colors: true},
});

// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
