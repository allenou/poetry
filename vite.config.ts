import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import transformerDirective from "@unocss/transformer-directives";
import { presetAttributify, presetUno, presetIcons } from 'unocss'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

export default defineConfig({
  build: {
    outDir: 'docs'
  },
  plugins: [
    vue(),
    Components({ /* options */ }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(
          { cdn: 'https://esm.sh/' }
        )],
      transformers: [transformerDirective()],
    }),
    AutoImport({
      imports: ['vue',
        'vue-router',]
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
