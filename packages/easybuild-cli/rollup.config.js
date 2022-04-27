import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import autoExternal from 'rollup-plugin-auto-external'

const config = [
  {
    input: './src/index.ts',
    output: [
      {
        format: 'cjs',
        dir: 'bin',
        preserveModules: true,
      },
    ],
    external: [id => id.includes('@babel/runtime')],
    plugins: [
      preserveShebangs(),
      nodeResolve(),
      commonjs(),
      autoExternal(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
]

export default config
