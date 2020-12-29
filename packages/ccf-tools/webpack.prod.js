const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // css压缩

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    usedExports: true, // 开启treeShaking,
    minimizer: [new CssMinimizerPlugin()],
  },
});
