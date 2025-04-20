// Service Worker for Muhammad Rafiq's Portfolio
const CACHE_NAME = "rafiq-portfolio-v1";

// Assets to cache for offline use
const urlsToCache = ["/", "/index.html", "/assets/Rafiq.PNG", "/manifest.json"];

// Install event - Cache all resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.error("Failed to cache resources:", err);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - Serve from cache first, then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses or non-GET requests
          if (
            !response ||
            response.status !== 200 ||
            event.request.method !== "GET"
          ) {
            return response;
          }

          // Clone the response as it's a stream that can only be consumed once
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch((error) => {
          // If fetch fails (e.g., offline), try to serve from cache
          console.error("Fetch failed:", error);

          // If it's a page navigation, serve the offline page
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
        });
    })
  );
});
