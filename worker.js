import { Hono } from 'hono';

const app = new Hono();

// Bot detection patterns - more specific to avoid false positives
const BOT_PATTERNS = [
  'googlebot', 'adsbot-google', 'mediapartners-google', 
  'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 
  'yandexbot', 'facebookexternalhit', 'twitterbot',
  'linkedinbot', 'whatsapp', 'pinterest', 'redditbot',
  'crawler', 'spider', 'bot\\-', '\\bbot\\b', 'lighthouse', 
  'pagespeed', 'semrush', 'ahrefs', 'moz\\.com'
];

function isBotRequest(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some(pattern => {
    const regex = new RegExp(pattern, 'i');
    return regex.test(ua);
  });
}

function getSEOFileName(pathname) {
  console.log(`Getting SEO file for pathname: ${pathname}`);
  
  // Remove trailing slash except for root
  const normalizedPath = pathname === '/' ? pathname : pathname.replace(/\/$/, '');
  console.log(`Normalized path: ${normalizedPath}`);
  
  const routeMap = {
    '/': 'index.html',
    '/mobile-app-development': 'mobile-application-development.html',
    '/mobile-application-development': 'mobile-application-development.html',
    '/web-application-development': 'web-application-development.html',
    '/website-development': 'web-development.html',
    '/web-development': 'web-development.html',
    '/seo-services': 'seo-solutions.html',
    '/seo-solutions': 'seo-solutions.html',
    '/business-automation': 'business-automation.html',
    '/articles': 'articles.html',
    '/events': 'events.html',
    '/careers': 'careers.html',
    '/about': 'learn-about-tepa.html',
    '/learn-about-tepa': 'learn-about-tepa.html',
    '/contact': 'contact-us.html',
    '/contact-us': 'contact-us.html',
    '/investors': 'investors.html',
    '/volunteer-with-us': 'volunteer-with-us.html'
  };

  // Check static routes first
  if (routeMap[normalizedPath]) {
    const fileName = routeMap[normalizedPath];
    console.log(`Found static route mapping: ${fileName}`);
    return fileName;
  }

  // Dynamic routes
  if (normalizedPath.startsWith('/articles/')) {
    const slug = normalizedPath.replace('/articles/', '');
    if (slug) {
      const fileName = `articles/${slug}.html`;
      console.log(`Found article route: ${fileName}`);
      return fileName;
    }
  }

  if (normalizedPath.startsWith('/events/')) {
    const slug = normalizedPath.replace('/events/', '');
    if (slug) {
      const fileName = `events/${slug}.html`;
      console.log(`Found event route: ${fileName}`);
      return fileName;
    }
  }

  if (normalizedPath.startsWith('/careers/')) {
    const slug = normalizedPath.replace('/careers/', '');
    if (slug) {
      const fileName = `careers/${slug}.html`;
      console.log(`Found career route: ${fileName}`);
      return fileName;
    }
  }

  if (normalizedPath.startsWith('/business-automation/')) {
    const slug = normalizedPath.replace('/business-automation/', '');
    if (slug) {
      const fileName = `business-automation/${slug}.html`;
      console.log(`Found business automation route: ${fileName}`);
      return fileName;
    }
  }

  console.log(`No SEO mapping found for: ${normalizedPath}`);
  return null;
}

// Debug middleware
app.use('*', async (c, next) => {
  const start = Date.now();
  const userAgent = c.req.header('user-agent') || '';
  const url = new URL(c.req.url);
  
  console.log(`Request: ${c.req.method} ${url.pathname}`);
  console.log(`User Agent: ${userAgent.substring(0, 100)}...`);
  console.log(`Accept Header: ${c.req.header('accept')}`);
  
  try {
    await next();
    const duration = Date.now() - start;
    console.log(`Request completed in ${duration}ms`);
  } catch (error) {
    console.error(`Request failed:`, error);
    return c.text(`Error: ${error.message}`, 500);
  }
});

// Bot routes - serve SEO files and sitemap at /bot/*
app.get('/bot/sitemap.xml', async (c) => {
  console.log('Bot sitemap requested');
  
  try {
    const sitemapResponse = await c.env.ASSETS.fetch(new URL('/sitemap.xml', c.req.url));
    if (sitemapResponse.ok) {
      const content = await sitemapResponse.text();
      return new Response(content, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600',
          'X-Bot-Served': 'sitemap'
        }
      });
    }
  } catch (error) {
    console.error('Error serving bot sitemap:', error);
  }
  
  return c.text('Sitemap not found', 404);
});

app.get('/bot/robots.txt', async (c) => {
  console.log('Bot robots.txt requested');
  
  try {
    const robotsResponse = await c.env.ASSETS.fetch(new URL('/robots.txt', c.req.url));
    if (robotsResponse.ok) {
      const content = await robotsResponse.text();
      return new Response(content, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'public, max-age=86400',
          'X-Bot-Served': 'robots'
        }
      });
    }
  } catch (error) {
    console.error('Error serving bot robots.txt:', error);
  }
  
  return c.text('Robots.txt not found', 404);
});

app.get('/bot/*', async (c) => {
  const url = new URL(c.req.url);
  const pathname = url.pathname.replace('/bot', '') || '/';
  
  console.log(`Bot SEO request for: ${pathname}`);
  
  const seoFileName = getSEOFileName(pathname);
  
  if (!seoFileName) {
    console.log(`No SEO file mapping found for ${pathname}, trying generic fallback`);
    
    // Generic bot fallback
    const fallbackPaths = [
      `${pathname}.html`,
      `${pathname}/index.html`
    ];
    
    for (const fallbackPath of fallbackPaths) {
      const cleanPath = fallbackPath.replace(/^\/+/, '').replace(/\/+/g, '/');
      console.log(`Trying generic fallback: ${cleanPath}`);
      
      const fallbackUrl = new URL('/' + cleanPath, c.req.url);
      const fallbackResponse = await c.env.ASSETS.fetch(fallbackUrl);
      
      if (fallbackResponse.ok) {
        const content = await fallbackResponse.text();
        console.log(`Generic fallback served: ${cleanPath} (${content.length} chars)`);
        
        return c.html(content, 200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300, must-revalidate',
          'X-Robots-Tag': 'index, follow',
          'X-Bot-Served': 'seo-fallback',
          'X-SEO-File': cleanPath
        });
      }
    }
    
    return c.text('SEO content not found', 404);
  }
  
  try {
    console.log(`Attempting to fetch SEO file: ${seoFileName}`);
    
    const seoUrl = new URL('/' + seoFileName, c.req.url);
    console.log(`SEO URL: ${seoUrl.href}`);
    
    const seoResponse = await c.env.ASSETS.fetch(seoUrl);
    console.log(`SEO Response status: ${seoResponse.status}`);
    
    if (seoResponse.ok) {
      const content = await seoResponse.text();
      console.log(`Successfully served SEO content: ${seoFileName} (${content.length} chars)`);
      
      return c.html(content, 200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300, must-revalidate',
        'X-Robots-Tag': 'index, follow',
        'X-Bot-Served': 'seo-prerendered',
        'X-SEO-File': seoFileName
      });
    } else {
      console.log(`SEO file not found: ${seoFileName} (${seoResponse.status})`);
      return c.text('SEO file not found', 404);
    }
    
  } catch (error) {
    console.error(`Error serving SEO file ${seoFileName}:`, error);
    return c.text('Error serving SEO content', 500);
  }
});

// Bot detection and redirect middleware for main routes
app.use('*', async (c, next) => {
  const userAgent = c.req.header('user-agent') || '';
  const accept = c.req.header('accept') || '';
  const url = new URL(c.req.url);
  const isBot = isBotRequest(userAgent);
  
  // Skip processing for /bot routes, sitemap, robots
  if (url.pathname.startsWith('/bot/') || 
      url.pathname === '/sitemap.xml' || 
      url.pathname === '/robots.txt') {
    return await next();
  }
  
  // For bots, be more permissive with Accept header (missing, */*, or text/html)
  const acceptsHTML = isBot ? 
    (accept === '' || accept.includes('text/html') || accept.includes('*/*')) :
    accept.includes('text/html');
  
  console.log(`Processing request for: ${url.pathname}`);
  console.log(`Is bot: ${isBot}`);
  console.log(`Accepts HTML: ${acceptsHTML}`);
  console.log(`Accept Header: ${accept}`);
  
  // Redirect bots to /bot/* routes for SEO content (including root)
  if (acceptsHTML && isBot) {
    const botPath = url.pathname === '/' ? '/bot/' : `/bot${url.pathname}`;
    console.log(`Bot detected, redirecting to ${botPath}`);
    return c.redirect(botPath, 301);
  }
  
  console.log(`Continuing to main handler - not a bot HTML request`);
  return await next();
});

// HEAD handler for crawlers
app.on('HEAD', '*', async (c) => {
  const userAgent = c.req.header('user-agent') || '';
  const accept = c.req.header('accept') || '';
  const url = new URL(c.req.url);
  const isBot = isBotRequest(userAgent);
  
  // For bots, be more permissive with Accept header
  const acceptsHTML = isBot ? 
    (accept === '' || accept.includes('text/html') || accept.includes('*/*')) :
    accept.includes('text/html');
  
  console.log(`HEAD request for: ${url.pathname}`);
  console.log(`Is bot: ${isBot}`);
  
  // Redirect bots to /bot/* routes
  if (acceptsHTML && isBot) {
    const botPath = url.pathname === '/' ? '/bot/' : `/bot${url.pathname}`;
    console.log(`Bot HEAD request, redirecting to ${botPath}`);
    return new Response(null, {
      status: 301,
      headers: {
        'Location': botPath
      }
    });
  }
  
  // For humans or non-HTML requests, try static asset first
  if (!acceptsHTML) {
    const assetResponse = await c.env.ASSETS.fetch(c.req, { method: 'HEAD' });
    if (assetResponse.ok) {
      return assetResponse;
    }
  }
  
  // For humans requesting HTML, return SPA headers
  if (acceptsHTML && !isBot) {
    return new Response(null, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
  
  return new Response(null, { status: 404 });
});

// Main route handler
app.get('*', async (c) => {
  const url = new URL(c.req.url);
  const userAgent = c.req.header('user-agent') || '';
  const acceptsHTML = c.req.header('accept')?.includes('text/html');
  const isBot = isBotRequest(userAgent);
  
  console.log(`Handling route: ${url.pathname}`);
  
  try {
    // Check if ASSETS binding exists
    if (!c.env?.ASSETS) {
      console.error(`ASSETS binding not available`);
      return c.text('ASSETS binding not configured', 500);
    }
    
    // For HTML requests from humans, always serve SPA from root index.html
    if (acceptsHTML && !isBot) {
      console.log(`Human detected, serving SPA from root index.html`);
      
      // Try to serve the root index.html (your SPA entry point)
      try {
        // First try to fetch from root level (where your actual SPA should be)
        const spaResponse = await fetch(new URL('/index.html', c.req.url));
        if (spaResponse.ok) {
          const content = await spaResponse.text();
          console.log(`Serving root SPA: index.html (${content.length} chars)`);
          
          return c.html(content, 200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          });
        }
      } catch (rootError) {
        console.log('Root index.html not found, trying assets binding');
      }
      
      // Fallback: try assets binding for index.html
      const assetResponse = await c.env.ASSETS.fetch(new URL('/index.html', c.req.url));
      if (assetResponse.ok) {
        const content = await assetResponse.text();
        console.log(`Serving SPA from assets: index.html (${content.length} chars)`);
        
        return c.html(content, 200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
      }
      
      // If no index.html found, return error
      console.error('No SPA entry point (index.html) found');
      return c.html(`
        <html>
          <head><title>Configuration Error</title></head>
          <body>
            <h1>SPA Entry Point Not Found</h1>
            <p>The index.html file for the SPA could not be found.</p>
            <p>Please ensure your root index.html file is properly deployed.</p>
          </body>
        </html>
      `, 500);
    }
    
    // For non-HTML requests or static assets, try to serve static file
    if (!acceptsHTML) {
      console.log(`Checking for static asset: ${url.pathname}`);
      const assetResponse = await c.env.ASSETS.fetch(c.req);
      
      if (assetResponse.ok) {
        console.log(`Serving static asset: ${url.pathname}`);
        return assetResponse;
      }
    }
    
    console.log(`Asset not found: ${url.pathname}`);
    return c.text('Not found', 404);
    
  } catch (error) {
    console.error(`Error in main handler:`, error);
    return c.text(`Server Error: ${error.message}`, 500);
  }
});

// Global error handler
app.onError((err, c) => {
  console.error(`Global error handler:`, err);
  return c.text(`Internal Server Error: ${err.message}`, 500);
});

export default app;