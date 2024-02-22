//Uses Message Channel to send string "start" to Service Worker and initiate testing
//based on: https://medium.com/dev-channel/testing-service-workers-318d7b016b19

describe('Service Worker Suite', function() {

   it('cache should contain two items', function() {

        return navigator.serviceWorker.register('inside-test-sw.js')  
        .then(function(serviceWorker) {

            return sendMessage('start');

        })
        .then(function(results)  {

            if (results.failures > 0) {
                throw new Error(`${results.failures} failures`);
            }

        });
    });
    
});

const sendMessage = function(message)  {

    return new Promise(function(resolve, reject) {
      
        const messageChannel = new MessageChannel();

        messageChannel.port1.onmessage = function(event) {

            if (event.data.error) {
                reject(event.data.error);
            } else {
                resolve(event.data);
            }

        };
  
        navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
    });

  };