import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';

const nonNull = (array) => array.filter(x => !!x);

const isProduction = process.env.NODE_ENV === 'production';

const dest = nonNull(['build/index', isProduction && 'min', 'js']).join('.');

export default {
  entry: 'src/index.js',
  dest,
  format: 'cjs',
  sourceMap: !isProduction,
  banner: '#!/usr/bin/env node',
  plugins: nonNull([
    json({
      include: './package.json'
    }),
    babel({
      babelrc: false,
      presets: ['es2015-rollup', 'stage-1']
    }),
    isProduction && uglify()
  ])
}
