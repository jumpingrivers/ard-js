import { create, select } from 'd3-selection';
import { schemeTableau10 } from 'd3-scale-chromatic';
import { _addReadOnlyProp, properlyDefined } from '../utils/index.mjs';
import { validateData, validateSteps } from './validate.mjs';
import { processData } from './process-data.mjs';
import { drawSunburst } from './draw.mjs';


const createSunburst = function(initData, initSteps) {
  const instance = {};
  let data, steps;
  let altClickHandler = null;
  let colorOverrides = [];
  let palette = schemeTableau10;

  const addReadOnlyProp = _addReadOnlyProp(instance); 

  // The viz container
  const container = create('div')
    .style('width', '100%')
    .style('position', 'relative');

  container.append('link')
    .attr('href', 'https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;700&display=swap')
    .attr('rel', 'stylesheet');

  select(container.node().attachShadow({mode: 'open'}));

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

  // The alt+Click handler function
  const getAltClickHandler = () => altClickHandler;

  const setAltClickHandler = function(f) {
    if (typeof f !== 'function' && f !== null) {
      throw new Error('altClickHandler must be a function or null');
    }
    altClickHandler = f;
    return instance;
  };

  addReadOnlyProp('altClickHandler', function(altClickHandler) {
    if (altClickHandler === undefined) { return getAltClickHandler(); }
    return setAltClickHandler(altClickHandler);
  });

  // The palette function
  const getPalette = () => palette;

  const setPalette = function(a) {
    if (!Array.isArray(a)) {
      throw new Error('palette must be an array');
    }
    if (a.length < 1) {
      throw new Error('palette must be an array with at least one element');
    }
    if(!a.every(d => typeof d === 'string')) {
      throw new Error('palette colors must be strings');
    }
    palette = a;
    return instance;
  };

  addReadOnlyProp('palette', function(palette) {
    if (palette === undefined) { return getPalette(); }
    return setPalette(palette);
  });

  // The color-overrides function
  const getColorOverrides = () => colorOverrides;

  const setColorOverrides = function(a) {
    if (!Array.isArray(a)) {
      throw new Error('colorOverrides must be an array');
    }
    if (!a.every(d => typeof d === 'object')) {
      throw new Error('colorOverrides elements must be objects');
    }
    colorOverrides = a;
    return instance;
  };

  addReadOnlyProp('colorOverrides', function(colorOverrides) {
    if (colorOverrides === undefined) { return getColorOverrides(); }
    return setColorOverrides(colorOverrides);
  });

  // The rendering function
  const render = function() {
    if (!data) {
      console.warn('Could not render anything as no data defined');
    }
    else if (!steps) {
      console.warn('Could not render anything as no steps defined');
    }
    else {
      const sunburstData = processData(data, steps);
      drawSunburst.call(instance, sunburstData);
    }
    return instance;
  };

  addReadOnlyProp('render', render);

  // Finally return the instance
  return instance;
};


export { createSunburst };