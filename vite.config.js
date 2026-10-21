import { defineConfig } from 'vite';
import { htmlPartials } from './vite.partials.js';

export default defineConfig({
  plugins: [htmlPartials()],
  server: {
    port: 5173,
    open: false,
    host: true
  },
  css: {
    devSourcemap: true
  }
});
