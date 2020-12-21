import { defineConfig } from 'umi';
import routes from "./router";
import globalConfig from "./globalConfig";

const path = require('path');
const rootdir = path.join(__dirname, '..');

export default defineConfig({
  nodeModulesTransform: { // node_modules 编译方式
    type: 'none',
  },
  routes,
  hash: true, // 让生成的文件包含 hash 后缀
  define:{
    globalConfig,
  },
  devServer:{ 
    port:12133,
  },
  alias:{
    '@components': path.resolve(rootdir, 'src/components'),
    '@utils': path.resolve(rootdir, 'src/utils'),
    '@assets': path.resolve(rootdir, 'src/assets'),
    '@services': path.resolve(rootdir, 'src/services'),
  },
});
