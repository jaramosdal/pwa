//Service Worker containing main event handlers
const version = '1.0';
console.log('test');
self.addEventListener('activate', function(event) {
   console.log(`activate sw version: ${version}`);
});

self.addEventListener('install', function(event) {
  console.log('install');  
});

self.addEventListener('fetch', function(event) {
    console.log(`fetch ${event.request.url}`);
});

self.addEventListener('message', function(event) {
  console.log(`received: ${event.data.message}`);
});
