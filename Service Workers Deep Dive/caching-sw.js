//sw that adds several items to cache and returns an item if it is available
const cacheName = 'hat-for-cat';

self.addEventListener('activate', function(event) {
   console.log('activate');
});

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
            '/images/logo.png',
            '/hats/trilby.png'
          ]);
      })
  );
});

self.addEventListener('fetch', function(event) {

    console.log('fetch');
    
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