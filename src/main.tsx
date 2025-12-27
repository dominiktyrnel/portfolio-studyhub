import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'
import './styles/utils.css'
import { initSentry } from './lib/errorTracking'
import { logger } from './utils/logger';

// Initialize Sentry Error Tracking
// To enable: Set VITE_SENTRY_DSN environment variable
// Get DSN from https://sentry.io/
initSentry(
  import.meta.env.VITE_SENTRY_DSN || 'YOUR_SENTRY_DSN_HERE',
  import.meta.env.MODE || 'production'
);

try {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} catch (e) {
  logger.error(e instanceof Error ? e : new Error(String(e)));
  document.body.innerHTML = '<h1 style="color:red; padding: 20px;">Critical Error: App failed to mount.</h1>';
}

// Professional Service Worker Registration
// Provides offline support for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        logger.info('[SW] Service Worker registered:', registration.scope);

        // Check for updates when user returns to tab (prevents memory leak)
        // More efficient than setInterval - only checks when tab is visible
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            registration.update();
          }
        });

        // Initial update check
        registration.update();
      })
      .catch((error) => {
        logger.warn('[SW] Service Worker registration failed:', error);
      });
  });

  // Handle service worker updates
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    logger.info('[SW] New service worker activated, reloading...');
    window.location.reload();
  });
}
