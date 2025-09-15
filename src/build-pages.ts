// Multi-page build script for static site generation
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";


// Define all routes that need individual HTML files
const routes = [
  { path: '/', file: 'index.html' },
  { path: '/business-automation', file: 'business-automation.html' },
  { path: '/mobile-app-development', file: 'mobile-app-development.html' },
  { path: '/web-application-development', file: 'web-application-development.html' },
  { path: '/website-development', file: 'website-development.html' },
  { path: '/seo-services', file: 'seo-services.html' },
  
  // Automation sub-pages
  { path: '/business-automation/sales-process-automation', file: 'business-automation/sales-process-automation.html' },
  { path: '/business-automation/marketing-automation', file: 'business-automation/marketing-automation.html' },
  { path: '/business-automation/customer-support-automation', file: 'business-automation/customer-support-automation.html' },
  { path: '/business-automation/hr-automation', file: 'business-automation/hr-automation.html' },
  { path: '/business-automation/finance-automation', file: 'business-automation/finance-automation.html' },
  { path: '/business-automation/inventory-management-automation', file: 'business-automation/inventory-management-automation.html' },
  
  // Company pages
  { path: '/learn-about-tepa', file: 'learn-about-tepa.html' },
  { path: '/careers', file: 'careers.html' },
  { path: '/events', file: 'events.html' },
  { path: '/articles', file: 'articles.html' },
  { path: '/investors', file: 'investors.html' },
  { path: '/who-we-serve', file: 'who-we-serve.html' },
  
  // Contact pages
  { path: '/contact-us/sales', file: 'contact-us/sales.html' },
  { path: '/contact-us/support', file: 'contact-us/support.html' },
  { path: '/contact-us/volunteer', file: 'contact-us/volunteer.html' },
  { path: '/contact-us/event-hosting', file: 'contact-us/event-hosting.html' },
  { path: '/contact-us/investors', file: 'contact-us/investors.html' },
  
  // Sample article and event pages
  { path: '/articles/how-ai-is-transforming-workforce-in-2025', file: 'articles/how-ai-is-transforming-workforce-in-2025.html' },
  { path: '/events/introduction-to-how-to-make-a-roblox-game', file: 'events/introduction-to-how-to-make-a-roblox-game.html' },
  
  // Sample career page
  { path: '/careers/frontend-developer-1', file: 'careers/frontend-developer-1.html' }
];

// Base HTML template that loads the React app with proper routing
function generateHTMLTemplate(route: { path: string; file: string }): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? 'https://tepasolutions.asia' : 'http://localhost:5173';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
  
  <!-- Preconnect to external domains for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- PWA manifest -->
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#030213">
  
  <!-- Apple PWA meta tags -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Tepa Solutions">
  
  <!-- Microsoft PWA meta tags -->
  <meta name="msapplication-TileColor" content="#030213">
  <meta name="msapplication-config" content="/browserconfig.xml">
  
  <!-- Robots meta tag for crawling -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1">
  
  <!-- Geographic meta tags -->
  <meta name="geo.region" content="PH">
  <meta name="geo.country" content="Philippines">
  <meta name="geo.placename" content="Philippines">
  
  <!-- Language and locale -->
  <meta http-equiv="content-language" content="en">
  <meta name="language" content="English">
  
  <!-- Canonical URL - will be updated by React -->
  <link rel="canonical" href="${baseUrl}${route.path}">
  
  <!-- DNS prefetch for performance -->
  <link rel="dns-prefetch" href="//tepasolutions.asia">
  <link rel="dns-prefetch" href="//www.google-analytics.com">
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  
  <!-- Initial page route for React router -->
  <script>
    window.__INITIAL_ROUTE__ = '${route.path}';
  </script>
  
  <!-- Critical CSS will be injected here by Vite -->
  <style>
    /* Critical above-the-fold styles */
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', system-ui, sans-serif;
      line-height: 1.6;
      background-color: #ffffff;
      color: #1a1a1a;
    }
    
    /* Loading state */
    .loading-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f3f4f6;
      border-top: 3px solid #030213;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Hide loading when React loads */
    .app-loaded .loading-container {
      display: none;
    }
  </style>
</head>
<body>
  <div id="root">
    <!-- Loading state shown while React app loads -->
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  </div>
  
  <!-- React app entry point -->
  <script type="module" src="/src/main.tsx"></script>
  
  <!-- Service Worker registration -->
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  </script>
  
  <!-- Analytics placeholder -->
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>
</body>
</html>`;
}

// Create all HTML files in the root directory (not dist)
function buildPages() {
  console.log('🚀 Building multi-page static site structure...');
  
  routes.forEach(route => {
    const htmlContent = generateHTMLTemplate(route);
    const filePath = route.file;
    const fileDir = dirname(filePath);
    
    // Create directory if it doesn't exist
    if (fileDir !== '.' && !existsSync(fileDir)) {
      mkdirSync(fileDir, { recursive: true });
    }
    
    // Write HTML file
    writeFileSync(filePath, htmlContent, 'utf8');
    console.log(`✅ Generated: ${route.file} for ${route.path}`);
  });
  
  console.log('🎉 Multi-page build structure complete!');
  console.log(`📄 Generated ${routes.length} HTML pages`);
  console.log('🔍 Each page is now crawlable by search engines');
  console.log('');
  console.log('Next steps:');
  console.log('1. Run "npm run build" to build the React app');
  console.log('2. Run "npm run deploy" to deploy to Cloudflare Pages');
}

function getChangeFreq(path: string): string {
  if (path === '/') return 'weekly';
  if (path.includes('/articles/') || path.includes('/events/')) return 'monthly';
  if (path.includes('/careers/')) return 'weekly';
  if (path.includes('/contact-us/')) return 'monthly';
  return 'monthly';
}

function getPriority(path: string): string {
  if (path === '/') return '1.0';
  if (path.includes('/business-automation') || path.includes('/mobile-app') || path.includes('/web-application')) return '0.9';
  if (path.includes('/contact-us/sales')) return '0.8';
  if (path.includes('/learn-about-tepa') || path.includes('/careers')) return '0.8';
  if (path.includes('/articles/') || path.includes('/events/')) return '0.7';
  return '0.7';
}

// Run the build
if (process.argv[1] && basename(fileURLToPath(import.meta.url)) === basename(process.argv[1])) {
  buildPages();
}

export { buildPages, routes };