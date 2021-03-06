import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import { join } from 'path'

export default defineConfig(async ({ command }) => {
  return {
    plugins: [
      WindiCSS({
        preflight: false,
        scan: {
          dirs: [
            __dirname,
            join(__dirname, '.vitepress', 'theme'),
            join(__dirname, '.vitepress', 'theme', 'components')
          ]
        }
      })
    ],

    optimizeDeps: {
      include: [
        'vue'
      ]
    }
  }
})
