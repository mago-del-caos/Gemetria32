const CACHE_NAME = 'gametria32-v1';

// Todos los archivos de nuestra arquitectura plana
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './motor.js',
    './manifest.json',
    './icon-192x192.png',
    './icon-512x512.png'
];

// Fase de Instalación: El constructor guarda los planos en la memoria
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Archivos del taller guardados en caché correctamente.');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fase de Intercepción (Fetch): Si no hay internet, saca los archivos de la caché
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devuelve el archivo en caché, si no existe, lo busca en la red
                return response || fetch(event.request);
            })
    );
});
