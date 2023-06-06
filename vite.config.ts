import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts';
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "vue-i18n"],
      dts: "src/auto-import.d.ts",
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue', 'tsx'],
      dts: 'src/components.d.ts'
    }),
    Pages(),
    Layouts(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://beautydemo.uniqm.com/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/api/, '')
      },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    }
  }
})
