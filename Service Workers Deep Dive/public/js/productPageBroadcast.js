//broadcastChannel example
const broadCastChannel = new BroadcastChannel("hat-for-cat");

if ('serviceWorker' in navigator) {
  
  window.addEventListener('load', function() {
    
      navigator.serviceWorker.register('/broadcast-sw.js').then(function(registration) {
        console.log('SW registration successful. Scope: ', registration.scope);
      }, function(err) {
        console.log('SW registration failed: ', err);
      });

    });
}

function checkForSpecialOffers() {

  broadCastChannel.postMessage("check-for-special-offers");

}

broadCastChannel.addEventListener("message", function(event){
  
  var specialOfferDiv = document.getElementById("special-offer");
  var specialOfferText = document.getElementById("special-offer-text");
  
  specialOfferDiv.style.display = "block";
  specialOfferText.innerHTML=event.data.message;

});