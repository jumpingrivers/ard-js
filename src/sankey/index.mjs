const createSankey = function(data, steps) {
  if (!Array.isArray(data)) {
    throw new Error('data must be an array');
  }

  if (!Array.isArray(steps)) {
    throw new Error('steps must be an array');
  }
};


export { createSankey };