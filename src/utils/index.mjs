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


const createColourLookup = function(colorReference, defaultFunc) {
  if (!Array.isArray(colorReference)) {
    throw new Error('colorReference must be an array');
  }
  if (typeof defaultFunc !== 'function') {
    throw new Error('defaultFunc must be a function');
  }

  const lookup = { both: {}, name: {}, group: {} };

  colorReference.forEach(function(obj) {
    const { group, name, color } = obj;
    if (!color) { return; }

    if (name) {
      if (group) {
        if (!obj.both[name]) { obj.both[name]; }
        lookup.both[name][group] = color;
      }
      else { lookup.name[name] = color; }
    }
    else if (group) { lookup.group[group] = color; }
  });

  return function(data) {
    const { group, name } = data;
    if (lookup.both[name] && lookup.both[name][group]) { return lookup.both[name][group]; }
    else if (lookup.name[name]) { return lookup.name[name]; }
    else if (lookup.group[group]) { return lookup.group[group]; }
    else { return defaultFunc(data); }
  };
};


export { _addReadOnlyProp, properlyDefined, createColourLookup };