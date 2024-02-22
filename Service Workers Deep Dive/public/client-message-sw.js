//Service Worker that demonstrates posting message to clients using Service Worker client interface

const version = '1.0';

self.addEventListener('activate', function(event) {
   console.log(`activate message sw version: ${version}`);
});

self.addEventListener('install', function(event) {
  console.log('installed message sw version: ${version}');  
});

self.addEventListener('message', function(event) {

  var getAllClientsPromise = self.clients.matchAll()
  .then(function(clients) {

    console.log(`Preparing to send message to ${clients.length} clients`);

    clients.forEach(function(client) {

      console.log(`Sending message to client id: ${client.id}`);

      client.postMessage({
        message: "50% off all Uncle Sam hats!"
      });

    });

  });

  if (event.waitUntil) {
      event.waitUntil(getAllClientsPromise);
  }

});
