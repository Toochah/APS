const CACHE_NAME = 'fire-safety-pwa-v1';
const urlsToCache = [
  '/',
  '/fire_safety_inspection.html',
  '/new_feature.html', // New HTML file added to cache
  '/styles/main.css',
  '/scripts/app.js',
  '/assets/images/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const payload = event.data.json();
    
    const options = {
      body: payload.body,
      icon: payload.icon,
      badge: payload.badge,
      vibrate: [100, 50, 100],
      data: {
        url: payload.url
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(payload.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});