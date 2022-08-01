const validateData = function(data) {
  if (!Array.isArray(data)) {
    throw new Error('data must be an array');
  }
};


const validateSteps = function(steps) {
  if (!Array.isArray(steps)) {
    throw new Error('steps must be an array');
  }

  if (steps.length < 1) {
    throw new Error('steps array must have at least one element');
  }

  const stepTypesGood = steps.every(function(step) {
    return typeof step === 'string';
  });

  if (!stepTypesGood) {
    throw new Error('steps elements must be strings');
  }

  if ((new Set(steps).size < steps.length)) {
    throw new Error('steps cannot contain a repeated value');
  }
};


export { validateData, validateSteps };
