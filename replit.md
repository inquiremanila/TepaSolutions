# Tepa Solutions - React + Vite Project

## Overview
This is a React + TypeScript application for Tepa Solutions website, built with Vite as the build tool. It's a multi-page website with custom routing, showcasing the company's digital transformation services.

## Recent Changes (September 13, 2025)
- ✅ Successfully imported project from GitHub
- ✅ Verified all dependencies are properly installed
- ✅ Confirmed Vite configuration for Replit environment (host: 0.0.0.0:5000, allowedHosts: true)
- ✅ Set up development workflow on port 5000 with webview output
- ✅ Configured deployment settings for autoscale production deployment
- ✅ Application building and running successfully
- ✅ All development and production configurations verified and working
- ✅ **COMPLETED: Comprehensive SEO Implementation**
  - ✅ Server-side bot detection with production middleware (server.js)
  - ✅ Prerendered HTML files for all 29+ routes (static & dynamic)
  - ✅ Comprehensive sitemap.xml with canonical URLs
  - ✅ Bots receive SEO-optimized HTML, humans get React SPA
  - ✅ Working bot detection confirmed in logs: "🤖 Bot detected: Googlebot/2.1..."

## Project Architecture
- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Radix UI + Custom components
- **Styling**: CSS with custom styling system
- **Routing**: Custom SPA routing implementation
- **Build System**: Vite (outputs to `build/` directory)
- **Package Manager**: npm

## Development
- **Port**: 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 (allows proxy access)
- **Development Command**: `npm run dev`
- **Build Command**: `npm run build`

## Key Dependencies
- React 18.3.1 + React DOM
- Vite 6.3.5 + React SWC plugin
- Radix UI components
- TypeScript support
- Various utility libraries (clsx, lucide-react, etc.)

## Deployment
- **Target**: Autoscale (for static website)
- **Build**: npm run build
- **Serve**: serve -s build -l 5000 (SPA fallback enabled)
- **Production Command**: npm start
- **Build Output**: `build/` directory

## SEO Implementation
- **Bot Detection**: Server-side middleware detects search engine bots (Googlebot, Bingbot, etc.)
- **Dual Content Delivery**: Bots receive prerendered HTML, humans get interactive React SPA
- **Prerendered Files**: 29+ static HTML files in `build/SEO/` directory with full metadata
- **Dynamic Routes**: Support for `/articles/*`, `/events/*`, `/careers/*`, `/business-automation/*`
- **Sitemap**: Complete sitemap.xml with all routes and proper canonical URLs
- **Maintenance**: Run `node scripts/generate-seo-files-standalone.cjs` to update SEO files

## Notes
- The project uses a custom router implementation instead of React Router
- Multiple page components for different service offerings
- Extensive use of Radix UI components for accessibility
- Configured for production deployment on Replit's infrastructure
- Production server (server.js) handles bot detection and SEO content delivery