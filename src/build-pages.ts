<<<<<<< HEAD
<<<<<<< HEAD
// Enhanced multi-page build script with SEO verification and debugging
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
=======
// Multi-page build script for static site generation
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
>>>>>>> parent of 94aad0fa (updated SEO)
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { generateSEOData, generateMetaTags, getSitemapData } from './seo-generator';

<<<<<<< HEAD
// Define all routes - matches middleware expectations exactly
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
  
  // Contact pages - Fixed paths to match middleware
  { path: '/contact/sales', file: 'contact/sales.html' },
  { path: '/contact/support', file: 'contact/support.html' },
  { path: '/contact/event-hosting', file: 'contact/event-hosting.html' },
  { path: '/contact/investors', file: 'contact/investors.html' },
  
  // Dynamic pages
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

// Enhanced HTML template with comprehensive SEO and debug info
function generateHTMLTemplate(route: { path: string; file: string; slug?: string }): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? 'https://tepasolutions.asia' : 'http://localhost:5173';
  
  // Generate SEO data for this route
  const seoData = generateSEOData(route.path, route.slug);
  const metaTags = generateMetaTags(seoData);
  
  // Add debug comment in development
  const debugComment = !isProduction ? `
  <!-- SEO DEBUG INFO
    Route: ${route.path}
    File: ${route.file}
    Slug: ${route.slug || 'none'}
    Generated at: ${new Date().toISOString()}
  -->` : '';
  
  return `<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns#">
=======

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
>>>>>>> parent of 94aad0fa (updated SEO)
=======
// build-pages.ts - Enhanced SEO with area served and all icon files
import { writeFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

// Import route configurations
import { RouteConfig } from './routes/routes';
import { serviceRoutes } from './routes/services';
import { automationRoutes } from './routes/automation';
import { companyRoutes, contactRoutes } from './routes/company';
import { dynamicEventRoutes, dynamicJobRoutes, dynamicArticleRoutes } from './routes/dynamic';

// Import dynamic data
import { articles } from './DynamicData/ArticlesPage';
import { events } from './DynamicData/EventsPage';
import { jobPositions } from './DynamicData/CareersPage';

interface BuildConfig {
  isProduction: boolean;
  baseUrl: string;
  generateSitemap: boolean;
  generateRobots: boolean;
}

class PageBuilder {
  private config: BuildConfig;
  private allRoutes: RouteConfig[] = [];
  private areaServed = [
    { "@type": "Country", "name": "Philippines" },
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "United Kingdom" },
    { "@type": "Country", "name": "Australia" },
    { "@type": "Place", "name": "Worldwide" }
  ];
  private iconFiles = [
    'apple-touch-icon.png',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon.ico',
    'tepa.png'
  ];

  constructor() {
    this.config = {
      isProduction: process.env.NODE_ENV === 'production',
      baseUrl: process.env.NODE_ENV === 'production' ? 'https://tepasolutions.asia' : 'http://localhost:5173',
      generateSitemap: true,
      generateRobots: true
    };
  }

  // Generate enhanced structured data with area served
  private generateStructuredData(route: RouteConfig): string {
    let baseStructuredData = route.structuredData || {};
    
    // Add areaServed to Organization and LocalBusiness types
    if (baseStructuredData['@type'] === 'Organization' || 
        baseStructuredData['@type'] === 'LocalBusiness') {
      baseStructuredData = {
        ...baseStructuredData,
        areaServed: this.areaServed
      };
    }
    
    // Add breadcrumb structured data for all pages
    const breadcrumbData = {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": this.config.baseUrl
        }
      ]
    };
    
    // Add current page to breadcrumb if not home
    if (route.path !== '/') {
      const pathParts = route.path.split('/').filter(part => part);
      breadcrumbData.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": route.title,
        "item": this.config.baseUrl + route.path
      });
    }
    
    return JSON.stringify([baseStructuredData, breadcrumbData], null, 2);
  }

  // Generate HTML template with enhanced SEO
  private generateHTMLTemplate(route: RouteConfig): string {
    const structuredDataScript = `<script type="application/ld+json">${this.generateStructuredData(route)}</script>`;

    const robotsDirective = route.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    const ogImageTag = route.ogImage 
      ? `<meta property="og:image" content="${this.config.baseUrl}${route.ogImage}">
  <meta property="twitter:image" content="${this.config.baseUrl}${route.ogImage}">` 
      : `<meta property="og:image" content="${this.config.baseUrl}/tepa.png">
  <meta property="twitter:image" content="${this.config.baseUrl}/tepa.png">`;

    // Enhanced meta description with area served
    const enhancedDescription = `${route.description} Serving clients in Philippines, United States, United Kingdom, Australia, and worldwide.`;

    return `<!DOCTYPE html>
<html lang="en">
>>>>>>> parent of 91f67d68 (v2)
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
<<<<<<< HEAD
  ${debugComment}
  
<<<<<<< HEAD
  ${metaTags}
=======
>>>>>>> parent of 94aad0fa (updated SEO)
  
  <!-- Preconnect to external domains for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<<<<<<< HEAD
  
  <!-- PWA manifest -->
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#ffffff">
  
  <!-- Apple PWA meta tags -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Tepa Solutions">
  
  <!-- Microsoft PWA meta tags -->
  <meta name="msapplication-TileColor" content="#ffffff>
  <meta name="msapplication-config" content="/browserconfig.xml">
  
  <!-- Additional SEO meta tags -->
  <meta name="robots" content="${seoData.robots || 'index, follow'}, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1">
  
  <!-- Geographic meta tags -->
  <meta name="geo.region" content="PH">
  <meta name="geo.country" content="Philippines">
  <meta name="geo.placename" content="Philippines">
  
  <!-- Language and locale -->
  <meta http-equiv="content-language" content="en">
  <meta name="language" content="English">
  
=======
  
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
  
>>>>>>> parent of 94aad0fa (updated SEO)
  <!-- DNS prefetch for performance -->
  <link rel="dns-prefetch" href="//tepasolutions.asia">
  <link rel="dns-prefetch" href="//www.google-analytics.com">
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
<<<<<<< HEAD
  
  <!-- Preload critical resources -->
  <link rel="preload" href="/src/main.tsx" as="script">
=======
>>>>>>> parent of 94aad0fa (updated SEO)
=======
  <!-- Favicon and App Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  
  <!-- Google Site Verification for Search Console -->
  <meta name="google-site-verification" content="your-verification-code-here">
  
  <!-- Primary SEO Meta Tags -->
  <title>${route.title} | Tepa Solutions - IT Services Worldwide</title>
  <meta name="title" content="${route.title} | Tepa Solutions - IT Services Worldwide">
  <meta name="description" content="${enhancedDescription}">
  <meta name="keywords" content="${route.keywords.join(', ')}, Philippines, United States, United Kingdom, Australia, worldwide">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${this.config.baseUrl}${route.path}">
  <meta property="og:title" content="${route.title} | Tepa Solutions - IT Services Worldwide">
  <meta property="og:description" content="${enhancedDescription}">
  <meta property="og:site_name" content="Tepa Solutions">
  ${ogImageTag}
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${this.config.baseUrl}${route.path}">
  <meta property="twitter:title" content="${route.title} | Tepa Solutions - IT Services Worldwide">
  <meta property="twitter:description" content="${enhancedDescription}">
  <meta property="twitter:site" content="@tepasolutions">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${route.canonical || this.config.baseUrl + route.path}">
  
  <!-- Robots meta tag -->
  <meta name="robots" content="${robotsDirective}">
  <meta name="googlebot" content="${robotsDirective}">
  
  <!-- Geographic meta tags -->
  <meta name="geo.region" content="PH">
  <meta name="geo.country" content="Philippines">
  <meta name="geo.placename" content="Philippines">
  
  <!-- Language and locale -->
  <meta http-equiv="content-language" content="en">
  <meta name="language" content="English">
  <meta property="og:locale" content="en_PH">
  
  <!-- Preconnect to external domains for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- DNS prefetch for performance -->
  <link rel="dns-prefetch" href="//tepasolutions.asia">
  <link rel="dns-prefetch" href="//www.google-analytics.com">
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  
  <!-- PWA manifest -->
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#030213">
  
  <!-- Apple PWA meta tags -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Tepa Solutions">
  
  <!-- Microsoft PWA meta tags -->
  <meta name="msapplication-TileColor" content="#030213">
  <meta name="msapplication-TileImage" content="/tepa.png">
  <meta name="msapplication-config" content="/browserconfig.xml">
  
  <!-- Structured Data -->
  ${structuredDataScript}
>>>>>>> parent of 91f67d68 (v2)
  
  <!-- Initial page route for React router -->
  <script>
    window.__INITIAL_ROUTE__ = '${route.path}';
<<<<<<< HEAD
<<<<<<< HEAD
    window.__SEO_DATA__ = ${JSON.stringify(seoData, null, 2)};
    ${!isProduction ? `window.__DEBUG_SEO__ = true;` : ''}
=======
    window.__SEO_DATA__ = ${JSON.stringify({
      title: route.title,
      description: enhancedDescription,
      keywords: [...route.keywords, 'Philippines', 'United States', 'United Kingdom', 'Australia', 'worldwide'],
      canonical: route.canonical || this.config.baseUrl + route.path,
      areaServed: this.areaServed
    })};
>>>>>>> parent of 91f67d68 (v2)
  </script>
  
  <!-- Critical CSS with loading states -->
=======
  </script>
  
  <!-- Critical CSS will be injected here by Vite -->
>>>>>>> parent of 94aad0fa (updated SEO)
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
      flex-direction: column;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f3f4f6;
      border-top: 3px solid #030213;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }
    
<<<<<<< HEAD
    .loading-text {
      color: #6b7280;
      font-size: 14px;
    }
    
=======
>>>>>>> parent of 91f67d68 (v2)
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Hide loading when React loads */
    .app-loaded .loading-container {
      display: none;
    }
<<<<<<< HEAD
    
<<<<<<< HEAD
    /* SEO-friendly content preview for crawlers */
    .seo-content {
      position: absolute;
      left: -9999px;
      top: -9999px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    
    /* Ensure content is readable for screen readers */
    .seo-content h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .seo-content p {
      margin: 0.5rem 0;
=======
    /* SEO-friendly hidden content for crawlers */
    .seo-content {
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
>>>>>>> parent of 91f67d68 (v2)
    }
=======
>>>>>>> parent of 94aad0fa (updated SEO)
  </style>
</head>
<body>
  <!-- SEO-friendly content for crawlers -->
  <div class="seo-content">
    <h1>${route.title} - Tepa Solutions</h1>
    <p>${enhancedDescription}</p>
    <p>We serve clients in Philippines, United States, United Kingdom, Australia, and worldwide.</p>
    <nav>
      <a href="/">Home</a>
      <a href="/business-automation">Business Automation</a>
      <a href="/mobile-app-development">Mobile Apps</a>
      <a href="/web-application-development">Web Applications</a>
      <a href="/contact-us/sales">Contact Us</a>
    </nav>
  </div>
  
  <div id="root">
    <!-- Loading state shown while React app loads -->
    <div class="loading-container">
      <div class="loading-spinner"></div>
<<<<<<< HEAD
      <div class="loading-text">Loading Tepa Solutions...</div>
    </div>
    
    <!-- SEO-friendly content preview for crawlers -->
    <div class="seo-content">
      <h1>${seoData.title.split(' | ')[0] || seoData.title}</h1>
      <p>${seoData.description}</p>
      <div>Keywords: ${seoData.keywords.join(', ')}</div>
    </div>
=======
    </div>
>>>>>>> parent of 91f67d68 (v2)
  </div>
  
  <!-- React app entry point -->
  <script type="module" src="/src/main.tsx"></script>
  
  <!-- Service Worker registration -->
  <script>
    if ('serviceWorker' in navigator && '${this.config.isProduction}' === 'true') {
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
    
    // Debug logging in development
    ${!isProduction ? `
    console.log('SEO Debug Info:', {
      route: '${route.path}',
      file: '${route.file}',
      seoData: window.__SEO_DATA__
    });
    ` : ''}
  </script>
  
  <!-- Analytics placeholder -->
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
  ${this.config.isProduction ? `
>>>>>>> parent of 91f67d68 (v2)
  <!-- Global site tag (gtag.js) - Google Analytics -->
>>>>>>> parent of 94aad0fa (updated SEO)
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
<<<<<<< HEAD
  </script>
=======
  </script>` : ''}
>>>>>>> parent of 91f67d68 (v2)
</body>
</html>`;
  }

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  // Copy all icon files to dist directory
  private copyIconFiles(): void {
    let copiedCount = 0;
    
    this.iconFiles.forEach(iconFile => {
      try {
        const sourcePath = join(process.cwd(), 'public', iconFile);
        const destPath = join('dist', iconFile);
        
        if (existsSync(sourcePath)) {
          copyFileSync(sourcePath, destPath);
          console.log(`✅ Copied ${iconFile} to dist directory`);
          copiedCount++;
        } else {
          console.log(`⚠️  ${iconFile} not found in public directory`);
        }
      } catch (error) {
        console.error(`❌ Error copying ${iconFile}:`, error);
      }
    });
    
    console.log(`📋 Copied ${copiedCount} out of ${this.iconFiles.length} icon files`);
  }

  // Compile all routes from different modules
  private compileRoutes(): void {
    // Start with static routes
    this.allRoutes = [
      ...serviceRoutes,
      ...automationRoutes,
      ...companyRoutes,
      ...contactRoutes
    ];

    // Add dynamic routes only if data exists
    if (articles && articles.length > 0) {
      console.log(`📝 Adding ${articles.length} article routes`);
      this.allRoutes.push(...dynamicArticleRoutes(articles));
    }
    
    if (events && events.length > 0) {
      console.log(`📅 Adding ${events.length} event routes`);
      this.allRoutes.push(...dynamicEventRoutes(events));
    }
    
    if (jobPositions && jobPositions.length > 0) {
      console.log(`💼 Adding ${jobPositions.length} job routes`);
      this.allRoutes.push(...dynamicJobRoutes(jobPositions));
    }

    console.log(`📊 Compiled ${this.allRoutes.length} routes from modular configurations`);
    console.log(`   - Services: ${serviceRoutes.length}`);
    console.log(`   - Automation: ${automationRoutes.length}`);
    console.log(`   - Company: ${companyRoutes.length}`);
    console.log(`   - Contact: ${contactRoutes.length}`);
    console.log(`   - Articles: ${articles?.length || 0}`);
    console.log(`   - Events: ${events?.length || 0}`);
    console.log(`   - Jobs: ${jobPositions?.length || 0}`);
  }

  // Generate sitemap.xml
  private generateSitemap(): void {
    if (!this.config.generateSitemap) return;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${this.allRoutes.filter(route => !route.noindex).map(route => `  <url>
    <loc>${this.config.baseUrl}${route.path}</loc>
    <changefreq>${route.changeFreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
>>>>>>> parent of 91f67d68 (v2)
</urlset>`;

<<<<<<< HEAD
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

// Verify SEO content in generated HTML
function verifySEOContent(htmlContent: string, route: any): boolean {
  const checks = {
    hasTitle: htmlContent.includes('<title>') && !htmlContent.includes('<title></title>'),
    hasDescription: htmlContent.includes('name="description"'),
    hasOpenGraph: htmlContent.includes('property="og:'),
    hasTwitter: htmlContent.includes('property="twitter:'),
    hasCanonical: htmlContent.includes('rel="canonical"'),
    hasJsonLD: htmlContent.includes('application/ld+json'),
    hasKeywords: htmlContent.includes('name="keywords"')
  };
  
  const passedChecks = Object.values(checks).filter(Boolean).length;
  const totalChecks = Object.keys(checks).length;
  
  console.log(`  SEO Verification for ${route.file}:`);
  console.log(`  - Title: ${checks.hasTitle ? '✅' : '❌'}`);
  console.log(`  - Description: ${checks.hasDescription ? '✅' : '❌'}`);
  console.log(`  - Open Graph: ${checks.hasOpenGraph ? '✅' : '❌'}`);
  console.log(`  - Twitter Cards: ${checks.hasTwitter ? '✅' : '❌'}`);
  console.log(`  - Canonical URL: ${checks.hasCanonical ? '✅' : '❌'}`);
  console.log(`  - JSON-LD: ${checks.hasJsonLD ? '✅' : '❌'}`);
  console.log(`  - Keywords: ${checks.hasKeywords ? '✅' : '❌'}`);
  console.log(`  - Score: ${passedChecks}/${totalChecks}\n`);
  
  return passedChecks >= 5; // Require at least 5/7 checks to pass
}

// Main build function with verification
function buildPages() {
  console.log('🚀 Building enhanced multi-page static site with SEO verification...');
  console.log('');
  
  // Ensure dist directory exists
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true });
  }
  
  let successCount = 0;
  let seoPassCount = 0;
  
  // Generate HTML pages
  routes.forEach(route => {
    try {
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
      
      // Verify SEO content
      const seoValid = verifySEOContent(htmlContent, route);
      if (seoValid) {
        seoPassCount++;
      }
      
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to generate ${route.file}:`, error);
    }
  });
  
  // Generate sitemap.xml
  try {
    const sitemapContent = generateSitemap();
    writeFileSync(join('dist', 'sitemap.xml'), sitemapContent, 'utf8');
    console.log('✅ Generated: sitemap.xml');
  } catch (error) {
    console.error('❌ Failed to generate sitemap.xml:', error);
  }
  
  // Generate robots.txt
  try {
    const robotsContent = generateRobotsTxt();
    writeFileSync(join('dist', 'robots.txt'), robotsContent, 'utf8');
    console.log('✅ Generated: robots.txt');
  } catch (error) {
    console.error('❌ Failed to generate robots.txt:', error);
  }
  
  console.log('');
  console.log('🎉 Enhanced multi-page build with SEO complete!');
  console.log(`📄 Generated ${successCount}/${routes.length} HTML pages`);
  console.log(`🔍 SEO optimized pages: ${seoPassCount}/${routes.length}`);
  console.log('');
  console.log('SEO Features Included:');
  console.log('• Comprehensive meta tags (title, description, keywords)');
  console.log('• Open Graph tags for social media sharing');
  console.log('• Twitter Card optimization');
  console.log('• JSON-LD structured data');
  console.log('• Canonical URLs and proper robots directives');
  console.log('• XML sitemap with priorities and change frequencies');
  console.log('');
  
  if (seoPassCount < routes.length) {
    console.log('⚠️  Some pages failed SEO verification. Check the logs above.');
  }
  
  console.log('Next steps:');
  console.log('1. Run "npm run build" to build the React app');
  console.log('2. Run "npm run deploy" to deploy to Cloudflare Pages');
  console.log('3. Test with ?_bot=1 query parameter to verify middleware');
=======
// Create all HTML files in the dist directory (for SEO)
function buildPages() {
  console.log('🚀 Building multi-page static site structure...');
  
  // Ensure dist directory exists
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true });
  }
  
  routes.forEach(route => {
    const htmlContent = generateHTMLTemplate(route);
    const filePath = join('dist', route.file);
    const fileDir = dirname(filePath);
=======
    writeFileSync(join('dist', 'sitemap.xml'), sitemap, 'utf8');
    console.log('🗺️ Generated sitemap.xml');
  }

  // Generate robots.txt
  private generateRobots(): void {
    if (!this.config.generateRobots) return;

    const robots = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.config.baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas
Disallow: /admin/
Disallow: /.well-known/
Disallow: /api/

# Allow specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /`;

    writeFileSync(join('dist', 'robots.txt'), robots, 'utf8');
    console.log('🤖 Generated robots.txt');
  }

  // Main build process
  public build(): void {
    console.log('🚀 Starting modular multi-page build...');
    console.log(`🌍 Environment: ${this.config.isProduction ? 'Production' : 'Development'}`);
    console.log(`🔗 Base URL: ${this.config.baseUrl}`);
>>>>>>> parent of 91f67d68 (v2)
    
    // Ensure dist directory exists
    if (!existsSync('dist')) {
      mkdirSync('dist', { recursive: true });
    }

    // Compile all routes from modules
    this.compileRoutes();

    // Generate HTML files
    let successCount = 0;
    let errorCount = 0;
    
<<<<<<< HEAD
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
>>>>>>> parent of 94aad0fa (updated SEO)
}
=======
    this.allRoutes.forEach(route => {
      try {
        const htmlContent = this.generateHTMLTemplate(route);
        const filePath = join('dist', route.file);
        const fileDir = dirname(filePath);
        
        // Create directory if it doesn't exist
        if (fileDir !== 'dist' && !existsSync(fileDir)) {
          mkdirSync(fileDir, { recursive: true });
        }
        
        // Write HTML file
        writeFileSync(filePath, htmlContent, 'utf8');
        console.log(`✅ Generated: ${route.file} (${route.title})`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error generating ${route.file}:`, error);
        errorCount++;
      }
    });

    // Generate SEO files
    this.generateSitemap();
    this.generateRobots();
    
    // Copy all icon files
    this.copyIconFiles();
    
    console.log('🎉 Modular multi-page build complete!');
    console.log(`📄 Generated ${successCount} HTML pages successfully`);
    if (errorCount > 0) {
      console.log(`⚠️  ${errorCount} pages failed to generate`);
    }
    console.log('🔍 Enhanced SEO with structured data and meta tags');
    console.log('🗺️ Generated sitemap.xml and robots.txt');
    console.log('🌍 Added area served: Philippines, United States, United Kingdom, Australia, Worldwide');
    console.log('📱 Added comprehensive icon support for all devices');
    console.log('');
    console.log('Next steps:');
    console.log('1. Run "npm run build" to build the React app');
    console.log('2. Run "npm run deploy" to deploy to hosting platform');
    console.log('3. Update Google Search Console with new sitemap');
    console.log('4. Add your Google verification code to the meta tag');
    console.log('5. Ensure all icon files are in the /public directory:');
    this.iconFiles.forEach(file => console.log(`   - ${file}`));
  }

  // Get all routes for external use
  public getRoutes(): RouteConfig[] {
    if (this.allRoutes.length === 0) {
      this.compileRoutes();
    }
    return this.allRoutes;
  }
}

// Export functions for external use
export const buildPages = () => {
  const builder = new PageBuilder();
  builder.build();
};

export const getRoutes = () => {
  const builder = new PageBuilder();
  return builder.getRoutes();
};
>>>>>>> parent of 91f67d68 (v2)

// Run the build if called directly
if (process.argv[1] && basename(fileURLToPath(import.meta.url)) === basename(process.argv[1])) {
  buildPages();
}

<<<<<<< HEAD
export { buildPages, routes };
=======
export default PageBuilder;
>>>>>>> parent of 91f67d68 (v2)
