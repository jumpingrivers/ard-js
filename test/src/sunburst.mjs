/* global utviz, datasets, describe, it, beforeEach, chai, sinon */
const { expect } = chai;
const { createSunburst } = utviz;
const { data } = datasets;

const steps = datasets.steps.flat();

const isObject = function(entity) {
  return entity instanceof Object && !Array.isArray(entity);
};


let blankSunburst, sunburst;


beforeEach(function() {
  blankSunburst = createSunburst();
  sunburst = createSunburst(data, steps);
});


describe('createSunburst', function() {
  it('should throw if data argument is not an array, undefined or null', function() {
    expect(() => createSunburst(7)).to.throw();
    expect(() => createSunburst({})).to.throw();
    expect(() => createSunburst('[]')).to.throw();
  });

  it('should throw if steps argument is defined but not an array or null', function() {
    expect(() => createSunburst(null, 7)).to.throw();
    expect(() => createSunburst(null, {})).to.throw();
    expect(() => createSunburst(null, '[]')).to.throw();
  });

  it('should throw if steps array has no elements', function() {
    expect(() => createSunburst(null, [])).to.throw();
  });

  it('should throw if steps elements are not all strings', function() {
    expect(() => createSunburst(null, [[]])).to.throw();
    expect(() => createSunburst(null, ['Hi', {}])).to.throw();
  });

  it('should throw if steps argument contains repeated strings', function() {
    expect(() => createSunburst(null, ['a', 'b', 'b'])).to.throw();
  });

  it('should return an object if initialised properly', function() {
    expect(isObject(createSunburst(data, steps))).to.equal(true);
  });
});


describe('sunburst.data', function() {
  it('should throw if argument is not an array or undefined', function() {
    expect(() => blankSunburst.data(null)).to.throw();
    expect(() => blankSunburst.data(7)).to.throw();
    expect(() => blankSunburst.data({})).to.throw();
    expect(() => blankSunburst.data('[]')).to.throw();
    expect(() => sunburst.data(null)).to.throw();
    expect(() => sunburst.data(7)).to.throw();
    expect(() => sunburst.data({})).to.throw();
    expect(() => sunburst.data('[]')).to.throw();
  });

  it('should return the instance if appropriate array passed in', function() {
    expect(blankSunburst.data(data)).to.equal(blankSunburst);
  });

  it('should return the stored data if no argument passed in', function() {
    expect(blankSunburst.data()).to.equal(undefined);
    expect(sunburst.data()).to.equal(data);
  });
});


describe('sunburst.steps', function() {
  it('should throw if argument is not an array or undefined', function() {
    expect(() => blankSunburst.steps(null)).to.throw();
    expect(() => blankSunburst.steps(7)).to.throw();
    expect(() => blankSunburst.steps({})).to.throw();
    expect(() => blankSunburst.steps('[]')).to.throw();
    expect(() => sunburst.steps(null)).to.throw();
    expect(() => sunburst.steps(7)).to.throw();
    expect(() => sunburst.steps({})).to.throw();
    expect(() => sunburst.steps('[]')).to.throw();
  });

  it('should return the instance if appropriate array passed in', function() {
    expect(blankSunburst.steps(steps)).to.equal(blankSunburst);
  });

  it('should return the stored steps if no argument passed in', function() {
    expect(blankSunburst.steps()).to.equal(undefined);
    expect(sunburst.steps()).to.equal(steps);
  });
});


describe('sunburst.render', function() {
  it('should warn if data or steps have not been defined', function() {
    const stub = sinon.stub(console, 'warn');
    blankSunburst.render();
    createSunburst(data).render();
    blankSunburst.steps(steps).render();
    expect(stub).to.have.callCount(3);
    stub.restore();
  });

  it('should return the instance after being called', function() {
    expect(blankSunburst.render()).to.equal(blankSunburst);
    expect(sunburst.render()).to.equal(sunburst);
  });

  it('should not throw if called a second time', function() {
    expect(() => sunburst.render().render()).to.not.throw(sunburst);
  });
});


describe('sunburst.viz', function() {
  it('should always hold a div', function() {
    expect(sunburst.viz.tagName.toLowerCase()).to.equal('div');
    expect(sunburst.render().viz.tagName.toLowerCase()).to.equal('div');
  });
  
  it('should hold a div containing an SVG in its shadow dom if rendering has taken place', function() {
    const shadow = sunburst.render().viz.shadowRoot;
    expect(shadow.querySelector('#graphic') instanceof Element).to.equal(true);
  });
});


describe('sunburst.altClickHandler', function() {
  it('should throw if passed an argument other than a function, null or undefined', function() {
    expect(() => sunburst.altClickHandler({})).to.throw();
    expect(() => sunburst.altClickHandler([])).to.throw();
    expect(() => sunburst.altClickHandler(7)).to.throw();
    expect(() => sunburst.altClickHandler('function')).to.throw(); 
  });

  it('should default to null', function() {
    expect(sunburst.altClickHandler()).to.equal(null);
  });

  it('should return the instance if passed null', function() {
    expect(sunburst.altClickHandler(null)).to.equal(sunburst);
  });

  it('should return the instance if passed a function', function() {
    const func = function() {};
    expect(sunburst.altClickHandler(func)).to.equal(sunburst);
  });

  it('should return the current stored value if passed no arguments', function() {
    const func = function() {};
    expect(sunburst.altClickHandler((func)).altClickHandler()).to.equal(func);
  });
});


describe('sunburst.palette', function() {
  it('should throw if passed an argument other than an array or undefined', function() {
    expect(() => sunburst.palette({})).to.throw();
    expect(() => sunburst.palette(7)).to.throw();
    expect(() => sunburst.palette(null)).to.throw(); 
  });

  it('should throw if passed an array with no elements', function() {
    expect(() => sunburst.palette([])).to.throw();
  });

  it('should throw if passed an array with non-string elements', function() {
    expect(() => sunburst.palette(['blue', 7])).to.throw();
  });

  it('should default to an array', function() {
    expect(Array.isArray(sunburst.palette())).to.equal(true);
    expect(sunburst.palette().length > 1).to.equal(true);
  });

  it('should return the current stored value if passed no arguments', function() {
    const arr = ['blue', 'pink'];
    expect(sunburst.palette(arr).palette()).to.equal(arr);
  });

  it('should not throw if passed an array with only one appropriate element', function() {
    expect(() => sunburst.palette(['blue'])).to.not.throw();
  });
});


describe('sunburst.colorOverrides', function() {
  it('should throw if passed an argument other than an array or undefined', function() {
    expect(() => sunburst.colorOverrides({})).to.throw();
    expect(() => sunburst.colorOverrides(7)).to.throw();
    expect(() => sunburst.colorOverrides(null)).to.throw(); 
  });

  it('should throw if passed an array with non-object elements', function() {
    expect(() => sunburst.colorOverrides([{}, 7])).to.throw();
  });

  it('should default to an empty array', function() {
    expect(Array.isArray(sunburst.colorOverrides())).to.equal(true);
    expect(sunburst.colorOverrides().length === 0).to.equal(true);
  });

  it('should return the current stored value if passed no arguments', function() {
    const arr = [{name: 'a', color: 'blue'}];
    expect(sunburst.colorOverrides(arr).colorOverrides()).to.equal(arr);
  });
});