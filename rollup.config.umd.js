import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/e7ipc-mock.ts',
  output: {
    file: './umd/e7ipc-mock.js',
    format: 'umd',
    name: 'window',
    extend: true,
    sourcemap: true,
    sourcemapExcludeSources: true,
  },

  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          module: 'es2015',
          sourceMap: true,
          declaration: false,
        },
      },
    }),
    terser(),
  ],
}
