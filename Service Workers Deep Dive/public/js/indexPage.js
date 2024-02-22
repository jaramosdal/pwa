const serviceWorkerFileName = '../simple-sw.js';

if ('serviceWorker' in navigator) {
  
  window.addEventListener('load', function() {
    
      navigator.serviceWorker.register(serviceWorkerFileName).then(function(registration) {  
            
        console.log('SW registration successful. Scope: ', registration.scope);
      }, function(err) {
        console.log('SW registration failed: ', err);
      });

    });
}