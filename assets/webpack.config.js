const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const devMode = options.mode !== 'production';
  const publicPath = (process.env.PUBLIC_URL || '') + '/js/';

  return {
    optimization: {
      minimizer: [
        '...',
        new CssMinimizerPlugin()
      ]
    },
    entry: {
      'app': './js/app.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../priv/static/js'),
      publicPath: publicPath
    },
    devtool: devMode ? 'eval-cheap-module-source-map' : false,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.[s]?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  silenceDeprecations: ['legacy-js-api'],
                  quietDeps: true
                }
              }
            },
          ],
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL || '')
      }),
      new MiniCssExtractPlugin({ filename: '../css/app.css' }),
      new CopyWebpackPlugin({ patterns: [{ from: 'static/', to: '../' }] })
    ]
  };
};
