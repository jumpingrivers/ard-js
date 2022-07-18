/* global chartMaker chai, describe, it */

(function() {
  'use strict';

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
  });
})();

