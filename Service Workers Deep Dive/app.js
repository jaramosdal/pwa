var express = require('express');
var path = require('path');
var logger = require('morgan');
var webPush = require('web-push');
var app = express();

//port express server runs on
const port = 3000;

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//browser based tests
app.use('/browser-test', express.static(path.join(__dirname, '/testing/browser/')));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) =>  {
    res.sendFile(__dirname + '/public/index.htm');
})

//removes Service Workers and caches
app.get('/clearsitedata', (req, res) =>  {
   
    res.set({
        'Clear-Site-Data': '"storage"'       
    });

    res.send('Service worker delete!');
});


app.post('/register', function(req, res) {
    //save subscription here in the real world
    res.sendStatus(201);
});

//triggers the sending of a Push notification
app.post('/sendNotification', function(req, res) {

    const subscription = req.body.subscription;
    const payload = JSON.stringify({ 'message' : "Winter hats are back in stock!" });

    const options = {
      TTL: req.body.ttl
    };

    setTimeout(function() {
      webPush.sendNotification(subscription, payload, options)
      .then(function() {
        res.sendStatus(201);
      })
      .catch(function(error) {
        res.sendStatus(500);
        console.log(error);
      });
    }, req.body.delay * 1000);
  });

  //returns a response after 5 seconds to simulate a slow end-point
  app.get('/slow-end-point', function(req, res) {

    const waitTime = 5000;
  
    setTimeout(function() {  
      res.sendStatus(500);
    }, waitTime);
  
  });


//To generate your own keys use: const vapidKeys = webPush.generateVAPIDKeys();
// webPush.setVapidDetails(
//     'YOURURLOREMAIL',
//     'YOURKEY', //replace with your generated public key
//     'YOURKEY'  //replace with your generated private key
// );


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
