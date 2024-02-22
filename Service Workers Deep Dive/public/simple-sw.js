//Simple Service Worker that adds assets to cache then returns them if available
const cacheName = 'hat-for-cat';

self.addEventListener('install', function(event) {
  
  console.log('install');

  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll([
            '/',
            '/index.htm',
            '/css/lib/main.css',
            '/css/app.css',
            '/images/logo.png'
          ]);
      })
  );
});

self.addEventListener('fetch', function(event) {

    console.log(`fetch ${event.request.url}`);  

    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
});