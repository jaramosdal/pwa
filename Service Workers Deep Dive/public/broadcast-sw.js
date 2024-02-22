const version = '1.0';
const channel = new BroadcastChannel("hat-for-cat");

self.addEventListener('activate', function(event) {
   console.log(`activate broadcast sw version: ${version}`);
});

self.addEventListener('install', function(event) {
  console.log('installed broadcast sw version: ${version}');  
});

channel.addEventListener('message', function(event) {  
  channel.postMessage({message: "Buy one hat get one free!"});
});