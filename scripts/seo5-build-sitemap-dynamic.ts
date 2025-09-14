#!/usr/bin/env tsx

/**
 * SEO5: Dynamic Sitemap Generator - TypeScript version that uses real content data
 * This script generates sitemaps from actual content data using the full SEO system
 */

import fs from 'fs';
import path from 'path';

// Import pure data without React dependencies
import { articles } from '../src/data/articles-data';
import { events } from '../src/data/events-data';
import { jobPositions } from '../src/data/careers-data';

interface SitemapEntry {
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

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

function generateAllSitemapEntries(): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages: SitemapEntry[] = [
    { url: `${BASE_URL}/`, lastmod: today, changefreq: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/web-application-development`, lastmod: today, changefreq: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/mobile-app-development`, lastmod: today, changefreq: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/website-development`, lastmod: today, changefreq: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/seo-services`, lastmod: today, changefreq: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/business-automation`, lastmod: today, changefreq: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/digital-transformation`, lastmod: today, changefreq: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/articles`, lastmod: today, changefreq: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/events`, lastmod: today, changefreq: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/careers`, lastmod: today, changefreq: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastmod: today, changefreq: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastmod: today, changefreq: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/volunteer`, lastmod: today, changefreq: 'monthly', priority: 0.5 }
  ];

  // Articles - dynamic from real data
  const articlePages: SitemapEntry[] = articles.map(article => {
    const slug = article.slug || generateSlug(article.title);
    return {
      url: `${BASE_URL}/articles/${slug}`,
      lastmod: article.date || today,
      changefreq: 'monthly' as const,
      priority: article.featured ? 0.8 : 0.7,
      images: article.featuredImage ? [{
        loc: article.featuredImage,
        title: article.title,
        caption: article.excerpt
      }] : undefined
    };
  });

  // Events - dynamic from real data
  const eventPages: SitemapEntry[] = events.map(event => ({
    url: `${BASE_URL}/events/${event.slug}`,
    lastmod: event.date || today,
    changefreq: 'weekly' as const,
    priority: event.featured ? 0.8 : 0.6,
    images: event.image ? [{
      loc: event.image,
      title: event.title,
      caption: event.description
    }] : undefined
  }));

  // Careers - dynamic from real data
  const careerPages: SitemapEntry[] = jobPositions.map(job => ({
    url: `${BASE_URL}/careers/${job.slug}`,
    lastmod: job.postedDate || today,
    changefreq: 'weekly' as const,
    priority: 0.6
  }));

  return [...staticPages, ...articlePages, ...eventPages, ...careerPages];
}

function escapeXML(str: string): string {
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

  const footer = `</urlset>`;

  const urls = entries.map(entry => {
    let url = `  <url>
    <loc>${escapeXML(entry.url)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>`;

    // Remove image tags for now to simplify XML structure

    url += `
  </url>`;

    return url;
  }).join('\n');

  return `${header}\n${urls}\n${footer}`;
}

async function generateDynamicSitemap() {
  try {
    console.log('🚀 Starting DYNAMIC sitemap generation from real content data...');

    // Generate entries from actual content data
    const entries = generateAllSitemapEntries();
    
    // Generate the sitemap XML
    const sitemapXML = generateSitemapXML(entries);
    
    // Write to public/sitemap.xml (for development)
    const publicPath = path.join(process.cwd(), 'build', 'sitemap.xml');
    fs.writeFileSync(publicPath, sitemapXML, 'utf8');
    console.log('✅ Generated build/sitemap.xml');
    
    // Write to build/sitemap.xml (for production)
    const buildDir = path.join(process.cwd(), 'build');
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }
    
    const buildPath = path.join(buildDir, 'sitemap.xml');
    fs.writeFileSync(buildPath, sitemapXML, 'utf8');
    console.log('✅ Generated build/sitemap.xml');
    
    // Count entries by type
    const urlCount = entries.length;
    const articleCount = entries.filter(e => e.url.includes('/articles/')).length;
    const eventCount = entries.filter(e => e.url.includes('/events/')).length;
    const careerCount = entries.filter(e => e.url.includes('/careers/')).length;
    const staticCount = urlCount - articleCount - eventCount - careerCount;
    
    console.log(`📊 Dynamic sitemap generated with:`);
    console.log(`   📄 ${staticCount} static pages`);
    console.log(`   📝 ${articleCount} articles`);
    console.log(`   📅 ${eventCount} events`);
    console.log(`   💼 ${careerCount} careers`);
    console.log(`   🎯 ${urlCount} total URLs`);
    
    // Verify specific URLs are included
    const targetUrls = [
      'https://tepasolutions.asia/articles/iphone-17-review-philippines-pricing-release',
      'https://tepasolutions.asia/events/introduction-to-html-and-css',
      'https://tepasolutions.asia/careers/intern-article-writer'
    ];
    
    console.log(`🔍 Verifying target URLs:`);
    targetUrls.forEach(url => {
      const found = entries.some(entry => entry.url === url);
      console.log(`   ${found ? '✅' : '❌'} ${url}`);
    });
    
    console.log('🎉 DYNAMIC sitemap generation completed successfully!');
    
  } catch (error: unknown) {
  if (error instanceof Error) {
    console.error('❌ Error generating dynamic sitemap:', error.message);
    console.error('Stack trace:', error.stack);
  } else {
    console.error('❌ Unknown error:', error);
  }
  process.exit(1);
}

}

// Run the dynamic generator
generateDynamicSitemap();