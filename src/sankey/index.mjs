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

  const addReadOnlyProp = _addReadOnlyProp(instance); 

  // The viz container
  const container = create('div')
    .style('width', '100%')
    .style('position', 'relative');

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