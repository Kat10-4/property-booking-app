import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue(), vueJsx(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      open: true,
      proxy: {
        '/v1': {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          secure: false,
          // Добавим логгирование для отладки
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log(
                '🔄 PROXY WORKS',
                req.method,
                req.url,
                '->',
                `${env.VITE_APP_BASE_URL}${req.url}`,
              )
            })
            proxy.on('error', (err, req, res) => {
              console.log('❌ PROXY ERROR:', err)
            })
          },
        },
      },
    },
  }
})
