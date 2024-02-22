//Service Worker that demonstrates using Message Channel API
const version = '1.0';

self.addEventListener('activate', function(event) {
   console.log(`activate message port sw version: ${version}`);
});

self.addEventListener('install', function(event) {
  console.log('installed message port sw version: ${version}');  
});

self.addEventListener("message", function(event) {

  let port = event.ports[0];
  port.postMessage({ message: event.data.message });
   
});
