# Tepa Solutions - React + Vite Project

## Overview
This is a React + TypeScript application for Tepa Solutions website, built with Vite as the build tool. It's a multi-page website with custom routing, showcasing the company's digital transformation services.

## Recent Changes (September 17, 2025)
- ✅ **PROJECT IMPORT COMPLETED**: Successfully set up GitHub import in Replit environment
- ✅ Dependencies installed and verified (React 18, Vite 6.3.5, TypeScript, Radix UI)
- ✅ Development server running on port 5000 with proper host configuration (0.0.0.0)
- ✅ Vite configuration verified for Replit environment (allowedHosts: true)
- ✅ Build system tested and working (generates 42 static pages + SPA)
- ✅ Development workflow configured and running successfully
- ✅ Deployment configuration set up for autoscale production deployment
- ✅ All frontend configurations working correctly for Replit proxy environment  
- ✅ **COMPLETED: Comprehensive SEO Implementation**  
  - ✅ Prerendered HTML files for all 29+ routes (static & dynamic)  
  - ✅ Comprehensive sitemap.xml with canonical URLs  
  - ✅ Bots receive SEO-optimized HTML, humans get React SPA  
  - ✅ Verified prerendered pages served correctly from `dist/`  
- ✅ **RESOLVED: Google Search Console Indexing Issues**  
  - ✅ Fixed caching headers and SEO metadata  
  - ✅ Removed conflicting Cloudflare Worker code  
  - ✅ Fixed URL mapping for `/about` and `/contact` routes  
  - ✅ Verified all prerendered responses include correct `<head>` metadata  
- ✅ **CREATED: Comprehensive Documentation Guides**  
  - ✅ SEO Content Management Guide (`src/guides/SEO_CONTENT_MANAGEMENT_GUIDE.md`)  
  - ✅ Forms Configuration Guide (`src/guides/FORMS_CONFIGURATION_GUIDE.md`)  
- ✅ **COMPLETED: Major SEO Infrastructure Restructuring**  
  - ✅ Moved all SEO HTML files into `dist/` root directory  
  - ✅ SPA entry remains `index.html` at project root  
  - ✅ Enhanced fallback handling for non-SEO routes  
  - ✅ HEAD request support confirmed for crawler compatibility  
  - ✅ Production-ready deployment with zero SEO 404s  

## Project Architecture
- **Frontend**: React 18 + TypeScript + Vite  
- **UI Components**: Radix UI + Custom components  
- **Styling**: CSS with custom styling system  
- **Routing**: Custom SPA routing implementation  
- **Build System**: Vite (outputs to `dist/` directory)  
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
- **Build**: `npm run build`  
- **Serve**: `serve -s dist -l 5000` (SPA fallback enabled)  
- **Production Command**: `npm start`  
- **Build Output**: `dist/` directory (`index.html` for SPA + SEO HTML files at root level)  

## SEO Implementation  

- **Production Architecture**: Static hosting (e.g., Cloudflare Pages, Netlify, Vercel) directly serves prerendered HTML for SEO routes and the SPA bundle for user navigation.  
- **Dual Content Delivery**:  
  - **Bots / Crawlers** → Served prerendered `.html` files from `dist/`.  
  - **Humans** → Load `index.html` (SPA entry), handled by custom router.  
- **Prerendered Files**: 29+ static HTML files generated in `dist/` during build with full metadata and Open Graph tags.  
- **Dynamic Routes**: Fully prerendered support for:  
  - `/articles/*`  
  - `/events/*`  
  - `/careers/*`  
  - `/business-automation/*`  
- **Fallback Handling**: SPA router gracefully handles non-SEO routes; bots always resolve to correct prerendered file.  
- **HEAD Support**: Prerendered files respond correctly to `HEAD` requests (static hosting default).  
- **Pretty URLs**: User-friendly paths (e.g., `/articles/iphone-17`) map directly to `dist/articles/iphone-17/index.html`.  
- **Sitemap**: `sitemap.xml` includes all prerendered routes with canonical URLs for indexing.  
- **Maintenance**: Run `npm run build:ssg` (using `vite-plugin-ssg`) to regenerate static SEO files in proper `dist/` structure.  
- **Production Ready**: Deployed on CDN/edge hosting, optimized for fast bot crawling and smooth SPA navigation for users.  

## Documentation Guides
- **SEO Management**: Complete guide for updating content, regenerating SEO files, and deployment  
- **Forms Configuration**: Comprehensive guide for modifying forms, validation, and backend integration  
- **Located at**: `src/guides/` directory with detailed instructions for future maintenance  

## Tepabot AI CHAT
- **Uses Open Router**: As the brain of the chat and acts as a 24/7 customer service rep. 
- **ENV Open Router**: the key is in .ENV Stil deploying to cloudflare for production.
-**Uses Model** deepseek/deepseek-chat-v3.1:free or openai/gpt-oss-120b:free
-**ENSURE THAT THIS IS ALWAYS WORKING**

##IMPORTANT
Do not change layout
forms are always working to supabase
and chat always works as intended
always write with clean code and avoid duplication

Files: TepaSolutions\src\supabase\chat-api.ts
TepaSolutions\src\supabase\functions\ai-chat\index.ts
TepaSolutions\src\services\openrouter.ts
TepaSolutions\src\components\Tepabot.tsx
TepaSolutions\deno.json
TepaSolutions\.env