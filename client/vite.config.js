import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      // Enable polling for tailwind config updates
      usePolling: true,
    },
  },
})
