const fs = require('fs');
const path = require('path');

const baseUrl = 'https://tepasolutions.asia';
const currentDate = new Date().toISOString();

// Import data from TypeScript files (simplified for Node.js)
const articlesData = [
  { id: 'how-ai-is-transforming-workforce-in-2025', featured: true },
  { id: 'react-performance-optimization-guide', featured: false },
  { id: 'philippines-tech-startup-ecosystem-2025', featured: true }
];

const eventsData = [
  { id: 'introduction-to-how-to-make-a-roblox-game', featured: true },
  { id: 'react-masterclass-advanced-patterns', featured: true },
  { id: 'ai-automation-business-workshop', featured: false }
];

const careersData = [
  { id: 'frontend-developer-1' },
  { id: 'backend-developer-1' },
  { id: 'ui-ux-designer-1' }
];

// Main routes that match the actual application routes
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

// Add individual article routes
articlesData.forEach(article => {
  routes.push({
    url: `/articles/${article.id}`,
    priority: article.featured ? 0.7 : 0.6,
    changefreq: 'monthly'
  });
});

// Add individual event routes
eventsData.forEach(event => {
  routes.push({
    url: `/events/${event.id}`,
    priority: event.featured ? 0.7 : 0.6,
    changefreq: 'weekly'
  });
});

// Add individual career routes
careersData.forEach(career => {
  routes.push({
    url: `/careers/${career.id}`,
    priority: 0.6,
    changefreq: 'weekly'
  });
});

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

// Write sitemap to public directory
const publicPath = path.join(__dirname, '../public');
const sitemapPath = path.join(publicPath, 'sitemap.xml');

if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath, { recursive: true });
}

fs.writeFileSync(sitemapPath, generateSitemap());
console.log('✅ Sitemap generated successfully at public/sitemap.xml');