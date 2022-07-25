import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { string } from 'rollup-plugin-string';


const onWarn = function(warning, warn) {
  if (warning.code === 'CIRCULAR_DEPENDENCY') return;
  warn(warning);
};

const distOutput = {
  file: 'dist/sankey-sunburst.js',
  format: 'umd',
  name: 'chartMaker',
  sourcemap: true
};

const distPlugins = [
  nodeResolve(),
  commonjs(),
  string({
    include: ['**/*.html', '**/*.css'],
  })
];

const distCopy =  {
  input: 'src/index.mjs',
  output: distOutput,
  plugins: distPlugins,
  onwarn: onWarn
};

const examplesCopy = {
  input: 'src/index.mjs',
  output: Object.assign({}, distOutput, { file: 'examples/scripts/sankey-sunburst.js' }),
  plugins: distPlugins,
  onwarn: onWarn
};

const examplesScript = {
  input: 'examples/scripts/src/index.mjs',
  output: {
    file: 'examples/scripts/create-sankey.js',
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
  distCopy,
  examplesCopy,
  examplesScript,
  testData,
  testScript 
];