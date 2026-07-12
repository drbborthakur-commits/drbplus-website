// DRB PLUS — Service Worker
// Minimal "app shell" caching so the site opens instantly and works
// offline for already-visited pages. Kept simple on purpose — this is
// the base to extend later (push notifications, background sync, etc.)

const CACHE_NAME = "drbplus-v1";
const APP_SHELL = ["/", "/index.html", "/manifest.json", "/logo.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// Network-first for navigation & API calls (so live data/payment always
// tries the network first), cache-first for static assets.
self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return; // never cache POST (payments etc.)

  const url = new URL(request.url);
  const isApi = url.pathname.startsWith("/api/");

  if (isApi) return; // always go to network for API calls

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
  );
});
