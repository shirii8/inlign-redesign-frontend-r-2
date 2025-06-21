import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   build: {
    chunkSizeWarningLimit: 1000 // (in kB)
  },
  plugins: [react()],
})
