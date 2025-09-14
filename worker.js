import { Hono } from 'hono';

const app = new Hono();

// Bot detection patterns - Updated for better Google Search Console compatibility
const BOT_PATTERNS = [
  // Google bots (critical for Search Console)
  'googlebot',
  'adsbot-google',
  'mediapartners-google',
  'google-structured-data-testing-tool',
  'google-read-aloud',
  'google-adwords-instant',
  'google page speed',
  'google-site-verification',
  
  // Other search engines
  'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot',
  'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp', 'telegrambot',
  'crawler', 'spider', 'bot', 'archiver', 'seo', 'lighthouse', 'pagespeed',
  'applebot', 'ahrefsbot', 'semrushbot', 'petalbot', 'mj12bot', 'sogou',
  'pinterestbot'
];

function isBotRequest(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some(pattern => ua.includes(pattern));
}

function isGoogleBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return ua.includes('googlebot') || ua.includes('google-') || ua.includes('adsbot-google');
}

function getSEOFileName(pathname) {
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
    '/about': 'learn-about-tepa.html',
    '/investors': 'investors.html',
    '/contact-us': 'contact-us.html',
    '/contact': 'contact-us.html'
  };

  // Check direct route mapping
  if (routeMap[normalizedPath]) {
    return `SEO/${routeMap[normalizedPath]}`;
  }

  // Check dynamic routes
  if (normalizedPath.startsWith('/business-automation/')) {
    const slug = normalizedPath.replace('/business-automation/', '');
    if (slug) {
      return `SEO/business-automation/${slug}.html`;
    }
  }

  if (normalizedPath.startsWith('/articles/')) {
    const slug = normalizedPath.replace('/articles/', '');
    if (slug) {
      return `SEO/articles/${slug}.html`;
    }
  }

  if (normalizedPath.startsWith('/events/')) {
    const slug = normalizedPath.replace('/events/', '');
    if (slug) {
      return `SEO/events/${slug}.html`;
    }
  }

  if (normalizedPath.startsWith('/careers/')) {
    const slug = normalizedPath.replace('/careers/', '');
    if (slug) {
      return `SEO/careers/${slug}.html`;
    }
  }

  return null;
}

// Bot detection middleware - Cloudflare Workers version
app.use('*', async (c, next) => {
  const userAgent = c.req.header('user-agent') || '';
  const acceptsHTML = c.req.header('accept')?.includes('text/html');
  const url = new URL(c.req.url);
  const isBot = isBotRequest(userAgent);
  const isGoogle = isGoogleBot(userAgent);
  
  // Log all bot requests for debugging
  if (isBot) {
    console.log(`🤖 Bot detected: ${userAgent} requesting ${url.pathname}`);
  }
  
  if (acceptsHTML && isBot) {
    const seoFileName = getSEOFileName(url.pathname);
    
    if (seoFileName) {
      try {
        // In Cloudflare Workers, we try to fetch the SEO file from assets
        const seoResponse = await c.env.ASSETS.fetch(new URL(seoFileName, c.req.url));
        
        if (seoResponse.ok) {
          const content = await seoResponse.text();
          console.log(`✅ Serving SEO content: ${seoFileName}`);
          
          // Use different cache headers for Google vs other bots
          const cacheControl = isGoogle ? 
            'public, max-age=300, must-revalidate' :  // 5 minutes for Google
            'public, max-age=3600';                   // 1 hour for others
          
          return c.html(content, 200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': cacheControl,
            'X-Robots-Tag': 'index, follow',
            'X-Bot-Served': 'seo-prerendered'
          });
        }
      } catch (error) {
        console.error(`❌ Error serving SEO page ${seoFileName}:`, error);
        // Fall through to serve SPA instead of failing
      }
    } else {
      console.log(`⚠️  No SEO file found for ${url.pathname}, will serve SPA`);
    }
  }
  
  await next();
});

// Serve static files (handled by Cloudflare Workers automatically)
app.get('*', async (c) => {
  const userAgent = c.req.header('user-agent') || '';
  const isBot = isBotRequest(userAgent);
  const isGoogle = isGoogleBot(userAgent);
  
  try {
    // Try to get the file from assets first
    const assetResponse = await c.env.ASSETS.fetch(c.req);
    
    if (assetResponse.ok) {
      return assetResponse;
    }
    
    // If no specific file found, serve index.html (SPA fallback)
    const indexResponse = await c.env.ASSETS.fetch(new URL('/index.html', c.req.url));
    
    if (indexResponse.ok) {
      const content = await indexResponse.text();
      
      // Log when serving SPA to bots (indicates potential SEO issue)
      if (isBot) {
        console.log(`📄 Serving SPA to bot: ${userAgent.substring(0, 50)}... for ${c.req.url}`);
      }
      
      const headers = {
        'Content-Type': 'text/html; charset=utf-8'
      };
      
      // Add appropriate cache headers
      if (isBot) {
        headers['Cache-Control'] = isGoogle ? 
          'public, max-age=300, must-revalidate' : 
          'public, max-age=1800';
        headers['X-Robots-Tag'] = 'index, follow';
        headers['X-Bot-Served'] = 'spa-fallback';
      } else {
        headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      }
      
      return c.html(content, 200, headers);
    }
    
    return c.notFound();
  } catch (error) {
    console.error('Error serving static content:', error);
    return c.notFound();
  }
});

export default app;