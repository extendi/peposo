// cf. https://webpack.js.org/configuration/

const path = require('path');

module.exports = {
  context: path.join(__dirname, '/src'),
  mode: 'development',
  entry: {
    peposo: 'src/index.js',
  },
  plugins: [],
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
  },
  optimization: {
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
};
