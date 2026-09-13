// ==========================================
// SERVICE WORKER - CACHÉ V8
// ==========================================
const CACHE_NAME = 'gametria32-v8';

// El catálogo de archivos que conforman el templo, sellados con la versión 8
const urlsToCache = [
    './?v=8',
    './index.html?v=8',
    './style.css?v=8',
    './motor.js?v=8',
    './manifest.json?v=8',
    './Logo.png',
    './Logo1png'
];

// Fase de Instalación: Se invoca al nuevo guardián
self.addEventListener('install', event => {
    // skipWaiting fuerza a que el nuevo Service Worker tome el control inmediatamente
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Mesa de Trazado guardada en caché (v8).');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fase de Activación: Purgar las memorias pasadas
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Si la caché no es la v8, se elimina del registro
                    if (cacheName !== CACHE_NAME) {
                        console.log('Borrando caché antigua de Gematría:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fase de Petición: Servir desde el éter o buscar en la red
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
