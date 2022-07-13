import path from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
