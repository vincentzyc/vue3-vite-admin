/// <reference types="vitest" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import externalGlobals from 'rollup-plugin-external-globals';
import { createHtmlPlugin } from 'vite-plugin-html';

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 5100,
    proxy: {
      '/api': 'http://test-cms-admin.jetmobo.com',
    },
  },
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue'],
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: isProduction
          ? {
              injectCss: `<link rel="stylesheet" href="https://cdn.lipush.com/other/css/element-plus@2.2.32.css">`,
              injectScript: `<script src="https://cdn.lipush.com/other/js/vue@3.2.47vue-router@4.1.6pinia@2.0.33.js"></script>
          <script src="https://cdn.lipush.com/other/js/element-plus@2.2.32.js"></script>
          <script src="https://cdn.lipush.com/other/js/axios@1.3.3.js"></script>
          `,
            }
          : {
              injectCss: '',
              injectScript: '',
            },
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: ['vue', 'pinia', 'vue-router', 'element-plus', 'axios', 'vue-demi'],
      plugins: [
        externalGlobals({
          vue: 'Vue',
          pinia: 'Pinia',
          'vue-router': 'VueRouter',
          'element-plus': 'ElementPlus',
          axios: 'axios',
          'vue-demi': 'VueDemi',
        }),
      ],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
