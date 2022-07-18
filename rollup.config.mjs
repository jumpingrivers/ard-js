import { nodeResolve } from '@rollup/plugin-node-resolve';


export default {
  input: 'src/index.mjs',
  output: {
    file: 'dist/sankey-sunburst.js',
    format: 'umd',
    name: 'chartMaker'
  },
  plugins: [nodeResolve()]
};