//clears down any existing Service Worker registrations and caches then runs testing\browser\fetch-test.js
//ensure you have setup Selenium Webdriver prior to running: https://www.npmjs.com/package/selenium-webdriver

const {Builder} = require('selenium-webdriver');
 
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    
    await driver.get('http://localhost:3000/browser-test/holding.htm');
    await driver.executeScript(clearDownScript);
    await driver.executeScript("navigator.serviceWorker.register('fetch-sw.js')");
    await driver.get('http://localhost:3000/browser-test/fetch-test.htm');    
  } finally {
    //await driver.quit();
  }
})();

const clearDownScript = 
"console.log('beginning service worker registration clear down'); " +
"navigator.serviceWorker.getRegistrations() " +
".then(function(regs) {" +
"    const unregisterPromise = regs.map(function(reg) {" +
"" +
"        console.log('unregistering sw at scope: ' + reg.scope);" +
"        return reg.unregister();" +
"" +
"    });" +
"" +
"    return Promise.all(unregisterPromise);" +
"})" +
".then(function(){" +
"console.log('beginning cache clear down'); " +
"" +
"    return window.caches.keys()" +
"    .then(function(cacheKeys) {" +
"    " +
"        const unregisterPromise = cacheKeys.map( function(cacheName) {" +
"            console.log('deleting cache ' + cacheName);" +
"            return window.caches.delete(cacheName);" +
"        });" +
"" +
"        return Promise.all(unregisterPromise);" +
"" +
"    })" +
".then(function(){" +
"console.log('completed cleardown');" +
"});" + 
"})" ; 



