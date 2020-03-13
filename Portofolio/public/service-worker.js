var staticCacheName = 'portofolio';
var filesToCache = [
    '/',
    '/assets/css/freelancer.min.css',
    '/assets/img/4x6.png',
    '/assets/js/freelancer.min.js',
    '/assets/js/contact_me.js',
    '/assets/js/jqBootstrapValidation.js',
    '/assets/vendor/jquery-easing/jquery.easing.min.js',
    '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
    '/assets/vendor/jquery/jquery.min.js',
    '/assets/img/portfolio/kkn.png',
    '/assets/img/portfolio/pbn.png',
    '/assets/img/portfolio/SumberDaya.jpg',
    '/assets/img/portfolio/teofl.jpg',
    '/assets/img/portfolio/musik.png',
    'assets/img/portfolio/rsia.png',
    '/assets/css/bootstrap/bootstrap.css',
    '/assets/vendor/fontawesome-free/css/all.min.css',
    '/assets/vendor/fontawesome-free/webfonts/fa-solid-900.woff2',
    '/assets/vendor/fontawesome-free/webfonts/fa-brands-400.woff2',
    
];

// Cache on install
self.addEventListener("install", event => {
    this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    )
});

// Clear cache on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith("portofolio")))
                    .filter(cacheName => (cacheName !== staticCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// Serve from Cache
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('/');
            })
    )
});