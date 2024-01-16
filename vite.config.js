/* global process */

import { defineConfig, loadEnv } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      basicSsl()
    ],
    base: '/iotum-samples/',
    server: {
      host: env.HOST,
      port: env.PORT,
      https: {},
      headers: {
        "cache-control": "no-cache",
        "x-content-type-options": "nosniff",
      }
    },
  }
})