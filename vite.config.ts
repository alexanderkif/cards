import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { VitePWA } from 'vite-plugin-pwa';
import { icons } from './vite.config.icons.ts';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
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
        display: 'fullscreen',
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
    alias: [
      { find: '@', replacement: path.resolve(import.meta.dirname, 'src') },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5 ships `@import`-based SCSS and deprecated color/math
        // functions. Silence those dependency deprecations until Bootstrap 6.
        quietDeps: true,
        silenceDeprecations: [
          'import',
          'global-builtin',
          'color-functions',
          'if-function',
        ],
      },
    },
  },
});
