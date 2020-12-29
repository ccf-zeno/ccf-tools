const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理dist的工具

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  plugins: [new CleanWebpackPlugin()],
  externals: {
    lodash: 'lodash',
  },
};
