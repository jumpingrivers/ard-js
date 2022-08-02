import { rollups } from 'd3-array';


const objectifyArray = function(arr) {
  const [name, value] = arr;
  const obj = { name };
  if (Array.isArray(value)) {
    obj.children = value.map(objectifyArray);
  }
  else {
    obj.value = value;
  }
  return obj;
};


const processData = function(inputData, steps) {
  const funcs = steps.map(step => (d => d[step]));
  const rolledData = rollups(inputData, d => d.length, ...funcs);
  return objectifyArray(['root', rolledData]);
};


export { processData };