const CACHE_NAME = 'liquid-glass-v1';

// 需要预缓存的本地核心文件
const LOCAL_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/chat.js',
  './js/call.js',
  './js/map.js',
  './js/transfer.js',
  './js/components/chat-toolbar.js',
  './js/components/call-ui.js',
  './js/components/image-preview.js',
  './manifest.json'
];

// 需要缓存的第三方 CDN 资源（关键：保证断网也能加载 UI）
const CDN_ASSETS = [
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js',
  'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@500;600;700;900&family=Playfair+Display:ital,wght@1,500;1,600&family=Inter:wght@400;500;600;700&display=swap'
];

// 安装时，把本地和远程的依赖统统拉取到缓存
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 先缓存本地文件，如果某个第三方资源因为网络问题加载失败，不会阻断整个安装
      return cache.addAll(LOCAL_ASSETS).then(() => {
        return Promise.allSettled(CDN_ASSETS.map(url => cache.add(url)));
      });
    })
  );
});

// 激活时，清理旧版本的缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 拦截请求：网络优先，网络失败或超时则读取缓存
self.addEventListener('fetch', (event) => {
  // 只拦截 GET 请求
  if (event.request.method !== 'GET') return;

  event.respondWith(
    // 尝试从网络请求
    fetch(event.request)
      .then((response) => {
        // 如果请求成功，把最新的响应克隆一份存入缓存
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // 网络请求失败（比如断网了），去缓存里找
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // 如果缓存里也没有，返回一个简单的错误提示
          return new Response('离线状态且无缓存', { status: 404, statusText: 'Offline' });
        });
      })
  );
});
