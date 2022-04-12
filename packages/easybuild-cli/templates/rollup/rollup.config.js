import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve' // 帮助寻找 node_modules 里的包
import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'

const config = [
  {
    input: './index.ts',
    output: [
      {
        file: 'lib/index.js', // 通用模块
        format: 'umd',
      },
      {
        file: 'es/index.js', // es6 模块
        format: 'es',
      },
    ],
    external: [id => id.includes('@babel/runtime')],
    plugins: [
      resolve(),
      commonjs(),
      postcss(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelHelpers: 'runtime',
        exclude: ['node_modules/**'],
        pluginOptions: ['@babel/plugin-transform-runtime'],
        presetsOptions: [
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
