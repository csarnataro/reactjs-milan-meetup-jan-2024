import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [
      inject({
        p5: 'p5'
      }),
      externalizeDepsPlugin()
    ]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      react(),
      inject({
        p5: 'p5'
      })
    ]
  }
})
