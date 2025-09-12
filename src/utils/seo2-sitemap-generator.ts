/**
 * SEO2: Sitemap Generator - Dynamic sitemap generation from content data
 * This file generates XML sitemaps based on actual content data
 */

import { allContent } from './seo1-data-sources';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
  }>;
}

const BASE_URL = 'https://tepasolutions.asia';

/**
 * Generate sitemap entries for static pages
 */
export function generateStaticPages(): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0];
  
  return [
    // Homepage
    {
      url: `${BASE_URL}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 1.0
    },
    
    // Service Pages
    {
      url: `${BASE_URL}/web-application-development`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/mobile-app-development`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/website-development`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/seo-services`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/business-automation`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/digital-transformation`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    
    // Main section pages
    {
      url: `${BASE_URL}/articles`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/events`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/careers`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      url: `${BASE_URL}/about`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${BASE_URL}/contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${BASE_URL}/volunteer`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5
    }
  ];
}

/**
 * Generate sitemap entries for articles
 */
export function generateArticlePages(): SitemapEntry[] {
  return allContent.articles.map(article => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastmod: article.date || new Date().toISOString().split('T')[0],
    changefreq: 'monthly' as const,
    priority: article.featured ? 0.8 : 0.7,
    images: article.featuredImage ? [{
      loc: article.featuredImage,
      title: article.title,
      caption: article.excerpt
    }] : undefined
  }));
}

/**
 * Generate sitemap entries for events
 */
export function generateEventPages(): SitemapEntry[] {
  return allContent.events.map(event => ({
    url: `${BASE_URL}/events/${event.slug}`,
    lastmod: event.date || new Date().toISOString().split('T')[0],
    changefreq: 'weekly' as const,
    priority: event.featured ? 0.8 : 0.6,
    images: event.image ? [{
      loc: event.image,
      title: event.title,
      caption: event.description
    }] : undefined
  }));
}

/**
 * Generate sitemap entries for career pages
 */
export function generateCareerPages(): SitemapEntry[] {
  return allContent.careers.map(job => ({
    url: `${BASE_URL}/careers/${job.slug}`,
    lastmod: job.postedDate || new Date().toISOString().split('T')[0],
    changefreq: 'weekly' as const,
    priority: 0.6
  }));
}

/**
 * Generate complete sitemap entries
 */
export function generateAllSitemapEntries(): SitemapEntry[] {
  return [
    ...generateStaticPages(),
    ...generateArticlePages(),
    ...generateEventPages(),
    ...generateCareerPages()
  ];
}

/**
 * Convert sitemap entries to XML format
 */
export function generateSitemapXML(entries: SitemapEntry[]): string {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  const footer = `</urlset>`;

  const urls = entries.map(entry => {
    let url = `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>`;

    if (entry.images && entry.images.length > 0) {
      entry.images.forEach(image => {
        url += `
    <image:image>
      <image:loc>${image.loc}</image:loc>`;
        if (image.title) {
          url += `
      <image:title>${image.title}</image:title>`;
        }
        if (image.caption) {
          url += `
      <image:caption>${image.caption}</image:caption>`;
        }
        url += `
    </image:image>`;
      });
    }

    url += `
  </url>`;

    return url;
  }).join('\n');

  return `${header}\n${urls}\n${footer}`;
}

/**
 * Generate complete sitemap XML
 */
export function generateCompleteSitemap(): string {
  const entries = generateAllSitemapEntries();
  return generateSitemapXML(entries);
}

export default {
  generateAllSitemapEntries,
  generateSitemapXML,
  generateCompleteSitemap
};