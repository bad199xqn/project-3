   // Function to add our give data into cache
   export const addDataIntoCache = (cacheName, url, response) => {
    // Converting our respons into Actual Response form
    const data = new Response(JSON.stringify(response));
  
    if ('caches' in window) {
      // Opening given cache and putting our data into it
      caches.open(cacheName).then((cache) => {
        cache.put(url, data);
        console.log('them vao cache ' + url)
      });
    }
  };

    // Function to get single cache data
   export const getCacheData = async (cacheName, url) => {
        if (typeof caches === 'undefined') return false;
        
        const cacheStorage = await caches.open(cacheName);
        const cachedResponse = await cacheStorage.match(url);
        
        // If no cache exists
        if (!cachedResponse || !cachedResponse.ok) {
          console.log('Fetched failed!')
          return false
        }
      
        return cachedResponse.json().then((item) => {
          return item
        });
      };
      