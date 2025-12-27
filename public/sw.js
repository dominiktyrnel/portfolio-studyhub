// Service Worker for Study Hub PWA
// Provides offline support and caching strategy

// CRITICAL: Bumped version to invalidate old cache with icons (Dec 2024)
const CACHE_NAME = 'study-hub-v3-icons-refresh';
const RUNTIME_CACHE = 'study-hub-runtime-v3';

// Assets to cache immediately on install
// IMPORTANT: index.html is EXCLUDED - must always fetch fresh from server
const PRECACHE_ASSETS = [
    '/study/now',
    '/study/plan',
    '/study/records',
    '/study/faq',
    '/study/room',
    '/offline.html' // Fallback page
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Precaching assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
                        .map(name => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - network first, then cache
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // CRITICAL: Never cache index.html - always fetch fresh from server
    // This ensures users get the latest bundle references after deployment
    if (url.pathname === '/' || url.pathname === '/index.html') {
        event.respondWith(fetch(request));
        return;
    }

    // Skip Firestore and Firebase requests (always need fresh data)
    if (url.hostname.includes('firebaseio.com') ||
        url.hostname.includes('firestore.googleapis.com') ||
        url.hostname.includes('firebase')) {
        return;
    }

    // Network-first strategy for Study Hub pages
    if (url.pathname.startsWith('/study')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    // Clone response for caching
                    const responseToCache = response.clone();

                    caches.open(RUNTIME_CACHE)
                        .then(cache => {
                            cache.put(request, responseToCache);
                        });

                    return response;
                })
                .catch(() => {
                    // Network failed, try cache
                    return caches.match(request)
                        .then(cachedResponse => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }

                            // No cache, return offline page
                            return caches.match('/offline.html');
                        });
                })
        );
        return;
    }

    // Cache-first strategy for static assets
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(request)
                    .then(response => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        const responseToCache = response.clone();

                        caches.open(RUNTIME_CACHE)
                            .then(cache => {
                                cache.put(request, responseToCache);
                            });

                        return response;
                    });
            })
    );
});

// Message event - for manual cache updates
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data === 'CLEAR_CACHE') {
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(name => caches.delete(name))
            );
        });
    }
});
