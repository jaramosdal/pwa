//Notification example
 document.getElementById('showNotification').onclick = function() {

  if(window.Notification) {

      Notification.requestPermission(function(status) { 

          var n = new Notification('Hat for Cat', 
          { body: 'You are signed up for notifications!' }); 
      
        });
  }
  else {

      alert('Sorry your browser does not support notifications');

  }

}

navigator.serviceWorker.register('/push-sw.js');

navigator.serviceWorker.ready
.then(function(registration) {

  return registration.pushManager.getSubscription()
  .then(function(subscription) {
 
    if (subscription) {
      return subscription;
    }

    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'YOURKEY' //replace with key generated from call to webPush.generateVAPIDKeys() see app.js
    });

  });

}).then(function(subscription) {
 
  fetch('./register', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      subscription: subscription
    }),
  });

  document.getElementById('sendPushNotification').onclick = function() {

    fetch('./sendNotification', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription: subscription             
      }),
    });
  }
  
});