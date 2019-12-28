import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/e7ipc-mock.ts',
  output: {
    file: './lib/e7ipc-mock.js',
    format: 'cjs',
    sourcemap: true,
    sourcemapExcludeSources: true,
  },
  external: [],

  plugins: [
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
  ],
}
