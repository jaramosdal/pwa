//Service Worker that demonstrates making a request via network for asset with timeout
//If timeout exceeded then attempts to use Cache before using hard coded fallback content
//Inspired by https://serviceworke.rs/strategy-network-or-cache_service-worker_doc.html

const cacheName = 'network-then-fallback-v1-0';
const timeoutMilliseconds = 2000;
const slowEndpointRegex = /slow-end-point/g;

self.addEventListener('install', function(event) {
  
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        return cache.addAll([
            '/',
            '/index.htm',
            '/css/lib/main.css',
            '/css/app.css',
            '/images/logo.png'
          ]);
      })
  );
});

self.addEventListener('fetch', function(event) {
  
  event.respondWith(
    
      tryNetwork(event.request).catch(function() {
        return tryCacheThenFallback(event.request)
      }));  
     
});


function tryNetwork(request){  
  console.log(`trying network for ${request.url}`);

  return new Promise(function (success, fail) {

    var fetchTimeoutId = setTimeout(fail, timeoutMilliseconds);

    fetch(request).then(function(response) {

      if(response.ok) {
        console.log(`network successful for ${request.url}`);

        clearTimeout(fetchTimeoutId);
        success(response); 
      }
      else {
        console.error(`response not ok for ${request.url}`);
        throw new Error('response not ok');
      }   
            
    }).catch(function() {
      throw new Error('fetch failed');
    });

  })
  .catch(function() {
    console.error(`network unsuccessful for ${request.url}`);
    fail('network unsuccessful');
  });

}

function tryCacheThenFallback(request) {

  console.log(`trying cache for ${request.url}`);

  return caches.open(cacheName).then(function (cache) {

    return cache.match(request).then(function (matching) {
      return matching || svgFallback(request);
    });

  });

}

function svgFallback(request) {
  
  //in reality you would serve up different fallbacks for different file types
  if(request.url.match(slowEndpointRegex)) {

    console.log(`using fallback for ${request.url}`);

    return Promise.resolve(new Response(catSvg, { headers: {
      'Content-Type': 'image/svg+xml'
    }}));

  }
 
  console.error(`no fallback available for ${request.url}`);
}
    
const catSvg = 
'<svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">' +
' <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --> ' +
' <g> ' +
' <title>background</title>' +
' <rect fill="#fff" id="canvas_background" height="402" width="582" y="-1" x="-1"/>' +
' <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">' +
'   <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>' +
'  </g>' +
'</g>' +
' <g>' +
'  <title>Layer 1</title>' +
' <ellipse ry="103" rx="153" id="svg_1" cy="208.453125" cx="281.5" stroke-width="1.5" stroke="#000" fill="#fff"/>' +
' <path d="m156.5,148.453125c-1,-1 -2.095444,-1.977341 -3,-6c-1.118668,-4.974792 -1.806168,-9.030441 -3,-16c-0.860886,-5.025818 -1,-12 -1,-18c0,-5 0.295609,-7.014603 0,-10c-0.502441,-5.074203 -1,-11 -1,-13c0,-1 0,-2 0,-4c0,-1 1.836609,-0.775726 10,5c5.886703,4.164932 10.718994,7.310211 14,10c2.78833,2.285881 7.881516,4.190277 11,6c1.93399,1.122345 3.186005,0.692551 5,2c1.147263,0.826904 2.805649,2.44841 7,4c3.867004,1.430496 7.292892,1.292892 8,2c0.707108,0.707108 2.458801,0.693436 3,2c0.38269,0.923882 1,1 4,2l0,1l1,1" id="svg_2" stroke-width="1.5" stroke="#000" fill="none"/>' +
'  <path d="m361.5,117.453125c1,-1 4,-3 9,-6c5,-3 8.410919,-7.692383 13,-11c3.627991,-2.614906 7.21167,-5.714119 10,-8c2.187347,-1.79319 5.563416,-5.342354 8,-8c4.327148,-4.719734 10,-7 14,-9c2,-1 3,-2 4,-2c1,0 1,2 1,5c0,2 0.493469,4.878555 1,8c0.320374,1.974174 1,5 1,7c0,3 0,6 1,11c1,5 2,9 2,13c0,5 0,8 0,9c0,2 -0.076111,2.61731 -1,3c-1.306549,0.541199 -1.770233,2.026749 -2,3c-0.513733,2.176254 -2.486267,2.823746 -3,5c-0.229767,0.973251 -0.129669,1.885315 -1,3c-3.58844,4.595993 -3.692535,5.186005 -5,7c-0.826904,1.147263 -2,2 -2,4l-1,1" id="svg_3" stroke-width="1.5" stroke="#000" fill="none"/>' +
' <path d="m217.5,274.453125c0,0 -1,0 -1,-1c0,-2 0,-4 0,-5c0,-3 0,-5 0,-9c0,-1 0.420425,-4.085815 1,-6c1.04483,-3.450851 2.385101,-3.372009 5,-7c2.480713,-3.441803 7.173096,-5.852737 8,-7c1.307449,-1.813995 2.823746,-3.486252 5,-4c1.946503,-0.459503 4,-2 7,-3c3,-1 8.022476,-1.633453 11,-2c4.092224,-0.503769 7,-2 9,-2c4,0 9,-2 13,-2c4,0 8,0 12,0c3,0 6.026764,-0.229752 7,0c2.176239,0.513748 2.757355,1.585785 7,3c10.606598,3.535538 16.907776,3.496231 21,4c0.992493,0.122177 3,0 4,1c1,1 2,1 4,1c1,0 2.152252,-0.765366 4,0c1.306549,0.541199 1,2 2,2c1,0 2.61731,1.076126 3,2c0.541199,1.306564 1.346191,1.70546 3,4c2.614899,3.627991 3.274323,8.884964 4,11c1.654816,4.823029 1.173096,6.852722 2,8c1.307465,1.813995 1,4 2,5l0,2l0,1" id="svg_4" stroke-width="1.5" stroke="#000" fill="none"/>' +
' <ellipse ry="12.5" rx="16" id="svg_6" cy="173.953125" cx="231.5" stroke-width="1.5" stroke="#000" fill="#fff"/>' +
' <ellipse ry="12.5" rx="16" id="svg_7" cy="173.953125" cx="316.5" stroke-width="1.5" stroke="#000" fill="#fff"/>' +
' <ellipse ry="12.5" rx="16" id="svg_8" cy="208.953125" cx="279.5" stroke-width="1.5" stroke="#000" fill="#fff"/>' +
' <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_9" y2="173.453125" x2="455.5" y1="205.453125" x1="308.5" stroke-width="1.5" stroke="#000" fill="none"/>' +
' <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_10" y2="173.453125" x2="99.5" y1="203.453125" x1="247.5" stroke-width="1.5" stroke="#000" fill="none"/>' +
' <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_11" y2="260.453125" x2="96.5" y1="216.453125" x1="240.5" stroke-width="1.5" stroke="#000" fill="none"/>' +
' <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_12" y2="267.453125" x2="491.5" y1="218.453125" x1="317.5" stroke-width="1.5" stroke="#000" fill="none"/>' +
' </g>' +
'</svg>';