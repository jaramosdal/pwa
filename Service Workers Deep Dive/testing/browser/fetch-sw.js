//returns hardcoded string if url ends in trigger-fallback-url

const fallbackContent = 'fallback-svg';

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {

  console.log(event.request.url);

  if (event.request.url.endsWith('trigger-fallback-url')) {

    console.log('match found');

    event.respondWith(
        new Response(fallbackContent, { headers: {
        'Content-Type': 'image/svg+xml'
      }})

    );
  }

});