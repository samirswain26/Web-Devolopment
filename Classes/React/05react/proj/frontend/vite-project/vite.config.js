import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users" : {
        target: "http://127.0.0.1:3000/api/v1",
        changeOrigin: true
      }
    }
  }
})
