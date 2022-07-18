import { nodeResolve } from '@rollup/plugin-node-resolve';


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


export default [
  distCopy,
  examplesCopy,
  {
    input: 'test/src/index.mjs',
    output: {
      file: 'test/tests.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: [nodeResolve()]
  },  
];