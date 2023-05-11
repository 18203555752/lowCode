import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: {
    dir: './dist',
    entryFileNames: 'index.js',
    format: 'esm'
  },
  plugins: [
    nodeResolve({ // 使用import语法导入Node.js模块
      extensions: ['.js', '.ts',],
      preferBuiltins:false,


    }),
    commonjs(),
    json(),
    typescript({ // 可以不使用
      include: /\.ts$/,
      exclude: /node_modules/,
      experimentalDecorators: true,
   
    }),
  ]
}