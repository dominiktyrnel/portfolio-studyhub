import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Plugin to inject build timestamp
function injectBuildTimestamp(): Plugin {
  return {
    name: 'inject-build-timestamp',
    transformIndexHtml(html: string): string {
      return html.replace('__BUILD_TIMESTAMP__', Date.now().toString());
    }
  };
}

export default defineConfig({
  plugins: [react(), injectBuildTimestamp()],
  server: {
    port: 5173,
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 600, // Adjusted for large Firebase bundle
    rollupOptions: {
      output: {
        manualChunks: {
          // React core - cache separately
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // Firebase - large dependency, separate chunk
          'firebase': [
            'firebase/app',
            'firebase/auth',
            'firebase/firestore',
            'firebase/storage',
            'firebase/analytics'
          ],

          // Lucide icons - separate chunk
          'lucide': ['lucide-react']

          // Note: Admin and Study pages are already lazy-loaded via React.lazy()
          // No need for manual chunks - Vite creates optimal chunks automatically
        },
      },
    },
  },
});
