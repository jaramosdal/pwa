This is a Node/Express based website used in Pluralsight Service Workers: Deep Dive course by Alex Mackey.

Credits
----------------
Please refer to credits.txt for attribution of assets, code etc.


Important!
----------------
The code in this site is written to make minimal use of Node and JavaScript features and contains limited error handling for easy readability. 

This code does not represent good practice and I highly recommend you refer to Service Worker cookbook at https://serviceworke.rs/ for a good resource to base your Service Worker code on.

This code contains several Service Workers that are used throughout the course. Please remember to unregister Service Workers using the browser tools if you want to try out different functionality and delete any caches otherwise you may get unpredictable results. 

Additionally to run Selenium tests you will need to follow instructions at: https://www.npmjs.com/package/selenium-webdriver and ensure you have downloaded and installed browser web driver executables.

Setup
----------------
First ensure that you have installed Node - https://nodejs.org/en/ (tested against v12.16.2)

Next run "npm install" from command prompt to restore packages.

(optional) If you want to run Selenium tests install Selenium web driver by following instructions at: https://www.npmjs.com/package/selenium-webdriver
(optional) If you want to run Workbox CLI tool follow instructions at: https://developers.google.com/web/tools/workbox/modules/workbox-cli

Finally to start webserver (which is set in app.js to run on port 3000) run command "node run app"
Open a browser and go to: http://localhost:3000/


Tests
----------------
This section describes how to run the various tests used throughout the course:

npm test
npm run "mock"
npm run "sel"

Workbox CLI
----------------
npm run workbox

Structure
----------------
app.js (entry point and express setup)
public (contains most of Service Worker and related JavaScript code)
testing\browser (tests to run in browser with Mochajs)
testing\mock (tests using service-worker-mock package
testing\selenium (selenium web driver based tests that run test in testings\browser)
testing\unit (simple unit tests)
workbox (workbox related code)