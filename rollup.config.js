import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import glslify from 'rollup-plugin-glslify';
import serve from 'rollup-plugin-serve';

const path = require('path');

const { NODE_ENV } = process.env;

export default [
  {
    input: './src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].cjs.js',
      },
      {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].esm.js',
      },
    ],
    plugins: [
      resolve(),
      glslify({
        include: [/\.glsl$/],
      }),
      commonjs(),
      typescript({ tsconfig: path.resolve(__dirname, 'tsconfig.json') }),
      NODE_ENV === 'development'
        ? serve({
            open: true,
            contentBase: ['public', 'dist'],
            port: 9999,
          })
        : null,
    ],
  },
];
