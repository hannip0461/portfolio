import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const proxyTarget = process.env.VITE_NEO_API_PROXY_TARGET ?? 'http://127.0.0.1:8011'

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [vue()],
  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: proxyTarget,
        changeOrigin: true,
      },
      '/health': {
        target: proxyTarget,
        changeOrigin: true,
      },
    },
  },
})
