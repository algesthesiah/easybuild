import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const config = [
  {
    input: './index.ts',
    output: [
      {
        file: 'lib/index.js',
        format: 'umd',
      },
      {
        file: 'es/index.js',
        format: 'esm',
      },
    ],
    external: [id => id.includes('@babel/runtime')],
    plugins: [
      preserveShebangs(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelHelpers: 'runtime',
        exclude: /^(.+\/)?node_modules\/.+$/,
        plugins: ['@babel/plugin-transform-runtime'],
        presets: [
          [
            '@babel/env',
            {
              useBuiltIns: 'usage',
              corejs: { version: 2 },
            },
          ],
        ],
      }),
      terser(),
    ],
  },
]

export default config
