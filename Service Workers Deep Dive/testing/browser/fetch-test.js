//To be run from browser based test. Tests that fallback content is being returned for specific requests

describe('Fetch tests', function() {

    it('requests for trigger-fallback-url should return fallback content', function() {
       
        const expectedContent = 'fallback-svg';

        return fetch('trigger-fallback-url')
        .then(function(response) {

            if (!response) {
                throw new Error('No fallback found');
            }
    
            return response.text();
        })
        .then(function(responseText) {
            if (responseText !== expectedContent) {
                throw new Error(`Expected ${expectedContent} but received ${responseText}`);
            }
        });
       
    });   
    
    
    it('requests for other urls should not return fallback content', function() {
      
      const fallbackContent = 'fallback-svg';

      return fetch('another url')
      .then(function(response) {

          if (!response) {
              throw new Error('No fallback found');
          }
  
          return response.text();
      })
      .then(function(responseText) {
          if (responseText === fallbackContent) {
              throw new Error(`Should not be ${fallbackContent} but received ${responseText}`);
          }
      });
     
  });    
});