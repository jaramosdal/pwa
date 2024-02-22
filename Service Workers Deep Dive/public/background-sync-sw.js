//calls addToBasket when sync event with tag "add-to-basket" received
const version = '1.0';

self.addEventListener('activate', function(event) {
   console.log(`activate sw background sync version: ${version}`);
});

self.addEventListener('install', function(event) {
  console.log('install sw background sync');  
});

self.addEventListener('sync', function(event) {
  
  if (event.tag == 'add-to-basket') {
    event.waitUntil(addToBasket());
  }

});

function addToBasket(){

  console.log('adding product to basket');

  return self.clients.matchAll()
  .then(function(clients) {

    clients.forEach(function(client) {

      client.postMessage({
        message: "Item was added to basket"
      });

    });

  });

}