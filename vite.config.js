import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/astro-docs/',
  plugins: [tailwindcss()],
})
