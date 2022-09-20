const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const commonConfig = require('./webpack.common');

console.log(process.env);

const prodConfig = {
  mode: 'production',
  output: {
    filename: `[name].[contenthash]-${Date.now()}.bundle.js`,
    chunkFilename: `[id]-${Date.now()}.chunk.js`,
    publicPath: 'auto',
    path: path.resolve(__dirname, '../dist'),
    uniqueName: 'app',
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['*.LICENSE.*'],
    }),
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);