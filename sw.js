const CACHE_NAME = 'serbisyomo-shell-v4';
const APP_SHELL = [
  './',
  'index.html',
  'login.html',
  'signup.html',
  'providers.html',
  'profile.html',
  'request.html',
  'requests.html',
  'favorites.html',
  'provider-dashboard.html',
  'css/style.css',
  'js/storage.js',
  'js/auth.js',
  'js/common.js',
  'js/main.js',
  'js/provider-dashboard.js',
  'js/account.js',
  'account.html',
  'js/data.js',
  'manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(event.request);
        if (response && (response.ok || response.type === 'opaque')) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        }
        return response;
      } catch (error) {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === 'navigate') return caches.match('./index.html');
        throw error;
      }
    })()
  );
});
