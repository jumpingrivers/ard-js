import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { string } from 'rollup-plugin-string';
import { terser } from 'rollup-plugin-terser';


const onWarn = function(warning, warn) {
  if (warning.code === 'CIRCULAR_DEPENDENCY') return;
  warn(warning);
};

const distOutput = {
  file: 'dist/utviz.js',
  format: 'umd',
  name: 'utviz',
  sourcemap: true
};

const dist =  {
  input: 'src/index.mjs',
  output: [
    distOutput,
    Object.assign({}, distOutput, { file: 'examples/scripts/utviz.js' }),
    Object.assign({ plugins:[terser()] }, distOutput, { file: 'dist/utviz.min.js' })
  ],
  plugins: [
    nodeResolve(),
    string({
      include: ['**/*.html', '**/*.css'],
    })
  ],
  external: ['Handlebars'],
  onwarn: onWarn
};

const examplesScript = {
  input: 'examples/scripts/src/index.mjs',
  output: {
    file: 'examples/scripts/create-viz.js',
    format: 'umd',
    sourcemap: true
  },
  plugins: [nodeResolve(), json()],
  onwarn: onWarn
};

const testData = {
  input: 'examples/data/datasets.mjs',
  output: {
    file: 'test/datasets.js',
    format: 'umd',
    name: 'datasets',
    sourcemap: true,
  },
  plugins: [nodeResolve(), json()],
  onwarn: onWarn
};

const testScript = {
  input: 'test/src/index.mjs',
  output: {
    file: 'test/tests.js',
    format: 'umd',
    sourcemap: true
  },
  plugins: [nodeResolve()],
  onwarn: onWarn
};


export default [
  dist,
  examplesScript,
  testData,
  testScript 
];