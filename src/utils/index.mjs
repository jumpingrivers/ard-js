const _addReadOnlyProp = function(obj) {
  return function(name, value) {
    Object.defineProperty(obj, name, {
      get: () => value,
      enumerable: true
    });
  };
};


const properlyDefined = function(value) {
  return value !== undefined && value !== null;
};


export { _addReadOnlyProp, properlyDefined };