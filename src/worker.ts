import { articles } from './data/articles-data';
import { events } from './data/events-data';
import { jobPositions } from './data/careers-data';

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

function generateAllSitemapEntries(): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages: SitemapEntry[] = [
    { url: `${BASE_URL}/`, lastmod: today, changefreq: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/articles`, lastmod: today, changefreq: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/events`, lastmod: today, changefreq: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/careers`, lastmod: today, changefreq: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastmod: today, changefreq: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastmod: today, changefreq: 'monthly', priority: 0.6 }
  ];

  // Articles
  const articlePages: SitemapEntry[] = articles.map(a => ({
    url: `${BASE_URL}/articles/${a.slug || generateSlug(a.title)}`,
    lastmod: a.date || today,
    changefreq: 'monthly',
    priority: a.featured ? 0.8 : 0.7
  }));

  // Events
  const eventPages: SitemapEntry[] = events.map(e => ({
    url: `${BASE_URL}/events/${e.slug || generateSlug(e.title)}`,
    lastmod: e.date || today,
    changefreq: 'weekly',
    priority: e.featured ? 0.8 : 0.6
  }));

  // Careers
  const careerPages: SitemapEntry[] = jobPositions.map(j => ({
    url: `${BASE_URL}/careers/${j.slug || generateSlug(j.title)}`,
    lastmod: j.postedDate || today,
    changefreq: 'weekly',
    priority: 0.6
  }));

  return [...staticPages, ...articlePages, ...eventPages, ...careerPages];
}

function escapeXML(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemapXML(entries: SitemapEntry[]): string {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const urls = entries.map(e => `
  <url>
    <loc>${escapeXML(e.url)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('');

  return `${header}${urls}\n</urlset>`;
}
export default {
  async fetch(request: Request) {
    const url = new URL(request.url);

    // Only serve sitemap at /bot/sitemap.xml
    if (url.pathname !== '/bot/sitemap.xml') {
      return new Response('Not Found', { status: 404 });
    }

    const entries = generateAllSitemapEntries();
    const sitemapXML = generateSitemapXML(entries);

    return new Response(sitemapXML, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
      }
    });
  }
};
