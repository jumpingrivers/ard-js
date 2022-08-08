/* global utviz, datasets, describe, it, beforeEach, chai, sinon */
const { expect } = chai;
const { createSankey } = utviz;
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

  it('should throw if steps argument is defined but not an array or null', function() {
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

  it('should return the instance if appropriate array passed in', function() {
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

  it('should return the instance if appropriate array passed in', function() {
    expect(blankSankey.steps(steps)).to.equal(blankSankey);
  });

  it('should return the stored steps if no argument passed in', function() {
    expect(blankSankey.steps()).to.equal(undefined);
    expect(sankey.steps()).to.equal(steps);
  });
});


describe('sankey.render', function() {
  it('should warn if data or steps have not been defined', function() {
    const stub = sinon.stub(console, 'warn');
    blankSankey.render();
    createSankey(data).render();
    blankSankey.steps(steps).render();
    expect(stub).to.have.callCount(3);
    stub.restore();
  });

  it('should return the instance after being called', function() {
    expect(blankSankey.render()).to.equal(blankSankey);
    expect(sankey.render()).to.equal(sankey);
  });

  it('should not throw if called a second time', function() {
    expect(() => sankey.render().render()).to.not.throw(sankey);
  });
});


describe('sankey.viz', function() {
  it('should always hold a div', function() {
    expect(sankey.viz.tagName.toLowerCase()).to.equal('div');
    expect(sankey.render().viz.tagName.toLowerCase()).to.equal('div');
  });

  it('should hold an empty div if no rendering has taken place', function() {
    expect(sankey.viz.childNodes.length).to.equal(0);
  });

  it('should hold a div containing an SVG in its shadow dom if rendering has taken place', function() {
    const shadow = sankey.render().viz.shadowRoot;
    expect(shadow.querySelector('#graphic') instanceof Element).to.equal(true);
  });
});


describe('sankey.aspect', function() {
  it('should throw if passed an argument other than a number or undefined', function() {
    expect(() => sankey.aspect(null)).to.throw();
    expect(() => sankey.aspect({})).to.throw();
    expect(() => sankey.aspect([])).to.throw();  
  });

  it('should throw if passed a number less than or equal to 0', function() {
    expect(() => sankey.aspect(0)).to.throw();
    expect(() => sankey.aspect(-1)).to.throw();
  });

  it('should throw if passed a non-finite number', function() {
    expect(() => sankey.aspect(NaN)).to.throw();
    expect(() => sankey.aspect(Infinity)).to.throw();
  });

  it('should return the instance if passed a number bigger than 0', function() {
    expect(sankey.aspect(2)).to.equal(sankey);
  });

  it('should update the stores aspect if passed a number bigger then 0', function() {
    expect(sankey.aspect(2).aspect()).to.equal(2);
  });

  it('should default to 1.25', function() {
    expect(sankey.aspect()).to.equal(1.5);
  });
});


describe('sankey.nodePopupTemplate', function() {
  it('should throw if passed an argument other than a string, null or undefined', function() {
    expect(() => sankey.nodePopupTemplate({})).to.throw();
    expect(() => sankey.nodePopupTemplate([])).to.throw();
    expect(() => sankey.nodePopupTemplate(7)).to.throw(); 
  });

  it('should default to null', function() {
    expect(sankey.nodePopupTemplate()).to.equal(null);
  });

  it('should return the instance if passed null', function() {
    expect(sankey.nodePopupTemplate(null)).to.equal(sankey);
  });

  it('should return the instance if passed a string', function() {
    expect(sankey.nodePopupTemplate('Boo!')).to.equal(sankey);
  });
});


describe('sankey.linkPopupTemplate', function() {
  it('should throw if passed an argument other than a string, null or undefined', function() {
    expect(() => sankey.linkPopupTemplate({})).to.throw();
    expect(() => sankey.linkPopupTemplate([])).to.throw();
    expect(() => sankey.linkPopupTemplate(7)).to.throw(); 
  });

  it('should default to null', function() {
    expect(sankey.linkPopupTemplate()).to.equal(null);
  });

  it('should return the instance if passed null', function() {
    expect(sankey.linkPopupTemplate(null)).to.equal(sankey);
  });

  it('should return the instance if passed a string', function() {
    expect(sankey.linkPopupTemplate('Boo!')).to.equal(sankey);
  });
});


describe('sankey.altClickHandler', function() {
  it('should throw if passed an argument other than a function, null or undefined', function() {
    expect(() => sankey.altClickHandler({})).to.throw();
    expect(() => sankey.altClickHandler([])).to.throw();
    expect(() => sankey.altClickHandler(7)).to.throw();
    expect(() => sankey.altClickHandler('function')).to.throw(); 
  });

  it('should default to null', function() {
    expect(sankey.altClickHandler()).to.equal(null);
  });

  it('should return the instance if passed null', function() {
    expect(sankey.altClickHandler(null)).to.equal(sankey);
  });

  it('should return the instance if passed a function', function() {
    const func = function() {};
    expect(sankey.altClickHandler(func)).to.equal(sankey);
  });

  it('should return the current stored value if passed no arguments', function() {
    const func = function() {};
    expect(sankey.altClickHandler((func)).altClickHandler()).to.equal(func);
  });
});


describe('sankey.color', function() {
  it('should throw if passed an argument other than an a string or undefined', function() {
    expect(() => sankey.color({})).to.throw();
    expect(() => sankey.color(7)).to.throw();
    expect(() => sankey.color([])).to.throw();
    expect(() => sankey.color(null)).to.throw(); 
  });

  it('should default to a six-digit hex color', function() {
    expect(typeof sankey.color()).to.equal('string');
    expect(sankey.color().charAt(0)).to.equal('#');
    expect(sankey.color().length).to.equal(7);
  });

  it('should return the current stored value if passed no arguments', function() {
    expect(sankey.color('teal').color()).to.equal('teal');
  });
});


describe('sankey.hoverColor', function() {
  it('should throw if passed an argument other than an a string or undefined', function() {
    expect(() => sankey.hoverColor({})).to.throw();
    expect(() => sankey.hoverColor(7)).to.throw();
    expect(() => sankey.hoverColor([])).to.throw();
    expect(() => sankey.hoverColor(null)).to.throw(); 
  });

  it('should default to a six-digit hex hoverColor', function() {
    expect(typeof sankey.hoverColor()).to.equal('string');
    expect(sankey.hoverColor().charAt(0)).to.equal('#');
    expect(sankey.hoverColor().length).to.equal(7);
  });

  it('should return the current stored value if passed no arguments', function() {
    expect(sankey.hoverColor('teal').hoverColor()).to.equal('teal');
  });
});


describe('sankey.colorOverrides', function() {
  it('should throw if passed an argument other than an array or undefined', function() {
    expect(() => sankey.colorOverrides({})).to.throw();
    expect(() => sankey.colorOverrides(7)).to.throw();
    expect(() => sankey.colorOverrides(null)).to.throw(); 
  });

  it('should throw if passed an array with non-object elements', function() {
    expect(() => sankey.colorOverrides([{}, 7])).to.throw();
  });

  it('should default to an empty array', function() {
    expect(Array.isArray(sankey.colorOverrides())).to.equal(true);
    expect(sankey.colorOverrides().length === 0).to.equal(true);
  });

  it('should return the current stored value if passed no arguments', function() {
    const arr = [{name: 'a', color: 'blue'}];
    expect(sankey.colorOverrides(arr).colorOverrides()).to.equal(arr);
  });
});