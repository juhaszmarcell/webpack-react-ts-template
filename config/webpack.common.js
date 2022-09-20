const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src'),
    resolve: {
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    output: {
      assetModuleFilename: (pathData) => {
        const filePath = path.dirname(pathData.filename).split('/').slice(1).join('/');
        return `${filePath}/[name].[hash][ext][query]`;
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(ts|tsx|js|jsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|json)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebPackPlugin({
        template: './public/index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../src/assets/static'),
            to: 'assets/static/',
          },
        ],
      }),
    ],
  };