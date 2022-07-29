import { flatGroup } from 'd3-array';

const separator = ':---:';


const constructFilterFunction = function(filters) {
  if (!filters.length) { return () => true; }
  return function(d) {
    return filters.every(({group, name}) => `${d[group]}` === name);
  };
};


const createObjectifySankeyNodeFunction = function(group, stepNumber) {
  return function([name, entries]) {
    return {
      name: `${name}`,
      id: `${group}${separator}${name}`,
      entries,
      fixedValue: entries.length,
      group,
      stepNumber
    };
  };
};


const createObjectifySankeyLinkFunction = function(sourceGroup, targetGroup) {
  return function([sourceName, targetName, entries]) {
    const source = `${sourceGroup}${separator}${sourceName}`;
    const target = `${targetGroup}${separator}${targetName}`;
    return {
      sourceName: `${sourceName}`,
      targetName: `${targetName}`,
      source,
      target,
      sourceId: source,
      targetId: target,
      id: `${source}${separator}${target}`,
      entries,
      value: entries.length
    };
  };
};


const processData = function(inputData, inputSteps, inputFilters = []) {
  const steps = inputSteps.map(function(d) {
    return Array.isArray(d) ? d.slice() : [d];
  });

  const filters = inputFilters.slice();

  const filterFunction = constructFilterFunction(filters);
  const filterGroupSet = new Set(filters.map(d => d.group));

  const data = inputData.filter(filterFunction);

  const currentStepNames = steps.map(function(step) {
    return step.find(k => !filterGroupSet.has(k)) || step[step.length - 1];
  });

  const sankeyNodeGroups = currentStepNames.map(function(stepName, stepNumber) {
    const objectifySankeyNode = createObjectifySankeyNodeFunction(stepName, stepNumber);
    return {
      group: stepName,
      sankeyNodes: flatGroup(data, d => d[stepName]).map(objectifySankeyNode)
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

  const lookup = {};

  sankeyNodes.forEach(d => lookup[d.id] = d);
  sankeyLinks.forEach(d => lookup[d.id] = d);

  return({ data, steps, sankeyNodes, sankeyLinks, currentStepNames, filters, lookup });
};


export { processData };