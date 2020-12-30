const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理dist的工具
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css的工具

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: 'ccf-tools-[local]', // 模块内部css重新命名
              }, // 模块化
            },
          },
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
            plugins: [['import', { libraryName: 'antd', style: 'css' }]],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
  externals: {
    antd: 'antd',
    react: 'react',
    reactDom: 'react-dom',
  },
  resolve: {
    // 解析
    alias: {
      // 别名
      '@src': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx'],
    mainFiles: ['index'],
  },
};
