const { merge } = require('webpack-merge');
const webpack = require('webpack');
const deps = require('../package.json').dependencies;
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: 'http://localhost:3000/',
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: 'only',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    client: {
      logging: 'warn',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify('development'),
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
