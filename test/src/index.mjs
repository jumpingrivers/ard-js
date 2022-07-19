/* global chartMaker, datasets, chai, describe, it */
const { expect } = chai;
const { createSankey } = chartMaker;
const { data, steps } = datasets;

const isObject = function(entity) {
  return entity instanceof Object && !Array.isArray(entity);
};

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