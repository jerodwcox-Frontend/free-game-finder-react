import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // "/" (not "./") so the CSS and JS load correctly on nested pages
  // like /games/540.
  base: '/',
  plugins: [react()],
  // When running locally with "npm run dev", forward /api/... to FreeToGame
  // (the same thing vercel.json does on the live site).
  server: {
    proxy: {
      '/api': {
        target: 'https://www.freetogame.com',
        changeOrigin: true,
      },
    },
  },
})
