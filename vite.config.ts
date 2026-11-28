import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      're2js': path.resolve(import.meta.dirname, 'src/shims/re2js.js')
    }
  },
  assetsInclude: ['**/*.PNG', '**/*.png'],
  server: {
    port: 3000,
    host: true
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    esbuild: {
      drop: ['console', 'debugger']
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router')
          ) {
            return 'vendor';
          }
          if (
            id.includes('node_modules/gsap/') ||
            id.includes('node_modules/lenis/')
          ) {
            return 'animation';
          }
        }
      }
    }
  }
});
