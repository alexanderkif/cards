import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import { icons } from './vite.config.icons'

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
        // icons: [ 
        //   {  
        //       src: '/assets/favicon/android-chrome-96x96.png',  
        //       sizes: '96x96',  
        //       type : 'image/png'  
        //   }, 
        //   {  
        //       src: '/assets/favicon/android-chrome-192x192.png',  
        //       sizes: '192x192',  
        //       type : 'image/png'  
        //   }, 
        //   {  
        //       src: '/assets/favicon/android-chrome-512x512.png',  
        //       sizes: '512x512',  
        //       type: 'image/png', 
        //       purpose: 'any' 
        //   }, 
        // ],
        theme_color: '#ffffff',  
        background_color: '#ffffff',  
        // display: 'standalone'  
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
    })
  ],
})
