// Script to generate comprehensive sitemap.xml with all routes
import { writeFileSync } from 'fs';
import { routes } from '../src/router';
import { articles } from '../src/pages/ArticlesPage';
import { events } from '../src/pages/EventsPage';
import { jobPositions } from '../src/pages/CareersPage';

const BASE_URL = 'https://tepasolutions.asia';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
}

function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemapEntries(): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0];
  const entries: SitemapEntry[] = [];

  // Static pages from routes
  routes.forEach(route => {
    entries.push({
      url: `${BASE_URL}${route.path}`,
      lastmod: today,
      changefreq: route.path === '/' ? 'weekly' : 'monthly',
      priority: route.path === '/' ? 1.0 : 0.8
    });
  });

  // Business automation subpages
  const automationSubpages = [
    '/business-automation/sales-process-automation',
    '/business-automation/marketing-automation', 
    '/business-automation/customer-support-automation',
    '/business-automation/hr-automation',
    '/business-automation/finance-automation',
    '/business-automation/inventory-management-automation'
  ];

  automationSubpages.forEach(path => {
    entries.push({
      url: `${BASE_URL}${path}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7
    });
  });

  // Article pages
  articles.forEach(article => {
    const slug = article.slug || generateSlug(article.title);
    entries.push({
      url: `${BASE_URL}/articles/${slug}`,
      lastmod: article.date || today,
      changefreq: 'monthly',
      priority: article.featured ? 0.8 : 0.6
    });
  });

  // Event pages
  events.forEach(event => {
    const slug = event.slug || generateSlug(event.title);
    entries.push({
      url: `${BASE_URL}/events/${slug}`,
      lastmod: event.date || today,
      changefreq: 'weekly',
      priority: event.featured ? 0.7 : 0.5
    });
  });

  // Career pages
  jobPositions.forEach(job => {
    const slug = job.slug || generateSlug(job.title);
    entries.push({
      url: `${BASE_URL}/careers/${slug}`,
      lastmod: job.postedDate || today,
      changefreq: 'weekly',
      priority: 0.6
    });
  });

  return entries;
}

function generateSitemapXML(entries: SitemapEntry[]): string {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const urls = entries
    .sort((a, b) => b.priority - a.priority)
    .map(entry => `
  <url>
    <loc>${escapeXML(entry.url)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');

  const footer = '\n</urlset>';

  return `${header}${urls}${footer}`;
}

function main() {
  console.log('🗺️  Generating sitemap.xml...\n');
  
  try {
    const entries = generateSitemapEntries();
    const sitemapXML = generateSitemapXML(entries);
    
    // Write to public directory
    writeFileSync('build/sitemap.xml', sitemapXML, 'utf8');
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`📄 ${entries.length} URLs included in sitemap`);
    console.log('📁 File: public/sitemap.xml\n');
    
    // Show some sample URLs
    console.log('Sample URLs included:');
    entries.slice(0, 10).forEach(entry => {
      console.log(`  • ${entry.url} (priority: ${entry.priority})`);
    });
    
    if (entries.length > 10) {
      console.log(`  ... and ${entries.length - 10} more URLs`);
    }
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

main();