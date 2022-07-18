/* globals chartMaker */
import { getData } from './utils.mjs';

const data = await getData('./data/data.json');

const sankeySteps = [
  ['student_type', 'ipeds_race_ethn'],
  ['college', 'gpa'],
  ['club'],
  ['outcome']
];

chartMaker.createSankey(data, sankeySteps);