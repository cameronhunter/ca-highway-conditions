import babel from 'rollup-plugin-babel';
import pegjs from 'rollup-plugin-pegjs';

const optimize = process.env.PEGJS_OPTIMIZE || 'speed';

export default {
  entry: 'src/index.js',
  dest: ['build/index', optimize, 'js'].join('.'),
  format: 'cjs',
  sourceMap: true,
  plugins: [
    pegjs({
      optimize
    }),
    babel({
      babelrc: false,
      presets: ['es2015-rollup']
    })
  ]
}
