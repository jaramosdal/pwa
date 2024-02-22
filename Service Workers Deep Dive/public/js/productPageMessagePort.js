//Service Worker Message Channel API example
const serviceWorkerFileName = '/message-port-sw.js';
const messageChannel = new MessageChannel();

if ('serviceWorker' in navigator) {
  
  window.addEventListener('load', function() {
    
      navigator.serviceWorker.register(serviceWorkerFileName).then(function(registration) {  
        console.log('SW registration successful. Scope: ', registration.scope);
      }, function(err) {
        console.log('SW registration failed: ', err);
      });

    });
}

function checkForSpecialOffers() {

  navigator.serviceWorker.controller.postMessage({
    message: '2 for one special offer!',
  }, [messageChannel.port2]);

}

messageChannel.port1.addEventListener("message", function(event) {
  
  var specialOfferDiv = document.getElementById("special-offer");
  var specialOfferText = document.getElementById("special-offer-text");
  
  specialOfferDiv.style.display = "block";
  specialOfferText.innerHTML=event.data.message;

});

messageChannel.port1.start();