//background sync example
if ('serviceWorker' in navigator) {
  
  window.addEventListener('load', function() {

      navigator.serviceWorker.register('/background-sync-sw.js').then(function(registration) {  
            
        console.log('SW registration successful. Scope: ', registration.scope);

        document.getElementById('add-to-basket').addEventListener('click', function(e){
          
          registration.sync.register('add-to-basket')

          if (!navigator.onLine) {
            console.log('user is offline so will be added later')
            alert('You are offline so this will be added later');
          }
         
        });

      }, function(err) {
        console.log('SW registration failed: ', err);
      });      

    });
}

navigator.serviceWorker.addEventListener("message", function () {   

  alert(event.data.message);         

});