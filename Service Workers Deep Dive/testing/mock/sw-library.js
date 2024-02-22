
function addStuffToCache(){

  caches.open('test-cache').then(function(cache){
    cache.put(new Request('http://test1'), new Response());
    cache.put(new Request('http://test2'), new Response());
    cache.put(new Request('http://test3'), new Response());
  });

}

module.exports = {
  addStuffToCache: addStuffToCache
}

      