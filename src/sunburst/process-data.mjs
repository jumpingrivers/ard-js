import { rollup, rollups } from 'd3-array';


const processData = function(inputData, steps) {
  const funcs = steps.map(step => (d => d[step]));
  const rolledData = rollups(inputData, d => d.length, ...funcs);

  let counter = 0;

  const groupCounts = steps.reduce(function(obj, stepName) {
    obj[stepName] = rollup(inputData, d => d.length, d => d[stepName]);
    return obj;
  }, {});

  const objectifyArray = function(arr, depth) {
    const [name, value] = arr;
  
    const obj = { name, depth, id: counter++ };

    if (depth) {
      obj.group = steps[depth - 1];
    }

    if (Array.isArray(value)) {
      obj.children = value.map(v => objectifyArray(v, depth + 1));
    }
    else {
      obj.value = value;
    }

    return obj;
  };

  const root = objectifyArray(['root', rolledData], 0);
  root.groupCounts = groupCounts;

  return root;
};


export { processData };