import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import { icons } from './vite.config.icons'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      // includeAssets: ['**/*.{png}'],
      manifest: {
        name: 'Cards',
        short_name: 'Cards',
        icons,
        theme_color: '#000000',
        background_color: '#000000',
        display: 'fullscreen'
      },
      // workbox: {
      //   cleanupOutdatedCaches: true,
      //   globPatterns: ['**/*.{js,css,html,ico,jpg,json,png,txt,svg}'],
      //   runtimeCaching: [
      //     {
      //       urlPattern: ({ url }) => url.pathname.startsWith('/api'),
      //       handler: 'NetworkFirst',
      //       options: {
      //         cacheName: 'api-cache',
      //         cacheableResponse: { statuses: [0, 200] }
      //       }
      //     }
      //   ]
      // }
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
