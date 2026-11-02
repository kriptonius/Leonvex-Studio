// Service worker mínimo (v2): permite instalar LeonVex como app (PWA).
// No guarda nada en caché y NO toca audio, video ni el túnel de radio: eso va directo a la red.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.pathname.indexOf('/radio-proxy') === 0 || r.destination === 'audio' || r.destination === 'video' || r.headers.has('range')) return;
  e.respondWith(fetch(r));
});
