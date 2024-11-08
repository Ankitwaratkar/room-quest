import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'frontend/src', // Set the root to 'src' inside the frontend folder
  plugins: [react()],
  build: {
    outDir: 'frontend/dist',  // This ensures the build files go into the dist folder
  },
})
