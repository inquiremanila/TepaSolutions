import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configure for multi-page build
  build: {
    rollupOptions: {
      input: {
        // Main pages
        main: resolve(__dirname, 'index.html'),
        'business-automation': resolve(__dirname, 'business-automation/index.html'),
        'mobile-app-development': resolve(__dirname, 'mobile-app-development/index.html'),
        'web-application-development': resolve(__dirname, 'web-application-development/index.html'),
        'website-development': resolve(__dirname, 'website-development/index.html'),
        'seo-services': resolve(__dirname, 'seo-services/index.html'),
        
        // Automation sub-pages
        'business-automation-sales': resolve(__dirname, 'business-automation/sales-process-automation/index.html'),
        'business-automation-marketing': resolve(__dirname, 'business-automation/marketing-automation/index.html'),
        'business-automation-support': resolve(__dirname, 'business-automation/customer-support-automation/index.html'),
        'business-automation-hr': resolve(__dirname, 'business-automation/hr-automation/index.html'),
        'business-automation-finance': resolve(__dirname, 'business-automation/finance-automation/index.html'),
        'business-automation-inventory': resolve(__dirname, 'business-automation/inventory-management-automation/index.html'),
        
        // Company pages
        'learn-about-tepa': resolve(__dirname, 'learn-about-tepa/index.html'),
        'careers': resolve(__dirname, 'careers/index.html'),
        'events': resolve(__dirname, 'events/index.html'),
        'articles': resolve(__dirname, 'articles/index.html'),
        'investors': resolve(__dirname, 'investors/index.html'),
        'who-we-serve': resolve(__dirname, 'who-we-serve/index.html'),
        
        // Contact pages
        'contact-sales': resolve(__dirname, 'contact-us/sales/index.html'),
        'contact-support': resolve(__dirname, 'contact-us/support/index.html'),
        'contact-volunteer': resolve(__dirname, 'contact-us/volunteer/index.html'),
        'contact-event-hosting': resolve(__dirname, 'contact-us/event-hosting/index.html'),
        'contact-investors': resolve(__dirname, 'contact-us/investors/index.html'),
      }
    },
    
    // Optimize chunks
    chunkSizeWarningLimit: 1000,
    
    // Source maps for debugging
    sourcemap: false,
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    
    // Asset optimization
    assetsInlineLimit: 4096,
  },
  
  // Development server configuration
  server: {
    port: 5173,
    host: true,
    
    // Handle client-side routing for development
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /^\/business-automation$/, to: '/business-automation/index.html' },
        { from: /^\/mobile-app-development$/, to: '/mobile-app-development/index.html' },
        { from: /^\/web-application-development$/, to: '/web-application-development/index.html' },
        { from: /^\/website-development$/, to: '/website-development/index.html' },
        { from: /^\/seo-services$/, to: '/seo-services/index.html' },
        { from: /^\/business-automation\/.*/, to: '/business-automation/sales-process-automation/index.html' },
        { from: /^\/learn-about-tepa$/, to: '/learn-about-tepa/index.html' },
        { from: /^\/careers.*/, to: '/careers/index.html' },
        { from: /^\/events.*/, to: '/events/index.html' },
        { from: /^\/articles.*/, to: '/articles/index.html' },
        { from: /^\/investors$/, to: '/investors/index.html' },
        { from: /^\/who-we-serve$/, to: '/who-we-serve/index.html' },
        { from: /^\/contact-us\/.*/, to: '/contact-us/sales/index.html' },
      ]
    }
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@components': resolve(__dirname, './components'),
      '@pages': resolve(__dirname, './pages'),
      '@utils': resolve(__dirname, './utils'),
      '@styles': resolve(__dirname, './styles'),
    }
  },
  
  // CSS configuration
  css: {
    devSourcemap: true,
  },
  
  // Preview server configuration (for production testing)
  preview: {
    port: 4173,
    host: true,
    
    // Handle routing for preview
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    }
  },
  
  // Environment variables
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    __VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
  
  // Optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'motion/react',
      'lucide-react'
    ]
  }
});