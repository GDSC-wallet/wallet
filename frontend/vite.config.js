import path from "path"
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import pwaConfig from "./pwa.config"
import vue from '@vitejs/plugin-vue2'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // Vuetify
        VuetifyResolver(),
      ],
    }),
    VitePWA(pwaConfig)
  ],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: "\n@import '@/scss/variables.scss'\n@import '@/scss/style.scss'\n",
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '^/oauth': {
        target: 'http://localhost:59001',
        changeOrigin: true,
      },
      '^/api': {
        target: 'http://localhost:59001',
        changeOrigin: true,
      },
    }
  }
})
