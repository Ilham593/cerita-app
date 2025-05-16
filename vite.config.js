import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/cerita-app/',
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      srcDir: '.',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png'],
      manifest: {
        name: 'Cerita App',
        short_name: 'Cerita',
        start_url: '/cerita-app/',
        scope: '/cerita-app/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ],
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ff9800',
      },
    }),
  ],
});
