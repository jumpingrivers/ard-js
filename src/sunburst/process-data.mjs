import { rollups } from 'd3-array';


const processData = function(inputData, steps) {
  const funcs = steps.map(step => (d => d[step]));
  const rolledData = rollups(inputData, d => d.length, ...funcs);

  let counter = 0;

  const objectifyArray = function(arr) {
    const [name, value] = arr;
    const obj = { name, id: counter++ };
    if (Array.isArray(value)) {
      obj.children = value.map(objectifyArray);
    }
    else {
      obj.value = value;
    }
    return obj;
  };

  return objectifyArray(['root', rolledData]);
};


export { processData };