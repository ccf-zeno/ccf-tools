import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/index.js',
  output: {
    file: 'build/index.js',
    format: 'esm',
  },
  plugins: [
    babel(),
    commonjs(),
  ],
  external: ['lodash'],
};
