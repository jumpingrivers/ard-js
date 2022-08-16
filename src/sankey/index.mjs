import { create, select } from 'd3-selection';
import { _addReadOnlyProp, properlyDefined } from '../utils/index.mjs';
import { validateData, validateSteps } from './validate.mjs';
import { processData } from './process-data.mjs';
import { drawSankey } from './draw.mjs';


const createSankey = function(initData, initSteps) {
  const instance = {};
  let data, steps;
  let aspect = 1.5;
  let nodePopupTemplate = null;
  let linkPopupTemplate = null;
  let altClickHandler = null;
  let color = '#add8e6';
  let hoverColor = '#ff0000';
  let colorOverrides = [];

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

  // The aspect ratio
  const getAspect = () => aspect;

  const setAspect = function(a) {
    if (!Number.isFinite(a) || a <= 0) {
      throw new Error('aspect must be a number greater than 0');
    }
    aspect = a;
    return instance;
  };

  addReadOnlyProp('aspect', aspect => (aspect === undefined) ? getAspect() : setAspect(aspect));

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

  // The node popup template
  const getNodePopupTemplate = () => nodePopupTemplate;

  const setNodePopupTemplate = function(t) {
    if (t !== null && typeof t !== 'string') {
      throw new Error('nodePopupTemplate must be a string or null');
    }
    nodePopupTemplate = t;
    return instance;
  };

  addReadOnlyProp('nodePopupTemplate', function(nodePopupTemplate) {
    if (nodePopupTemplate === undefined) { return getNodePopupTemplate(); }
    return setNodePopupTemplate(nodePopupTemplate);
  });

  // The link popup template
  const getLinkPopupTemplate = () => linkPopupTemplate;

  const setLinkPopupTemplate = function(t) {
    if (t !== null && typeof t !== 'string') {
      throw new Error('linkPopupTemplate must be a string or null');
    }
    linkPopupTemplate = t;
    return instance;
  };

  addReadOnlyProp('linkPopupTemplate', function(linkPopupTemplate) {
    if (linkPopupTemplate === undefined) { return getLinkPopupTemplate(); }
    return setLinkPopupTemplate(linkPopupTemplate);
  });

  // The default node color
  const getColor = () => color;

  const setColor = function(c) {
    if (typeof c !== 'string') {
      throw new Error('color must be a string');
    }
    color = c;
    return instance;
  };

  addReadOnlyProp('color', function(color) {
    if (color === undefined) { return getColor(); }
    return setColor(color);
  });

  // The node color on hover
  const getHoverColor = () => hoverColor;

  const setHoverColor = function(h) {
    if (typeof h !== 'string') {
      throw new Error('hoverColor must be a string');
    }
    hoverColor = h;
    return instance;
  };

  addReadOnlyProp('hoverColor', function(hoverColor) {
    if (hoverColor === undefined) { return getHoverColor(); }
    return setHoverColor(hoverColor);
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