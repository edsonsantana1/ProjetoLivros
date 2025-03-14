const CACHE_NAME = 'livros-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './offline.html'  // Adiciona a página offline ao cache
];

// Instalação do service worker e cache dos recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache)) // Certifica-se de que o offline.html também seja cacheado
  );
});

// Busca dos recursos no cache e fallback para offline.html
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se a resposta estiver no cache, retorne ela
        if (response) {
          return response;
        }

        // Caso não esteja no cache e o usuário esteja offline, exibe o offline.html
        return fetch(event.request).catch(() => {
          return caches.match('offline.html'); // Se estiver offline, mostra a página offline.html
        });
      })
  );
});
