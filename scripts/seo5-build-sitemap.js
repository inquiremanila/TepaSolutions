#!/usr/bin/env node

/**
 * SEO5: Build Sitemap Script - Generates dynamic sitemap during build
 * This script reads content data and generates updated sitemap.xml files
 */

const fs = require('fs');
const path = require('path');

// Import the sitemap generator (we'll need to compile it first)
async function generateSitemap() {
  try {
    console.log('🚀 Starting dynamic sitemap generation...');

    // Import the generator - this requires TypeScript compilation first
    const { generateCompleteSitemap } = await import('../build/utils/seo2-sitemap-generator.js');
    
    // Generate the sitemap XML
    const sitemapXML = generateCompleteSitemap();
    
    // Write to public/sitemap.xml (for development)
    const publicPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(publicPath, sitemapXML, 'utf8');
    console.log('✅ Generated public/sitemap.xml');
    
    // Write to build/sitemap.xml (for production)
    const buildDir = path.join(__dirname, '..', 'build');
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }
    
    const buildPath = path.join(buildDir, 'sitemap.xml');
    fs.writeFileSync(buildPath, sitemapXML, 'utf8');
    console.log('✅ Generated build/sitemap.xml');
    
    // Count entries
    const urlCount = (sitemapXML.match(/<url>/g) || []).length;
    console.log(`📊 Sitemap contains ${urlCount} URLs`);
    
    console.log('🎉 Sitemap generation completed successfully!');
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    
    // Fallback: create basic sitemap if generation fails
    console.log('🔄 Creating fallback sitemap...');
    
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tepasolutions.asia/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tepasolutions.asia/articles</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tepasolutions.asia/events</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tepasolutions.asia/careers</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

    fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), fallbackSitemap, 'utf8');
    fs.writeFileSync(path.join(__dirname, '..', 'build', 'sitemap.xml'), fallbackSitemap, 'utf8');
    
    console.log('✅ Fallback sitemap created');
    process.exit(1);
  }
}

// Alternative simple version that doesn't require compilation
function generateSimpleSitemap() {
  console.log('🚀 Generating simple sitemap without compilation...');
  
  const today = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages = [
    { url: 'https://tepasolutions.asia/', priority: '1.0', changefreq: 'weekly' },
    { url: 'https://tepasolutions.asia/web-application-development', priority: '0.9', changefreq: 'monthly' },
    { url: 'https://tepasolutions.asia/mobile-app-development', priority: '0.9', changefreq: 'monthly' },
    { url: 'https://tepasolutions.asia/website-development', priority: '0.9', changefreq: 'monthly' },
    { url: 'https://tepasolutions.asia/seo-services', priority: '0.9', changefreq: 'monthly' },
    { url: 'https://tepasolutions.asia/business-automation', priority: '0.9', changefreq: 'monthly' },
    { url: 'https://tepasolutions.asia/digital-transformation', priority: '0.9', changefreq: 'monthly' },
    { url: 'https://tepasolutions.asia/articles', priority: '0.8', changefreq: 'daily' },
    { url: 'https://tepasolutions.asia/events', priority: '0.8', changefreq: 'daily' },
    { url: 'https://tepasolutions.asia/careers', priority: '0.7', changefreq: 'weekly' },
    { url: 'https://tepasolutions.asia/about', priority: '0.6', changefreq: 'monthly' },
    { url: 'https://tepasolutions.asia/contact', priority: '0.6', changefreq: 'monthly' },
    { url: 'https://tepasolutions.asia/volunteer', priority: '0.5', changefreq: 'monthly' }
  ];
  
  // Sample dynamic content (these would be read from actual data files in real implementation)
  const dynamicPages = [
    // Sample articles
    { url: 'https://tepasolutions.asia/articles/iphone-17-review-philippines-pricing-release', priority: '0.8', changefreq: 'monthly' },
    { url: 'https://tepasolutions.asia/articles/how-ai-is-transforming-the-workforce-in-2025', priority: '0.7', changefreq: 'monthly' },
    { url: 'https://tepasolutions.asia/articles/the-complete-guide-to-business-process-automation', priority: '0.7', changefreq: 'monthly' },
    { url: 'https://tepasolutions.asia/articles/mobile-app-development-trends-for-2025', priority: '0.7', changefreq: 'monthly' },
    { url: 'https://tepasolutions.asia/articles/seo-strategies-that-actually-work-in-2025', priority: '0.7', changefreq: 'monthly' },
    
    // Sample events  
    { url: 'https://tepasolutions.asia/events/free-introduction-roblox-game-development', priority: '0.8', changefreq: 'weekly' },
    { url: 'https://tepasolutions.asia/events/introduction-to-html-and-css', priority: '0.6', changefreq: 'weekly' },
    
    // Sample careers
    { url: 'https://tepasolutions.asia/careers/intern-frontend-developer', priority: '0.6', changefreq: 'weekly' },
    { url: 'https://tepasolutions.asia/careers/intern-backend-developer', priority: '0.6', changefreq: 'weekly' },
    { url: 'https://tepasolutions.asia/careers/intern-article-writer', priority: '0.6', changefreq: 'weekly' },
    { url: 'https://tepasolutions.asia/careers/intern-seo-specialist', priority: '0.6', changefreq: 'weekly' }
  ];
  
  const allPages = [...staticPages, ...dynamicPages];
  
  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write files
  const publicPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, sitemapXML, 'utf8');
  
  const buildDir = path.join(__dirname, '..', 'build');
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemapXML, 'utf8');
  
  console.log(`✅ Generated sitemap with ${allPages.length} URLs`);
  console.log('📁 Files written: public/sitemap.xml, build/sitemap.xml');
}

// Run the appropriate generator
if (process.argv.includes('--simple')) {
  generateSimpleSitemap();
} else {
  generateSitemap();
}