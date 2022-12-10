import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // 默认关闭
      reactivityTransform: true
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "*": resolve("")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/style.scss";`
      }
    }
  }
})
