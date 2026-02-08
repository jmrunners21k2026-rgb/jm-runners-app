
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Essencial para o GitHub Pages
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist'
  }
});