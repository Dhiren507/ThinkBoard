import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    // Optimize production build
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      },
    },
    sourcemap: false, // Disable sourcemaps in production
    chunkSizeWarningLimit: 1000, // Increase size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          // Group React dependencies together
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  },
  // Improve dev experience
  server: {
    open: true, // Automatically open browser on dev server start
  }
})
