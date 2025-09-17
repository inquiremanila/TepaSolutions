// Enhanced multi-page build script with SEO optimization
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { getSEOConfig, generateStructuredData, COMPANY_INFO, type SEOConfig } from './build-page.ts';

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
  
  // Sample dynamic pages (these would be generated dynamically in real app)
  { path: '/articles/how-ai-is-transforming-workforce-in-2025', file: 'articles/how-ai-is-transforming-workforce-in-2025.html' },
  { path: '/events/introduction-to-how-to-make-a-roblox-game', file: 'events/introduction-to-how-to-make-a-roblox-game.html' },
  { path: '/careers/frontend-developer-1', file: 'careers/frontend-developer-1.html' }
];

// Enhanced HTML template with comprehensive SEO
function generateHTMLTemplate(route: { path: string; file: string }): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? COMPANY_INFO.url : 'http://localhost:5173';
  
  // Get SEO configuration for this route
  const seoConfig = getSEOConfig(route.path);
  
  // Generate structured data
  const structuredData = generateStructuredData(seoConfig, route.path);
  
  // Create meta keywords string
  const keywords = seoConfig.keywords.join(', ');
  const areaServing = seoConfig.areaServing.join(', ');
  
  // Generate Open Graph image URL
  const ogImage = seoConfig.image ? `${baseUrl}${seoConfig.image}` : `${baseUrl}/og-default.jpg`;
  
  return `<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Favicon and App Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
  
  <!-- Primary SEO Meta Tags -->
  <title>${seoConfig.title}</title>
  <meta name="title" content="${seoConfig.title}" />
  <meta name="description" content="${seoConfig.description}" />
  <meta name="keywords" content="${keywords}" />
  <meta name="author" content="${seoConfig.author || COMPANY_INFO.name}" />
  
  <!-- Geographic and Service Area Meta Tags -->
  <meta name="geo.region" content="PH" />
  <meta name="geo.country" content="Philippines" />
  <meta name="geo.placename" content="Philippines" />
  <meta name="service-area" content="${areaServing}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${seoConfig.type === 'article' ? 'article' : 'website'}" />
  <meta property="og:site_name" content="${COMPANY_INFO.name}" />
  <meta property="og:title" content="${seoConfig.title}" />
  <meta property="og:description" content="${seoConfig.description}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${seoConfig.title}" />
  <meta property="og:url" content="${baseUrl}${route.path}" />
  <meta property="og:locale" content="en_US" />
  ${seoConfig.publishDate ? `<meta property="article:published_time" content="${seoConfig.publishDate}" />` : ''}
  ${seoConfig.modifiedDate ? `<meta property="article:modified_time" content="${seoConfig.modifiedDate}" />` : ''}
  ${seoConfig.author ? `<meta property="article:author" content="${seoConfig.author}" />` : ''}
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@tepasolutions" />
  <meta name="twitter:creator" content="@tepasolutions" />
  <meta name="twitter:title" content="${seoConfig.title}" />
  <meta name="twitter:description" content="${seoConfig.description}" />
  <meta name="twitter:image" content="${ogImage}" />
  <meta name="twitter:image:alt" content="${seoConfig.title}" />
  
  <!-- Additional Meta Tags -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="theme-color" content="#030213" />
  <meta http-equiv="content-language" content="en" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <meta name="distribution" content="global" />
  <meta name="rating" content="general" />
  ${seoConfig.category ? `<meta name="category" content="${seoConfig.category}" />` : ''}
  ${seoConfig.noPrice ? `<meta name="price" content="false" />` : ''}
  ${seoConfig.noSalary ? `<meta name="salary" content="false" />` : ''}
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${baseUrl}${route.path}" />
  
  <!-- Alternate Language Versions (if available) -->
  <link rel="alternate" hreflang="en" href="${baseUrl}${route.path}" />
  <link rel="alternate" hreflang="x-default" href="${baseUrl}${route.path}" />
  
  <!-- PWA Manifest -->
  <link rel="manifest" href="/manifest.json" />
  
  <!-- Apple PWA Meta Tags -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="${COMPANY_INFO.name}" />
  
  <!-- Microsoft PWA Meta Tags -->
  <meta name="msapplication-TileColor" content="#030213" />
  <meta name="msapplication-config" content="/browserconfig.xml" />
  
  <!-- Preconnect for Performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="dns-prefetch" href="//tepasolutions.asia" />
  <link rel="dns-prefetch" href="//www.google-analytics.com" />
  <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  
  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
  </script>
  
  <!-- Initial page route for React router -->
  <script>
    window.__INITIAL_ROUTE__ = '${route.path}';
    window.__SEO_CONFIG__ = ${JSON.stringify(seoConfig)};
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
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    * {
      box-sizing: border-box;
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
    
    .loading-text {
      margin-top: 1rem;
      color: #666;
      font-size: 14px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Hide loading when React loads */
    .app-loaded .loading-container {
      display: none;
    }
    
    /* Basic responsive grid */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 0 0.75rem;
      }
    }
    
    /* Accessibility improvements */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    /* Focus styles for accessibility */
    :focus {
      outline: 2px solid #030213;
      outline-offset: 2px;
    }
    
    /* Print styles */
    @media print {
      .loading-container {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div id="root">
    <!-- Loading state shown while React app loads -->
    <div class="loading-container">
      <div>
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading ${COMPANY_INFO.name}...</div>
      </div>
    </div>
    
    <!-- SEO-friendly fallback content for crawlers -->
    <noscript>
      <div class="container">
        <header>
          <h1>${seoConfig.title}</h1>
          <p>${seoConfig.description}</p>
        </header>
        <main>
          <p>Welcome to ${COMPANY_INFO.name}. We provide digital transformation and business automation solutions worldwide.</p>
          <p>Service Areas: ${seoConfig.areaServing.slice(0, 10).join(', ')}${seoConfig.areaServing.length > 10 ? ', and more...' : ''}</p>
          <p>Contact us at ${COMPANY_INFO.email} or visit our website with JavaScript enabled for the full experience.</p>
        </main>
      </div>
    </noscript>
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
  
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: '${seoConfig.title}',
      page_location: '${baseUrl}${route.path}',
      content_group1: '${seoConfig.type || 'website'}',
      content_group2: '${seoConfig.category || 'General'}'
    });
  </script>
  
  <!-- Schema.org breadcrumbs for better navigation -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": ${JSON.stringify(generateBreadcrumbs(route.path))}
  }
  </script>
</body>
</html>`;
}

// Generate breadcrumbs for structured data
function generateBreadcrumbs(path: string): Array<object> {
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": COMPANY_INFO.url
    }
  ];

  const pathParts = path.split('/').filter(Boolean);
  let currentPath = '';
  
  pathParts.forEach((part, index) => {
    currentPath += '/' + part;
    const name = part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    breadcrumbs.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": `${COMPANY_INFO.url}${currentPath}`
    });
  });

  return breadcrumbs;
}

// Generate sitemap.xml
function generateSitemap(): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? COMPANY_INFO.url : 'http://localhost:5173';
  
  const urls = routes.map(route => {
    const seoConfig = getSEOConfig(route.path);
    const priority = getPriority(route.path);
    const changeFreq = getChangeFreq(route.path);
    const lastMod = new Date().toISOString().split('T')[0];
    
    return `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
    <image:image>
      <image:loc>${baseUrl}${seoConfig.image || '/og-default.jpg'}</image:loc>
      <image:title>${seoConfig.title}</image:title>
      <image:caption>${seoConfig.description}</image:caption>
    </image:image>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
}

// Generate robots.txt
function generateRobotsTxt(): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? COMPANY_INFO.url : 'http://localhost:5173';
  
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin paths (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /_next/
Disallow: /api/

# Allow important paths
Allow: /articles/
Allow: /events/
Allow: /careers/
Allow: /services/
Allow: /business-automation/

# Host
Host: ${baseUrl}`;
}

// Create all HTML files and SEO files
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
  console.log('🔍 Each page includes:');
  console.log('   • Meta tags (title, description, keywords)');
  console.log('   • Open Graph & Twitter Card tags');
  console.log('   • Structured data (JSON-LD)');
  console.log('   • Service area coverage (US, UK, AU, PH + worldwide)');
  console.log('   • Proper favicon and app icons');
  console.log('   • Sitemap and robots.txt');
  console.log('   • Dynamic content support (no hardcoded data)');
  console.log('');
  console.log('SEO Features:');
  console.log('🌍 Global service areas included');
  console.log('🏷️  Dynamic keywords and descriptions');
  console.log('🚫 Price/salary exclusion for appropriate pages');
  console.log('📱 Mobile and PWA optimization');
  console.log('♿ Accessibility enhancements');
  console.log('');
  console.log('Next steps:');
  console.log('1. Add the required icon files to /public/');
  console.log('2. Update GA_MEASUREMENT_ID in the template');
  console.log('3. Run "npm run build" to build the React app');
  console.log('4. Run "npm run deploy" to deploy to Cloudflare Pages');
}

function getChangeFreq(path: string): string {
  if (path === '/') return 'weekly';
  if (path.includes('/articles/') || path.includes('/events/')) return 'monthly';
  if (path.includes('/careers/')) return 'weekly';
  if (path.includes('/contact-us/')) return 'monthly';
  if (path.includes('/business-automation') || path.includes('/seo-services')) return 'monthly';
  return 'monthly';
}

function getPriority(path: string): string {
  if (path === '/') return '1.0';
  if (path.includes('/business-automation') || path.includes('/mobile-app') || path.includes('/web-application')) return '0.9';
  if (path.includes('/contact-us/sales')) return '0.8';
  if (path.includes('/learn-about-tepa') || path.includes('/careers')) return '0.8';
  if (path.includes('/seo-services') || path.includes('/website-development')) return '0.8';
  if (path.includes('/articles/') || path.includes('/events/')) return '0.7';
  return '0.6';
}

// Run the build
if (process.argv[1] && basename(fileURLToPath(import.meta.url)) === basename(process.argv[1])) {
  buildPages();
}

export { buildPages, routes, generateHTMLTemplate, getSEOConfig };