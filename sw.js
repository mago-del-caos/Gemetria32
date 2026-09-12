// Aumentamos a la versión 2 para obligar al sistema a borrar el error anterior
const CACHE_NAME = 'gametria32-v2';

const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './motor.js',
    './manifest.json',
    './logo192.png',
    './logo512.png'
];

self.addEventListener('install', event => {
    // Forza la instalación inmediata del nuevo Service Worker
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    // Esta fase borra la caché antigua (v1) para que no interfiera
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Borrando caché antigua:', cacheName);
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
                return response || fetch(event.request);
            })
    );
});
