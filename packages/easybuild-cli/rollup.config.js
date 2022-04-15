import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs'
import { terser } from 'rollup-plugin-terser'

const config = [
  {
    input: './src/index.ts',
    output: [
      {
        file: 'bin/index.js',
        format: 'cjs',
      },
    ],
    external: [id => id.includes('@babel/runtime')],
    plugins: [preserveShebangs(), commonjs(), typescript({ tsconfig: './tsconfig.json' }), terser()],
  },
]

export default config
