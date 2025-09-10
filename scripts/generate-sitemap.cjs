const fs = require('fs');
const path = require('path');

const baseUrl = 'https://tepasolutions.asia';
const currentDate = new Date().toISOString();

// Routes that match the actual application routes
const routes = [
  { url: '', priority: 1.0, changefreq: 'weekly' }, // Homepage
  { url: '/mobile-app-development', priority: 0.9, changefreq: 'weekly' },
  { url: '/web-application-development', priority: 0.9, changefreq: 'weekly' },
  { url: '/website-development', priority: 0.9, changefreq: 'weekly' },
  { url: '/seo-services', priority: 0.9, changefreq: 'weekly' },
  { url: '/business-automation', priority: 0.9, changefreq: 'weekly' },
  { url: '/business-automation/sales-process-automation', priority: 0.8, changefreq: 'monthly' },
  { url: '/business-automation/marketing-automation', priority: 0.8, changefreq: 'monthly' },
  { url: '/business-automation/customer-support-automation', priority: 0.8, changefreq: 'monthly' },
  { url: '/business-automation/hr-automation', priority: 0.8, changefreq: 'monthly' },
  { url: '/business-automation/finance-automation', priority: 0.8, changefreq: 'monthly' },
  { url: '/business-automation/inventory-management-automation', priority: 0.8, changefreq: 'monthly' },
  { url: '/learn-about-tepa', priority: 0.8, changefreq: 'monthly' },
  { url: '/careers', priority: 0.8, changefreq: 'weekly' },
  { url: '/who-we-serve', priority: 0.7, changefreq: 'monthly' },
  { url: '/articles', priority: 0.7, changefreq: 'daily' },
  { url: '/events', priority: 0.7, changefreq: 'weekly' },
  { url: '/investors', priority: 0.6, changefreq: 'monthly' },
  { url: '/volunteer-with-us', priority: 0.6, changefreq: 'monthly' },
  { url: '/contact-us/sales', priority: 0.8, changefreq: 'monthly' },
  { url: '/contact-us/support', priority: 0.7, changefreq: 'monthly' },
  { url: '/contact-us/volunteer', priority: 0.5, changefreq: 'monthly' },
  { url: '/contact-us/event-hosting', priority: 0.5, changefreq: 'monthly' },
  { url: '/contact-us/investors', priority: 0.6, changefreq: 'monthly' }
];

// Generate sitemap XML
const generateSitemap = () => {
  const urls = routes.map(route => {
    const url = baseUrl + route.url;
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

// Write sitemap to dist directory
const distPath = path.join(__dirname, '../dist');
const sitemapPath = path.join(distPath, 'sitemap.xml');

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

fs.writeFileSync(sitemapPath, generateSitemap());
console.log('✅ Sitemap generated successfully at dist/sitemap.xml');