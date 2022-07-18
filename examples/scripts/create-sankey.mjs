/* globals chartMaker */
import { getData } from './utils.mjs';

const data = await getData('./data/data.json');

chartMaker.createSankey(data, [1, 2, 3, 4]);