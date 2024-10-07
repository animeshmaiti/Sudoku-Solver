import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/matrix': {
        target: 'http://localhost:8080',  // Your backend server URL
        changeOrigin: true,
        secure: false,   // Disable SSL verification if using HTTP
        rewrite: (path) => path.replace(/^\/matrix/, '/matrix'),
      },
    },
  },
});
