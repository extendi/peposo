// cf. https://webpack.js.org/configuration/

const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const prodConfig = require('./webpack.config.production');

const libraryName = 'peposo';

const common = {
  entry: path.join(__dirname, 'src/index.ts'),
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })]
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ],
  },
};

const developmentConfig = [{
  ...common,
  output: {
    path: path.join(__dirname, './dist'),
    filename: `${libraryName}.js`,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },
}];

module.exports = (env) => {
  if (env && env.production) {
    return [
      {
        ...developmentConfig[0],
        ...prodConfig,
      },
    ];
  }
  return developmentConfig;
};
