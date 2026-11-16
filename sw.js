// 强制清空所有缓存，并注销自身
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => {
      return self.clients.claim();
    }).then(() => {
      // 注销当前 Service Worker
      return self.registration.unregister();
    })
  );
});