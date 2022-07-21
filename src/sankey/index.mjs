import { create } from 'd3-selection';
import { _addReadOnlyProp, properlyDefined } from '../utils/index.mjs';
import { validateData, validateSteps } from './validate.mjs';
import { processData } from './process-data.mjs';
import { drawSankey } from './draw.mjs';


const createSankey = function(initData, initSteps) {
  const instance = {};
  let data, steps;

  if (data) { validateData(data); }
  if (steps) { validateSteps(steps); }

  const addReadOnlyProp = _addReadOnlyProp(instance); 

  // The viz container
  const container = create('div')
    .style('width', '100%');

  addReadOnlyProp('viz', container.node());

  // The dataset
  const getData = () => data;

  const setData = function(d) {
    validateData(d);
    data = d;
    return instance;
  };

  if (properlyDefined(initData)) { setData(initData); }

  addReadOnlyProp('data', data => (data === undefined) ? getData() : setData(data));

  // The Sankey steps
  const getSteps = () => steps;

  const setSteps = function(s) {
    validateSteps(s);
    steps = s;
    return instance;
  };

  if (properlyDefined(initSteps)) { setSteps(initSteps); }

  addReadOnlyProp('steps', steps => (steps === undefined) ? getSteps() : setSteps(steps));

  // The rendering function
  const render = function() {
    if (!data) {
      console.warn('Could not render anything as no data defined');
    }
    else if (!steps) {
      console.warn('Could not render anything as no steps defined');
    }
    else {
      const sankeyData = processData(data, steps);
      drawSankey.call(instance, sankeyData);
    }
    return instance;
  };

  addReadOnlyProp('render', render);

  // Finally return the instance
  return instance;
};


export { createSankey };