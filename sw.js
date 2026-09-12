// Aumentamos a la versión 4 para obligar al sistema a borrar la caché antigua 'v3'
const CACHE_NAME = 'gametria32-v4';

// Todos los archivos estáticos en la raíz con sus nuevos nombres seguros y versionados
const urlsToCache = [
    './?v=4',
    './index.html?v=4',
    './style.css?v=4',
    './motor.js?v=4',
    './manifest.json?v=4',
    './Logo.png',
    './Logo1png'
];

self.addEventListener('install', event => {
    // Forza la instalación inmediata del nuevo Service Worker
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Archivos del taller guardados en caché correctamente (v4).');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fase de activación: Limpia la memoria antigua
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Borra cualquier caché que no sea 'gametria32-v4'
                    if (cacheName !== CACHE_NAME) {
                        console.log('Borrando caché antigua (v4):', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el archivo está en caché, lo devuelve. Si no, lo descarga.
                return response || fetch(event.request);
            })
    );
});
