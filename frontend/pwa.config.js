export default {
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'wallet',
    short_name: 'wallet',
    description: 'wallet',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  },
  workbox: {
    //navigateFallbackDenylist: [new RegExp("/api*"), new RegExp("/oauth*")],
    globPatterns: ['**/*.{js,css,html, png}'],
    runtimeCaching: [
      {
        urlPattern: /https:\/\/fonts\.googleapis\.com\/*/,
        handler: 'CacheFirst',
      },
      {
        urlPattern: /https:\/\/fonts\.gstatic\.com\/*/,
        handler: 'CacheFirst',
      },
      {
        urlPattern: /https:\/\/cdn\.jsdelivr\.net\/*/,
        handler: 'CacheFirst',
      },
      {
        urlPattern: new RegExp("/api*"),
        handler: 'NetworkOnly',
      },
      {
        urlPattern: new RegExp("/oauth*"),
        handler: 'NetworkOnly',
        options: {
          cacheableResponse: {
            statuses: [0, 302]
          }
        }
      },
    ]
  }
}