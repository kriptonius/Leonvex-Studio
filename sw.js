// Service worker mínimo: permite que Chrome instale LeonVex como app real (PWA).
// No guarda nada en caché: todo va directo a la red (radios, TV y música en vivo).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request));
});
