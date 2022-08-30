/* global utviz, describe, it, chai */
const { expect } = chai;


describe('version', function() {
  it('should have basic semver format: digits.digits.digits', function() {
    expect(/\d+\.\d+\.\d+/.test(utviz.version)).to.equal(true);
  });
});