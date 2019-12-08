import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  {
    input: 'js/index.js',
    external: ['react', 'react-dom', 'draft-js'],
    output: [{ file: pkg.main, format: 'umd', name: 'draftjsToHtml' }],
    plugins: [babel()],
  },
];
