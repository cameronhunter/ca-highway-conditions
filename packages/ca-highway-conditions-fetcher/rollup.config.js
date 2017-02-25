import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  dest: 'build/index.js',
  format: 'cjs',
  sourceMap: true,
  plugins: [
    babel({
      babelrc: false,
      presets: ['es2015-rollup', 'stage-1']
    })
  ]
}
