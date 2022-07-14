import path from "path"
import { defineConfig } from 'vite'
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
  ],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: "\n@import '@/sass/variables.scss'\n",
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
