import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

if (import.meta.env.PROD) {
  precacheAndRoute(self.__WB_MANIFEST);
} else {
  console.warn('⚠️ Precaching dilewati (dev mode)');
}


registerRoute(
  ({ url }) => url.origin === 'https://story-api.dicoding.dev',
  new NetworkFirst({
    cacheName: 'story-api-cache',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);

registerRoute(
  ({ url }) => url.href.includes('unpkg.com/leaflet'),
  new CacheFirst({ cacheName: 'leaflet-cache' })
);

registerRoute(
  ({ url }) =>
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({ cacheName: 'google-fonts-cache' })
);

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Notifikasi Baru!';
  const options = data.options || {
    body: 'Anda punya notifikasi baru.',
    icon: '/favicon.png',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
