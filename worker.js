import { Hono } from 'hono';

const app = new Hono();

// Bot detection patterns
const BOT_PATTERNS = [
  'googlebot', 'adsbot-google', 'mediapartners-google', 'bingbot', 'slurp', 
  'duckduckbot', 'baiduspider', 'yandexbot', 'facebookexternalhit', 'twitterbot',
  'crawler', 'spider', 'bot', 'lighthouse', 'pagespeed'
];

function isBotRequest(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some(pattern => ua.includes(pattern));
}

function getSEOFileName(pathname) {
  console.log(`🔍 Getting SEO file for pathname: ${pathname}`);
  
  // Remove trailing slash except for root
  const normalizedPath = pathname === '/' ? pathname : pathname.replace(/\/$/, '');
  console.log(`📝 Normalized path: ${normalizedPath}`);
  
  const routeMap = {
    '/': 'index.html',
    '/mobile-app-development': 'mobile-app-development.html',
    '/web-application-development': 'web-application-development.html',
    '/website-development': 'website-development.html',
    '/seo-services': 'seo-services.html',
    '/business-automation': 'business-automation.html',
    '/articles': 'articles.html',
    '/events': 'events.html',
    '/careers': 'careers.html',
    '/about': 'learn-about-tepa.html',
    '/contact': 'contact-us.html'
  };

  // Check static routes first
  if (routeMap[normalizedPath]) {
    const fileName = `SEO/${routeMap[normalizedPath]}`;
    console.log(`✅ Found static route mapping: ${fileName}`);
    return fileName;
  }

  // Dynamic routes
  if (normalizedPath.startsWith('/articles/')) {
    const slug = normalizedPath.replace('/articles/', '');
    if (slug) {
      const fileName = `SEO/articles/${slug}.html`;
      console.log(`✅ Found article route: ${fileName}`);
      return fileName;
    }
  }

  if (normalizedPath.startsWith('/events/')) {
    const slug = normalizedPath.replace('/events/', '');
    if (slug) {
      const fileName = `SEO/events/${slug}.html`;
      console.log(`✅ Found event route: ${fileName}`);
      return fileName;
    }
  }

  if (normalizedPath.startsWith('/careers/')) {
    const slug = normalizedPath.replace('/careers/', '');
    if (slug) {
      const fileName = `SEO/careers/${slug}.html`;
      console.log(`✅ Found career route: ${fileName}`);
      return fileName;
    }
  }

  console.log(`❌ No SEO mapping found for: ${normalizedPath}`);
  return null;
}

// Debug middleware
app.use('*', async (c, next) => {
  const start = Date.now();
  const userAgent = c.req.header('user-agent') || '';
  const url = new URL(c.req.url);
  
  console.log(`🌐 Request: ${c.req.method} ${url.pathname}`);
  console.log(`🤖 User Agent: ${userAgent.substring(0, 100)}...`);
  console.log(`📋 Accept Header: ${c.req.header('accept')}`);
  
  try {
    await next();
    const duration = Date.now() - start;
    console.log(`⏱️ Request completed in ${duration}ms`);
  } catch (error) {
    console.error(`❌ Request failed:`, error);
    return c.text(`Error: ${error.message}`, 500);
  }
});

// Bot detection and SEO serving middleware
app.use('*', async (c, next) => {
  const userAgent = c.req.header('user-agent') || '';
  const acceptsHTML = c.req.header('accept')?.includes('text/html');
  const url = new URL(c.req.url);
  const isBot = isBotRequest(userAgent);
  
  console.log(`🎯 Processing request for: ${url.pathname}`);
  console.log(`🤖 Is bot: ${isBot}`);
  console.log(`📄 Accepts HTML: ${acceptsHTML}`);
  
  // Only process HTML requests from bots
  if (!acceptsHTML || !isBot) {
    console.log(`⏭️ Skipping SEO processing - not a bot HTML request`);
    return await next();
  }
  
  console.log(`🤖 Bot detected: ${userAgent.substring(0, 50)}...`);
  
  const seoFileName = getSEOFileName(url.pathname);
  
  if (!seoFileName) {
    console.log(`⚠️ No SEO file mapping found for ${url.pathname}`);
    return await next();
  }
  
  try {
    console.log(`🔍 Attempting to fetch SEO file: ${seoFileName}`);
    
    // Check if ASSETS binding exists
    if (!c.env?.ASSETS) {
      console.error(`❌ ASSETS binding not found in environment`);
      return await next();
    }
    
    const seoUrl = new URL(seoFileName, c.req.url);
    console.log(`🌐 SEO URL: ${seoUrl.href}`);
    
    const seoResponse = await c.env.ASSETS.fetch(seoUrl);
    console.log(`📊 SEO Response status: ${seoResponse.status}`);
    
    if (seoResponse.ok) {
      const content = await seoResponse.text();
      console.log(`✅ Successfully served SEO content: ${seoFileName} (${content.length} chars)`);
      
      return c.html(content, 200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300, must-revalidate',
        'X-Robots-Tag': 'index, follow',
        'X-Bot-Served': 'seo-prerendered',
        'X-SEO-File': seoFileName
      });
    } else {
      console.log(`⚠️ SEO file not found: ${seoFileName} (${seoResponse.status})`);
    }
    
  } catch (error) {
    console.error(`❌ Error serving SEO file ${seoFileName}:`, error);
  }
  
  console.log(`📄 Falling back to SPA for bot request`);
  await next();
});

// Main route handler
app.get('*', async (c) => {
  const url = new URL(c.req.url);
  console.log(`🎯 Handling route: ${url.pathname}`);
  
  try {
    // Check if ASSETS binding exists
    if (!c.env?.ASSETS) {
      console.error(`❌ ASSETS binding not available`);
      return c.text('ASSETS binding not configured', 500);
    }
    
    // Try to serve static file first
    console.log(`🔍 Checking for static file: ${url.pathname}`);
    const assetResponse = await c.env.ASSETS.fetch(c.req);
    
    if (assetResponse.ok) {
      console.log(`✅ Serving static file: ${url.pathname}`);
      return assetResponse;
    }
    
    console.log(`📄 Static file not found, serving SPA fallback`);
    
    // Serve SPA (index.html)
    const indexResponse = await c.env.ASSETS.fetch(new URL('/index.html', c.req.url));
    
    if (indexResponse.ok) {
      const content = await indexResponse.text();
      console.log(`✅ Serving SPA: index.html (${content.length} chars)`);
      
      return c.html(content, 200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
    }
    
    console.log(`❌ index.html not found`);
    return c.text('Application not found', 404);
    
  } catch (error) {
    console.error(`❌ Error in main handler:`, error);
    return c.text(`Server Error: ${error.message}`, 500);
  }
});

// Global error handler
app.onError((err, c) => {
  console.error(`🚨 Global error handler:`, err);
  return c.text(`Internal Server Error: ${err.message}`, 500);
});

export default app;