import { validateData, validateSteps } from './validate.mjs';
import { processData } from './process-data.mjs';
import { drawSankey } from './draw.mjs';


const createSankey = function(data, steps) {
  validateData(data);
  validateSteps(steps);
  const sankeyData = processData(data, steps);
  const viz = drawSankey(sankeyData);

  return {
    viz: viz.node()
  };
};


export { createSankey };