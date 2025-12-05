import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // Use relative paths for assets
  build: {
    outDir: 'dist', // Output build to /dist for gh-pages
  },
  plugins: [react()],
  assetsInclude: ['**/*.pdf']
})