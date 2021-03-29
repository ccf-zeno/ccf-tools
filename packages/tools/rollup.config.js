import jsx from 'rollup-plugin-jsx';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import pak from './package.json';

export default {
  input: './src/index.js',
  output: {
    file: 'build/index.js',
    format: 'esm',
  },
  plugins: [
    babel(),
    postcss({
      plugins: [autoprefixer(),cssnano()],
      autoModules:false, // 这里要开启false之后下面的配置才可以生效
      modules:{
        generateScopedName: `${pak.name}__[name]___[hash:base64:5]`,
      }
    }),
    jsx({ factory: 'React.createElement' }),
    commonjs(),
  ],
  external: ['lodash', 'react'],
};
