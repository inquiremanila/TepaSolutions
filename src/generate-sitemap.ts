#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { generateSitemap, generateSitemapIndex, sitemapUrls } from './utils/sitemap-generator';

// Ensure public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate main sitemap
const sitemapXml = generateSitemap();
const sitemapPath = path.join(publicDir, 'sitemap.xml');

try {
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
  console.log(`✅ Generated sitemap.xml with ${sitemapUrls.length} URLs`);
  console.log(`📍 Saved to: ${sitemapPath}`);
  
  // Generate sitemap index
  const sitemapIndexXml = generateSitemapIndex();
  const sitemapIndexPath = path.join(publicDir, 'sitemap-index.xml');
  fs.writeFileSync(sitemapIndexPath, sitemapIndexXml, 'utf8');
  console.log(`✅ Generated sitemap-index.xml`);
  console.log(`📍 Saved to: ${sitemapIndexPath}`);
  
  // List all URLs for verification
  console.log('\n📋 Sitemap URLs:');
  sitemapUrls.forEach((url, index) => {
    console.log(`${index + 1}. ${url.url}`);
    if (url.images && url.images.length > 0) {
      console.log(`   📸 Images: ${url.images.length}`);
    }
  });
  
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}