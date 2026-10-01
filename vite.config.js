import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  // When running locally with "npm run dev", forward /api/games to FreeToGame
  // (the same thing vercel.json does on the live site).
  server: {
    proxy: {
      '/api/games': {
        target: 'https://www.freetogame.com',
        changeOrigin: true,
      },
    },
  },
})
