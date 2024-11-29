import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // Change this to use relative paths
  plugins: [react()],
  assetsInclude: ['**/*.pdf']
})