const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/js/app.js",
    another: "./src/js/another.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "js/[name].bundle.js",
    chunkFilename: "js/[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: "initial",
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: "vendor",
        },
        vendorsModules: {
          test: /src[\\/]js[\\/]modules/,
          name: "vendor-modules",
          minSize: 0,
          minChunks: 2,

        }
      }
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      filename: 'another.html',
      template: './src/html/another.html',
      chunks: ['another'],
    }),
  ],
};
