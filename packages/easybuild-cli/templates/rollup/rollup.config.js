import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import autoExternal from 'rollup-plugin-auto-external'

const config = [
  {
    input: './src/index.ts',
    output: [
      {
        format: 'cjs',
        dir: 'lib',
      },
      {
        format: 'es',
        plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })],
        dir: 'es',
      },
    ],
    external: [id => id.includes('@babel/runtime')],
    plugins: [
      nodeResolve(),
      commonjs(),
      autoExternal(),
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
