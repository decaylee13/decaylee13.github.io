import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // Use relative paths for assets
  build: {
    outDir: 'docs', // Output build to /docs for GitHub Pages
  },
  plugins: [react()],
  assetsInclude: ['**/*.pdf']
})