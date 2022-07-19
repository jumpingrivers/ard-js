import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

const distOutput = {
  file: 'dist/sankey-sunburst.js',
  format: 'umd',
  name: 'chartMaker',
  sourcemap: true
};

const distCopy =  {
  input: 'src/index.mjs',
  output: distOutput,
  plugins: [nodeResolve()]
};

const examplesCopy = {
  input: 'src/index.mjs',
  output: Object.assign({}, distOutput, { file: 'examples/scripts/sankey-sunburst.js' }),
  plugins: [nodeResolve()]
};

const examplesScript = {
  input: 'examples/scripts/create-sankey.mjs',
  output: {
    file: 'examples/scripts/create-sankey.js',
    format: 'umd',
    sourcemap: true
  },
  plugins: [nodeResolve(), json()]
};

const testData = {
  input: 'examples/data/datasets.mjs',
  output: {
    file: 'test/datasets.js',
    format: 'umd',
    name: 'datasets',
    sourcemap: true,
  },
  plugins: [nodeResolve(), json()]
};

const testScript = {
  input: 'test/src/index.mjs',
  output: {
    file: 'test/tests.js',
    format: 'umd',
    sourcemap: true
  },
  plugins: [nodeResolve()]
};


export default [
  distCopy,
  examplesCopy,
  examplesScript,
  testData,
  testScript 
];