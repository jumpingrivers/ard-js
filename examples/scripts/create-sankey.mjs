/* globals chartMaker */
import { getData } from './utils.mjs';

const data = await getData('./data/data.json');
console.log(data);
chartMaker.createSankey();