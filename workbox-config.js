module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{html,js,css,png,jpg,jpeg,svg,webp,json}'
  ],
  swDest: 'dist/sw.js',
  runtimeCaching: [{
    urlPattern: ({ request }) => request.destination === 'image',
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'images-cache',
    }
  }]
};
