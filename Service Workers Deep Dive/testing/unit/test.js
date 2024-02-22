const assert = require('assert');
const router = require('./fallback-router');

describe('Fallback Router', function() {

  it('should return SVG content when url is slow-end-point', function() {
        
    const expected = 'svgcontent';
    const actual = router.getFallback('slow-end-point');

    assert.equal(actual, expected);

  });

  it('should return no-fallback when url is not slow-end-point', function() {
        
    const expected = 'no-fallback';
    const actual = router.getFallback('testing');

    assert.equal(actual, expected);

  });

});