// Hors connexion : garde une copie du jeu ; prend toujours la version en ligne quand Internet est là.
const C = 'terres-sauvages';
self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png']))); });
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url); if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request, { cache: 'no-store' }).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('./'))));
});
