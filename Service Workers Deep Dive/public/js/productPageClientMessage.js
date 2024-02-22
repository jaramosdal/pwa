//Client Message example
const serviceWorkerFileName = '/client-message-sw.js';

if ('serviceWorker' in navigator) {
  
  window.addEventListener('load', function() {
    
      navigator.serviceWorker.register(serviceWorkerFileName).then(function(registration) {            
        console.log('SW registration successful. Scope: ', registration.scope);      
      }, function(err) {
        console.log('SW registration failed: ', err);
      });

    });
}


function checkForSpecialOffers(){

    navigator.serviceWorker.controller.postMessage({
        message: "check-for-special-offers"
    });

}

navigator.serviceWorker.addEventListener("message", function () {   

  var specialOfferDiv = document.getElementById("special-offer");
  var specialOfferText = document.getElementById("special-offer-text");
          
  specialOfferDiv.style.display = "block";
  specialOfferText.innerHTML=event.data.message;
  
});
