import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'frontend/dist',  // This ensures the build files go into the dist folder
    chunkSizeWarningLimit: 1000, // Set the chunk size limit to 1000 KB
  },
})
