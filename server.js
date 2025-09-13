import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import fs from 'fs';
import path from 'path';

const app = new Hono();

// Bot detection patterns
const BOT_PATTERNS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot',
  'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp', 'telegrambot',
  'crawler', 'spider', 'bot', 'archiver', 'seo', 'lighthouse', 'pagespeed',
  'applebot', 'ahrefsbot', 'semrushbot', 'petalbot', 'mj12bot', 'sogou',
  'pinterestbot', 'adsbot-google', 'mediapartners-google'
];

function isBotRequest(userAgent) {
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some(pattern => ua.includes(pattern));
}

function getSEOFilePath(pathname) {
  const basePath = path.join(process.cwd(), 'build', 'SEO');
  
  // Normalize trailing slashes (except root)
  const normalizedPath = pathname === '/' ? pathname : pathname.replace(/\/$/, '');
  
  const routeMap = {
    '/': 'index.html',
    '/mobile-app-development': 'mobile-application-development.html',
    '/web-application-development': 'web-application-development.html',
    '/website-development': 'web-development.html',
    '/seo-services': 'seo-solutions.html',
    '/business-automation': 'business-automation.html',
    '/articles': 'articles.html',
    '/events': 'events.html',
    '/careers': 'careers.html',
    '/volunteer-with-us': 'volunteer-with-us.html',
    '/learn-about-tepa': 'learn-about-tepa.html',
    '/investors': 'investors.html',
    '/contact-us': 'contact-us.html'
  };

  // Check direct route mapping
  if (routeMap[normalizedPath]) {
    const filePath = path.join(basePath, routeMap[normalizedPath]);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  // Check dynamic routes
  if (normalizedPath.startsWith('/business-automation/')) {
    const slug = normalizedPath.replace('/business-automation/', '');
    if (slug) {
      const filePath = path.join(basePath, 'business-automation', `${slug}.html`);
      if (fs.existsSync(filePath)) return filePath;
    }
  }

  if (normalizedPath.startsWith('/articles/')) {
    const slug = normalizedPath.replace('/articles/', '');
    if (slug) {
      const filePath = path.join(basePath, 'articles', `${slug}.html`);
      if (fs.existsSync(filePath)) return filePath;
    }
  }

  if (normalizedPath.startsWith('/events/')) {
    const slug = normalizedPath.replace('/events/', '');
    if (slug) {
      const filePath = path.join(basePath, 'events', `${slug}.html`);
      if (fs.existsSync(filePath)) return filePath;
    }
  }

  if (normalizedPath.startsWith('/careers/')) {
    const slug = normalizedPath.replace('/careers/', '');
    if (slug) {
      const filePath = path.join(basePath, 'careers', `${slug}.html`);
      if (fs.existsSync(filePath)) return filePath;
    }
  }

  return null;
}

// Bot detection middleware
app.use('*', async (c, next) => {
  const userAgent = c.req.header('user-agent') || '';
  const acceptsHTML = c.req.header('accept')?.includes('text/html');
  
  if (acceptsHTML && isBotRequest(userAgent)) {
    const url = new URL(c.req.url);
    const seoFilePath = getSEOFilePath(url.pathname);
    
    if (seoFilePath) {
      try {
        const content = fs.readFileSync(seoFilePath, 'utf8');
        console.log(`🤖 Bot detected: ${userAgent.substring(0, 50)}... → ${seoFilePath}`);
        
        return c.html(content, 200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600'
        });
      } catch (error) {
        console.error('Error serving SEO page:', error);
      }
    }
  }
  
  await next();
});

// Serve static files
app.use('*', serveStatic({ root: './build' }));

// SPA fallback
app.get('*', (c) => {
  const indexPath = path.join(process.cwd(), 'build', 'index.html');
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    return c.html(content);
  }
  return c.notFound();
});

const port = parseInt(process.env.PORT) || 5000;
console.log(`🚀 Server starting on port ${port}`);

serve({
  fetch: app.fetch,
  port
});