import { validateData, validateSteps } from './validate.mjs';
import { processData } from './process-data.mjs';


const createSankey = function(data, steps) {
  validateData(data);
  validateSteps(steps);
  const sankeyData = processData(data, steps);
  console.log(sankeyData);
};


export { createSankey };