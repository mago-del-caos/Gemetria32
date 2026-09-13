// ==========================================
// SERVICE WORKER - CACHÉ V11 (PURGA TOTAL)
// ==========================================
const CACHE_NAME = 'gametria32-v11';

// El catálogo de archivos que conforman el templo, sellados con la versión 11
const urlsToCache = [
    './?v=11',
    './index.html?v=11',
    './style.css?v=11',
    './motor.js?v=11',
    './manifest.json?v=11',
    './Logo.png',
    './Logo1png'
];

// Fase de Instalación: Se invoca al nuevo guardián
self.addEventListener('install', event => {
    // skipWaiting fuerza a que el nuevo Service Worker tome el control inmediatamente
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Mesa de Trazado purificada guardada en caché (v11).');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fase de Activación: Destruir las memorias pasadas
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Si la caché no es la v11, se elimina del registro sin piedad
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
