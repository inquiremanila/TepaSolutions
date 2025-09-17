// Enhanced multi-page build script with comprehensive SEO
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { generateSEOData, generateMetaTags, getSitemapData } from './seo-generator';

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
  { path: '/volunteer-with-us', file: 'volunteer-with-us.html' },
  
  // Contact pages
  { path: '/contact/sales', file: 'contact/sales.html' },
  { path: '/contact/support', file: 'contact/support.html' },
  { path: '/contact/event-hosting', file: 'contact/event-hosting.html' },
  { path: '/contact/investors', file: 'contact/investors.html' },
  
  // dynamic pages
  { path: '/articles/iphone-17-review-philippines-pricing-release', file: 'articles/iphone-17-review-philippines-pricing-release.html', slug: 'iphone-17-review-philippines-pricing-release' },
  { path: '/articles/quantum-chip-technology-breakthrough-2025', file: 'articles/quantum-chip-technology-breakthrough-2025.html', slug: 'quantum-chip-technology-breakthrough-2025' },
  { path: '/articles/big-tech-news-2025-major-developments', file: 'articles/big-tech-news-2025-major-developments.html', slug: 'big-tech-news-2025-major-developments' },
  { path: '/articles/top-10-ai-video-generation-tools-comparison-2025', file: 'articles/top-10-ai-video-generation-tools-comparison-2025.html', slug: 'top-10-ai-video-generation-tools-comparison-2025' },
  { path: '/events/free-introduction-roblox-game-development', file: 'events/free-introduction-roblox-game-development.html', slug: 'free-introduction-roblox-game-development' },
  { path: '/events/introduction-to-html-and-css', file: 'events/introduction-to-html-and-css.html', slug: 'introduction-to-html-and-css' },
  { path: '/events/introduction-to-website-funnel', file: 'events/introduction-to-website-funnel.html', slug: 'introduction-to-website-funnel' },
  { path: '/careers/intern-frontend-developer', file: 'careers/intern-frontend-developer.html', slug: 'intern-frontend-developer' },
  { path: '/careers/intern-backend-developer', file: 'careers/intern-backend-developer.html', slug: 'intern-backend-developer' },
  { path: '/careers/intern-article-writer', file: 'careers/intern-article-writer.html', slug: 'intern-article-writer' },
  { path: '/careers/intern-seo-specialist', file: 'careers/intern-seo-specialist.html', slug: 'intern-seo-specialist' },
  { path: '/careers/intern-admin-assistant', file: 'careers/intern-admin-assistant.html', slug: 'intern-admin-assistant' },
  { path: '/careers/intern-business-development', file: 'careers/intern-business-development.html', slug: 'intern-business-development' },
  { path: '/careers/contract-fullstack-developer', file: 'careers/contract-fullstack-developer.html', slug: 'contract-fullstack-developer' },
  { path: '/careers/contract-mobile-app-developer', file: 'careers/contract-mobile-app-developer.html', slug: 'contract-mobile-app-developer' },
  { path: '/careers/contract-android-developer', file: 'careers/contract-android-developer.html', slug: 'contract-android-developer' },
  { path: '/careers/contract-ios-developer', file: 'careers/contract-ios-developer.html', slug: 'contract-ios-developer' },
  { path: '/careers/contract-backend-developer', file: 'careers/contract-backend-developer.html', slug: 'contract-backend-developer' }
];

// Enhanced HTML template with comprehensive SEO
function generateHTMLTemplate(route: { path: string; file: string; slug?: string }): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? 'https://tepasolutions.asia' : 'http://localhost:5173';
  
  // Generate SEO data for this route
  const seoData = generateSEOData(route.path, route.slug);
  const metaTags = generateMetaTags(seoData);
  
  return `<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
  
  ${metaTags}
  
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
  
  <!-- Additional SEO meta tags -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1">
  
  <!-- Geographic meta tags -->
  <meta name="geo.region" content="PH">
  <meta name="geo.country" content="Philippines">
  <meta name="geo.placename" content="Philippines">
  
  <!-- Language and locale -->
  <meta http-equiv="content-language" content="en">
  <meta name="language" content="English">
  
  <!-- DNS prefetch for performance -->
  <link rel="dns-prefetch" href="//tepasolutions.asia">
  <link rel="dns-prefetch" href="//www.google-analytics.com">
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  
  <!-- Preload critical resources -->
  <link rel="preload" href="/src/main.tsx" as="script">
  
  <!-- Initial page route for React router -->
  <script>
    window.__INITIAL_ROUTE__ = '${route.path}';
    window.__SEO_DATA__ = ${JSON.stringify(seoData)};
  </script>
  
  <!-- Critical CSS -->
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
    
    /* SEO-friendly content preview */
    .seo-content {
      position: absolute;
      left: -9999px;
      top: -9999px;
    }
  </style>
</head>
<body>
  <div id="root">
    <!-- Loading state shown while React app loads -->
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
    
    <!-- SEO-friendly content preview for crawlers -->
    <div class="seo-content">
      <h1>${seoData.title}</h1>
      <p>${seoData.description}</p>
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

// Generate XML sitemap
function generateSitemap(): string {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://tepasolutions.asia' : 'http://localhost:5173';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = routes.map(route => {
    const { priority, changefreq } = getSitemapData(route.path);
    return `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;
}

// Generate robots.txt
function generateRobotsTxt(): string {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://tepasolutions.asia' : 'http://localhost:5173';
  
  return `User-agent: *
Allow: /

# Important pages for crawling
Allow: /business-automation
Allow: /mobile-app-development
Allow: /web-application-development
Allow: /articles/
Allow: /events/
Allow: /careers/

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1`;
}

// Main build function
function buildPages() {
  console.log('🚀 Building enhanced multi-page static site with SEO...');
  
  // Ensure dist directory exists
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true });
  }
  
  // Generate HTML pages
  routes.forEach(route => {
    const htmlContent = generateHTMLTemplate(route);
    const filePath = join('dist', route.file);
    const fileDir = dirname(filePath);
    
    // Create directory if it doesn't exist
    if (fileDir !== 'dist' && !existsSync(fileDir)) {
      mkdirSync(fileDir, { recursive: true });
    }
    
    // Write HTML file
    writeFileSync(filePath, htmlContent, 'utf8');
    console.log(`✅ Generated: ${route.file} for ${route.path}`);
  });
  
  // Generate sitemap.xml
  const sitemapContent = generateSitemap();
  writeFileSync(join('dist', 'sitemap.xml'), sitemapContent, 'utf8');
  console.log('✅ Generated: sitemap.xml');
  
  // Generate robots.txt
  const robotsContent = generateRobotsTxt();
  writeFileSync(join('dist', 'robots.txt'), robotsContent, 'utf8');
  console.log('✅ Generated: robots.txt');
  
  console.log('🎉 Enhanced multi-page build with SEO complete!');
  console.log(`📄 Generated ${routes.length} HTML pages with comprehensive SEO`);
  console.log('🔍 Each page is fully optimized for search engines');
  console.log('🗺️  XML sitemap generated for better crawling');
  console.log('🤖 Robots.txt configured for optimal indexing');
  console.log('');
  console.log('SEO Features Included:');
  console.log('• Comprehensive meta tags (title, description, keywords)');
  console.log('• Open Graph tags for social media sharing');
  console.log('• Twitter Card optimization');
  console.log('• JSON-LD structured data');
  console.log('• Canonical URLs and proper robots directives');
  console.log('• XML sitemap with priorities and change frequencies');
  console.log('');
  console.log('Next steps:');
  console.log('1. Run "npm run build" to build the React app');
  console.log('2. Run "npm run deploy" to deploy to Cloudflare Pages');
}

// Run the build
if (process.argv[1] && basename(fileURLToPath(import.meta.url)) === basename(process.argv[1])) {
  buildPages();
}

export { buildPages, routes };