import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '130d5fb6-1830-407a-82fc-4e5de5f90992-00-1givl4pcp0vmf.janeway.replit.dev'
    ]
  }
})