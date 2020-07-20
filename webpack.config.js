const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: "./app.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  watch: true,
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
    compress: true,
    port: 80,
    host: "10.2.1.200"
  },
  plugins: [
    new webpack.EvalSourceMapDevToolPlugin({})
  ],
};