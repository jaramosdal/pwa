self.addEventListener('push', function(event) {
  
    event.waitUntil(
        
        self.registration.showNotification('Hat For Cat!', {
          body: event.data.json().message,
        })
    );
   
});
