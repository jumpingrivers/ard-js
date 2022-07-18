import { flatGroup } from 'd3-array';


const validateData = function(data) {
  if (!Array.isArray(data)) {
    throw new Error('data must be an array');
  }
};


const validateSteps = function(steps) {
  if (!Array.isArray(steps)) {
    throw new Error('steps must be an array');
  }

  if (steps.length < 2) {
    throw new Error('steps array must have at least two elements');
  }

  const stepTypesGood = steps.every(function(step) {
    if (typeof step === 'string') { return true; }
    if (Array.isArray(step) && step.every(s => typeof s === 'string')) {
      return true;
    }
    return false;
  });

  if (!stepTypesGood) {
    throw new Error('steps elements must be strings or arrays of strings');
  }

  const flatSteps = steps.flat();
  if ((new Set(flatSteps).size < flatSteps.length)) {
    throw new Error('steps cannot contain a repeated value');
  }
};


const separator = ':---:';


const constructFilterFunction = function(filters) {
  if (!filters.length) { return () => true; }
  return function(d) {
    return filters.every(({key, value}) => d[key] === value);
  };
};


const createObjectifySankeyNodeFunction = function(group) {
  return function([name, entries]) {
    return {
      name: `${name}`,
      id: `${group}${separator}${name}`,
      entries,
      fixedValue: entries.length,
      group
    };
  };
};


const createObjectifySankeyLinkFunction = function(sourceGroup, targetGroup) {
  return function([sourceName, targetName, entries]) {
    return {
      sourceName: `${sourceName}`,
      targetName: `${targetName}`,
      source: `${sourceGroup}${separator}${sourceName}`,
      target: `${targetGroup}${separator}${targetName}`,
      entries,
      value: entries.length
    };
  };
};


const processData = function(inputData, inputSteps, filters = []) {
  const steps = inputSteps.map(function(d) {
    return Array.isArray(d) ? d.slice() : [d];
  });

  const filterFunction = constructFilterFunction(filters);
  const filterKeySet = new Set(filters.map(d => d.key));

  const data = inputData.filter(filterFunction);

  const sankeyNodeGroups = steps.map(function(step) {
    const key = step.find(k => !filterKeySet.has(k)) || step[step.length - 1];
    const objectifySankeyNode = createObjectifySankeyNodeFunction(key);
    return {
      group: key,
      sankeyNodes: flatGroup(data, d => d[key]).map(objectifySankeyNode)
    };
  });

  const sankeyNodes = sankeyNodeGroups.map(d => d.sankeyNodes).flat();

  const sankeyStepPairs = [];
  for (let i = 0; i < sankeyNodeGroups.length - 1; i++) {
    sankeyStepPairs.push({source: sankeyNodeGroups[i].group, target: sankeyNodeGroups[i+1].group});
  }

  const sankeyLinks = sankeyStepPairs.map(function({source, target}) {
    const objectifySankeyLink = createObjectifySankeyLinkFunction(source, target);
    return flatGroup(data, d => d[source], d => d[target])
      .map(objectifySankeyLink);
  })
    .flat();

  return({ data, sankeyNodes, sankeyLinks });
};


const createSankey = function(data, steps) {
  validateData(data);
  validateSteps(steps);
  const sankeyData = processData(data, steps);
  console.log(sankeyData);
};


export { createSankey };