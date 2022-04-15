import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve' // 帮助寻找 node_modules 里的包
import postcss from 'rollup-plugin-postcss'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'

const config = [
  {
    input: './src/index.ts',
    output: [
      {
        file: 'lib/index.js', // 通用模块
        format: 'umd',
        name: 'index.js',
      },
      {
        file: 'es/index.js', // es6 模块
        format: 'esm',
        plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })],
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
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      terser(),
    ],
  },
]

export default config
