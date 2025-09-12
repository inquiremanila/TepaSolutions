// Service Worker for Tepa Solutions - Performance and Caching Optimization
const CACHE_NAME = 'tepa-solutions-v1.0.0';
const STATIC_CACHE_NAME = 'tepa-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'tepa-dynamic-v1.0.0';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/styles/globals.css',
  '/images/logo.png',
  '/images/hero-background.jpg',
  '/manifest.json'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /^https:\/\/api\.tepasolutions\.com\//,
  /^https:\/\/tepasolutions\.com\/api\//
];

// Image optimization patterns
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i;
const FONT_EXTENSIONS = /\.(woff|woff2|ttf|eot)$/i;

self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache critical resources
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      }),
      
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName !== STATIC_CACHE_NAME && 
                     cacheName !== DYNAMIC_CACHE_NAME &&
                     cacheName.startsWith('tepa-');
            })
            .map(cacheName => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!request.url.startsWith('http')) {
    return;
  }

  event.respondWith(handleRequest(request, url));
});

async function handleRequest(request, url) {
  // Strategy 1: Cache First for static resources
  if (isStaticResource(url)) {
    return cacheFirst(request, STATIC_CACHE_NAME);
  }
  
  // Strategy 2: Network First for HTML pages
  if (isHTMLPage(request)) {
    return networkFirstWithFallback(request, DYNAMIC_CACHE_NAME);
  }
  
  // Strategy 3: Stale While Revalidate for API calls
  if (isAPICall(url)) {
    return staleWhileRevalidate(request, DYNAMIC_CACHE_NAME);
  }
  
  // Strategy 4: Cache with Network Fallback for images
  if (isImage(url)) {
    return cacheWithNetworkFallback(request, DYNAMIC_CACHE_NAME);
  }
  
  // Default: Network with cache fallback
  return networkWithCacheFallback(request, DYNAMIC_CACHE_NAME);
}

// Cache strategies
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

async function networkFirstWithFallback(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for HTML requests
    if (isHTMLPage(request)) {
      return caches.match('/offline.html') || new Response(
        getOfflineHTML(),
        {
          headers: { 'Content-Type': 'text/html' }
        }
      );
    }
    
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(error => {
    console.log('Network request failed:', error);
    return cachedResponse;
  });
  
  return cachedResponse || fetchPromise;
}

async function cacheWithNetworkFallback(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return placeholder image for failed image requests
    if (isImage(new URL(request.url))) {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Image unavailable</text></svg>',
        {
          headers: { 'Content-Type': 'image/svg+xml' }
        }
      );
    }
    throw error;
  }
}

async function networkWithCacheFallback(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Resource type detection
function isStaticResource(url) {
  return url.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/i) ||
         url.pathname.includes('/fonts/') ||
         url.pathname.includes('/static/');
}

function isHTMLPage(request) {
  return request.headers.get('accept')?.includes('text/html');
}

function isAPICall(url) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url.href)) ||
         url.pathname.startsWith('/api/');
}

function isImage(url) {
  return IMAGE_EXTENSIONS.test(url.pathname);
}

// Offline HTML fallback
function getOfflineHTML() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tepa Solutions - Offline</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          margin: 0;
          padding: 2rem;
          text-align: center;
          background: #f8f9fa;
          color: #333;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .logo {
          width: 64px;
          height: 64px;
          background: #030213;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
        }
        .dots {
          display: flex;
          gap: 4px;
        }
        .dot {
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #030213;
        }
        p {
          font-size: 1.1rem;
          color: #666;
          max-width: 400px;
          line-height: 1.6;
        }
        .retry-btn {
          background: #030213;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 2rem;
          transition: background 0.2s;
        }
        .retry-btn:hover {
          background: #1a1a2e;
        }
      </style>
    </head>
    <body>
      <div class="logo">
        <div class="dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
      <h1>You're Offline</h1>
      <p>It looks like you've lost your internet connection. Don't worry, you can still browse some of our cached content.</p>
      <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
      
      <script>
        // Auto-retry when back online
        window.addEventListener('online', () => {
          window.location.reload();
        });
        
        // Check connection status
        if (navigator.onLine) {
          setTimeout(() => window.location.reload(), 1000);
        }
      </script>
    </body>
    </html>
  `;
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  }
});

async function syncContactForms() {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const pendingForms = await cache.match('/pending-forms');
  
  if (pendingForms) {
    const forms = await pendingForms.json();
    
    for (const form of forms) {
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        console.log('Synced form submission:', form.id);
      } catch (error) {
        console.log('Failed to sync form:', error);
      }
    }
    
    // Clear pending forms
    await cache.delete('/pending-forms');
  }
}

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: event.data?.text() || 'New update from Tepa Solutions',
    icon: '/images/icon-192.png',
    badge: '/images/badge.png',
    tag: 'tepa-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/images/view-icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/close-icon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Tepa Solutions', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('https://tepasolutions.com')
    );
  }
});

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CACHE_PERFORMANCE') {
    // Log cache performance data
    console.log('Cache performance:', event.data.metrics);
  }
});

console.log('Tepa Solutions Service Worker loaded successfully');