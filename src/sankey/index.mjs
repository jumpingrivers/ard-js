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


const createSankey = function(data, steps) {
  validateData(data);
  validateSteps(steps);
};


export { createSankey };