/* global chartMaker, datasets, describe, it, beforeEach, chai, sinon */
const { expect } = chai;
const { createSankey } = chartMaker;
const { data, steps } = datasets;


const isObject = function(entity) {
  return entity instanceof Object && !Array.isArray(entity);
};


let blankSankey, sankey;


beforeEach(function() {
  blankSankey = createSankey();
  sankey = createSankey(data, steps);
});


describe('createSankey', function() {
  it('should throw if data argument is not an array, undefined or null', function() {
    expect(() => createSankey(7)).to.throw();
    expect(() => createSankey({})).to.throw();
    expect(() => createSankey('[]')).to.throw();
  });

  it('should throw if steps argument is defined but not an array, undefined or null', function() {
    expect(() => createSankey(null, 7)).to.throw();
    expect(() => createSankey(null, {})).to.throw();
    expect(() => createSankey(null, '[]')).to.throw();
  });

  it('should throw if steps array has fewer than two elements', function() {
    expect(() => createSankey(null, [])).to.throw();
    expect(() => createSankey(null, ['a'])).to.throw();
    expect(() => createSankey(null, [['a', 'b']])).to.throw();
  });

  it('should throw if steps elements are not strings or arrays of strings', function() {
    expect(() => createSankey(null, [[7], [8]])).to.throw();
    expect(() => createSankey(null, ['Hi', {}])).to.throw();
  });

  it('should throw if steps argument contains repeated strings', function() {
    expect(() => createSankey(null, [['a'], ['b'], ['b']])).to.throw();
    expect(() => createSankey(null, [['a'], ['b'], ['c', 'c']])).to.throw();
  });

  it('should return an object if initialised properly', function() {
    expect(isObject(createSankey(data, steps))).to.equal(true);
  });
});


describe('sankey.data', function() {
  it('should throw if argument is not an array or undefined', function() {
    expect(() => blankSankey.data(null)).to.throw();
    expect(() => blankSankey.data(7)).to.throw();
    expect(() => blankSankey.data({})).to.throw();
    expect(() => blankSankey.data('[]')).to.throw();
    expect(() => sankey.data(null)).to.throw();
    expect(() => sankey.data(7)).to.throw();
    expect(() => sankey.data({})).to.throw();
    expect(() => sankey.data('[]')).to.throw();
  });

  it ('should return the instance if appropriate array passed in', function() {
    expect(blankSankey.data(data)).to.equal(blankSankey);
  });

  it('should return the stored data if no argument passed in', function() {
    expect(blankSankey.data()).to.equal(undefined);
    expect(sankey.data()).to.equal(data);
  });
});


describe('sankey.steps', function() {
  it('should throw if argument is not an array or undefined', function() {
    expect(() => blankSankey.steps(null)).to.throw();
    expect(() => blankSankey.steps(7)).to.throw();
    expect(() => blankSankey.steps({})).to.throw();
    expect(() => blankSankey.steps('[]')).to.throw();
    expect(() => sankey.steps(null)).to.throw();
    expect(() => sankey.steps(7)).to.throw();
    expect(() => sankey.steps({})).to.throw();
    expect(() => sankey.steps('[]')).to.throw();
  });

  it ('should return the instance if appropriate array passed in', function() {
    expect(blankSankey.steps(steps)).to.equal(blankSankey);
  });

  it('should return the stored steps if no argument passed in', function() {
    expect(blankSankey.steps()).to.equal(undefined);
    expect(sankey.steps()).to.equal(steps);
  });
});


describe('sankey.render', function() {
  it ('should warn if data or steps have not been defined', function() {
    const stub = sinon.stub(console, 'warn');
    blankSankey.render();
    createSankey(data).render();
    blankSankey.steps(steps).render();
    expect(stub).to.have.callCount(3);
    stub.restore();
  });

  it ('should return the instance after being called', function() {
    expect(blankSankey.render()).to.equal(blankSankey);
    expect(sankey.render()).to.equal(sankey);
  });
});