const CACHE = 'sarmaye-v2';
const FILES = [
  '/finance_app/',
  '/finance_app/index.html',
  '/finance_app/manifest.json',
  '/finance_app/icon-32.png',
  '/finance_app/icon-152.png',
  '/finance_app/icon-167.png',
  '/finance_app/icon-180.png',
  '/finance_app/icon-192.png',
  '/finance_app/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/finance_app/')))
  );
});
