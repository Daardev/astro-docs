import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Para GitHub Pages: cambia 'astro-docs' por el nombre de tu repositorio
  // Si usas un dominio personalizado o el repo se llama username.github.io, usa base: '/'
  base: process.env.NODE_ENV === 'production' ? '/astro-docs/' : '/',
  root: resolve(__dirname, '..'),
  configFile: resolve(__dirname, 'vite.config.js'),
  css: {
    postcss: resolve(__dirname, 'postcss.config.cjs')
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
