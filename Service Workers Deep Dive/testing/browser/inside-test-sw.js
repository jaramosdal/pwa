//Service worker that runs test on Cache when "start" sent via Message Channel API
//based on: https://medium.com/dev-channel/testing-service-workers-318d7b016b19

importScripts('mocha.js');
importScripts('chai.js');

const cacheName = 'test-inside-sw-cache';

mocha.setup({
  ui: 'bdd',
  reporter: null,
});

self.addEventListener('install', function(event) {
  
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {

        return cache.addAll([
            'hat01.jpg',
            'hat02.jpg'
          ]);
      }).then(function(){
        self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

describe('Cache tests', function() {

  it('cache should contain two items', async function() {
    
    var cache = await caches.open(cacheName)
    const expectedKeys = 2;
    var actualKeys = await cache.keys();
    
    chai.assert.equal(actualKeys.length, expectedKeys);

  });
  
});


self.addEventListener('message', function(event) {

  if (event.data === 'start') {
    
    const runResults = mocha.run();

    runResults.on('end', function() {

      event.ports[0].postMessage({
        failures: runResults.failures,
        total: runResults.total,
      });

    });

  }
  
});



