import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Log environment variables for debugging
  console.log('🔧 Vite Config - Mode:', mode)
  console.log('🔧 Vite Config - Environment variables:')
  console.log('🔧 VITE_APP_BASE_URL:', env.VITE_APP_BASE_URL || '❌ Not set')
  console.log('🔧 VITE_APP_CLIENT_ID:', env.VITE_APP_CLIENT_ID ? '✅ Set' : '❌ Missing')
  console.log('🔧 VITE_APP_CLIENT_SECRET:', env.VITE_APP_CLIENT_SECRET ? '✅ Set' : '❌ Missing')

  return {
    plugins: [vue(), vueJsx(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
