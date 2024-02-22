const assert = require('assert');
const makeServiceWorkerEnv = require('service-worker-mock');

//not needed for this test but you may want for other testing
const makeFetchMock = require('service-worker-mock/fetch');

beforeEach(function(done){
  Object.assign(
    global,
    makeServiceWorkerEnv()       
  );

  //not needed for this test but avoids requirement for additional dependency;
  global.fetch = (url) => Promise.resolve({ result: "Test" });
  done();
});

describe('Mock demonstration', function() {

  it('Testing our sw-lib', async function() {

    const swLibrary = require('./sw-library');
    const expectedKeys = 3;

    swLibrary.addStuffToCache();

    var cache = await caches.open('test-cache')
    var actualKeys = await cache.keys();
    
    assert.equal(actualKeys.length, expectedKeys);

  });

});