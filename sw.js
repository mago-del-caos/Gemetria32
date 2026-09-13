// ==========================================
// SERVICE WORKER - CACHÉ V10 (ESTRUCTURA BLINDADA)
// ==========================================
const CACHE_NAME = 'gametria32-v10';

// El catálogo de archivos que conforman el templo, sellados con la versión 10
const urlsToCache = [
    './?v=10',
    './index.html?v=10',
    './style.css?v=10',
    './motor.js?v=10',
    './manifest.json?v=10',
    './Logo.png',
    './Logo1png'
];

// Fase de Instalación: Se invoca al nuevo guardián
self.addEventListener('install', event => {
    // skipWaiting fuerza a que el nuevo Service Worker tome el control inmediatamente
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Mesa de Trazado blindada guardada en caché (v10).');
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
                    // Si la caché no es la v10, se elimina del registro
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
