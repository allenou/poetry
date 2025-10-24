import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import transformerDirective from "@unocss/transformer-directives";
import { presetAttributify, presetIcons } from 'unocss'
import { presetWind3 } from '@unocss/preset-wind3'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'docs',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'utils': ['axios'],
        }
      }
    }
  },
  plugins: [
    vue(),
    Components({ /* options */ }),
    Unocss({
      presets: [
        presetWind3({
          dark: 'class',
        }),
        presetAttributify(),
        presetIcons({
          cdn: 'https://esm.sh/',
          scale: 1.2,
          warn: true,
          collections: {
            carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
          },
        })
      ],
      transformers: [transformerDirective()],
      theme: {
        colors: {
          primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          }
        }
      },
      rules: [
        [/^text-(.*)$/, ([, c]) => ({ color: c })],
      ],
      shortcuts: {
        'flex-center': 'flex items-center justify-center',
        'flex-col-center': 'flex flex-col items-center justify-center',
      },
    }),
    AutoImport({
      imports: ['vue',
        'vue-router',]
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    }
  },
  server: {
    port: 5173,
    open: true,
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'cross-origin',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'axios']
  }
})
