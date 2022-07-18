/* global chartMaker chai, describe, it */
const { expect } = chai;
const { createSankey } = chartMaker;

describe('createSankey', function() {
  it('should throw if data argument is not an array', function() {
    expect(() => createSankey()).to.throw();
    expect(() => createSankey(7)).to.throw();
    expect(() => createSankey({})).to.throw();
    expect(() => createSankey('[]')).to.throw();
  });

  it('should throw if steps argument is not an array', function() {
    expect(() => createSankey([])).to.throw();
    expect(() => createSankey([], 7)).to.throw();
    expect(() => createSankey([], {})).to.throw();
    expect(() => createSankey([], '[]')).to.throw();
  });

  it('should throw if steps array has fewer than two elements', function() {
    expect(() => createSankey([], [])).to.throw();
    expect(() => createSankey([], ['a'])).to.throw();
    expect(() => createSankey([], [['a', 'b']])).to.throw();
  });

  it('should throw if steps elements are not strings or arrays of strings', function() {
    expect(() => createSankey([], [[7], [8]])).to.throw();
    expect(() => createSankey([], ['Hi', {}])).to.throw();
  });

  it('should throw if steps argument contains repeated strings', function() {
    expect(() => createSankey([], [['a'], ['b'], ['b']])).to.throw();
    expect(() => createSankey([], [['a'], ['b'], ['c', 'c']])).to.throw();
  });
});