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
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
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
  
  <!-- Initial page route for React router -->
  <script>
    window.__INITIAL_ROUTE__ = '${route.path}';
    window.__SEO_DATA__ = ${JSON.stringify({
      title: route.title,
      description: enhancedDescription,
      keywords: [...route.keywords, 'Philippines', 'United States', 'United Kingdom', 'Australia', 'worldwide'],
      canonical: route.canonical || this.config.baseUrl + route.path,
      areaServed: this.areaServed
    })};
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
    
    /* SEO-friendly hidden content for crawlers */
    .seo-content {
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
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
    </div>
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
  </script>
  
  <!-- Analytics placeholder -->
  ${this.config.isProduction ? `
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>` : ''}
</body>
</html>`;
  }

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
</urlset>`;

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
    
    // Ensure dist directory exists
    if (!existsSync('dist')) {
      mkdirSync('dist', { recursive: true });
    }

    // Compile all routes from modules
    this.compileRoutes();

    // Generate HTML files
    let successCount = 0;
    let errorCount = 0;
    
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

// Run the build if called directly
if (process.argv[1] && basename(fileURLToPath(import.meta.url)) === basename(process.argv[1])) {
  buildPages();
}

export default PageBuilder;