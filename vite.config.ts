
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/', // Use absolute paths for domain-root deployment
  resolve: {
    alias: [
      { find: /(@radix-ui\/.+)@\d+\.\d+\.\d+$/, replacement: '$1' },
      { find: /(^[^:\/]+(?:\/[\w.-]+)*)@\d+\.\d+\.\d+$/, replacement: '$1' },
      { find: 'class-variance-authority@0.7.1', replacement: 'class-variance-authority' },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  },
  publicDir: 'public',
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true,
  },
});