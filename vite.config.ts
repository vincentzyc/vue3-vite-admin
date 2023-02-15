import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 3100
  },
  plugins: [vue({
    reactivityTransform: true
  })],
  resolve: {
    alias: {
      "@": "/src"
    }
  }
})
