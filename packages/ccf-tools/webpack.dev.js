const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true, // 热替换
  },
  optimization: {
    moduleIds: 'deterministic', // 算法id deterministic 选项有益于长期缓存
  },
  watch: true,
});
