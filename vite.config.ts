
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
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
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true,
  },
});