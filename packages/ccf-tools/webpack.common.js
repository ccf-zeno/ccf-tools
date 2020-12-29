const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理dist的工具
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css的工具
const nodeExternals = require('webpack-node-externals'); // 把依赖全部都排除不打包的工具

// cssloader配置
const cssLoaderConfig = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: 'ccf-tools-[path][name][local]-[hash:base64:4]', // 模块内部css重新命名
    }, // 模块化
  },
};

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name]-[chunkhash].js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, cssLoaderConfig],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoaderConfig,
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }], // 对浏览器环境进行语法转义,兼容低版本浏览器
              ['@babel/preset-react'], // 对react语法进行转义
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  externals: [nodeExternals()],
  resolve: {
    // 解析
    alias: {
      // 别名
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'librarys',
          chunks: 'all', // 把第三方库拆离出去
        },
      },
    },
    runtimeChunk: 'single',
  },
};
