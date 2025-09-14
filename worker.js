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
    console.log(`✅ Found static route mapping: ${fileName}`);
    return fileName;
  }

  // Dynamic routes
  if (normalizedPath.startsWith('/articles/')) {
    const slug = normalizedPath.replace('/articles/', '');
    if (slug) {
      const fileName = `articles/${slug}.html`;
      console.log(`✅ Found article route: ${fileName}`);
      return fileName;
    }
  }

  if (normalizedPath.startsWith('/events/')) {
    const slug = normalizedPath.replace('/events/', '');
    if (slug) {
      const fileName = `events/${slug}.html`;
      console.log(`✅ Found event route: ${fileName}`);
      return fileName;
    }
  }

  if (normalizedPath.startsWith('/careers/')) {
    const slug = normalizedPath.replace('/careers/', '');
    if (slug) {
      const fileName = `careers/${slug}.html`;
      console.log(`✅ Found career route: ${fileName}`);
      return fileName;
    }
  }

  if (normalizedPath.startsWith('/business-automation/')) {
    const slug = normalizedPath.replace('/business-automation/', '');
    if (slug) {
      const fileName = `business-automation/${slug}.html`;
      console.log(`✅ Found business automation route: ${fileName}`);
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
  const accept = c.req.header('accept') || '';
  const url = new URL(c.req.url);
  const isBot = isBotRequest(userAgent);
  
  // For bots, be more permissive with Accept header (missing, */*, or text/html)
  const acceptsHTML = isBot ? 
    (accept === '' || accept.includes('text/html') || accept.includes('*/*')) :
    accept.includes('text/html');
  
  console.log(`🎯 Processing request for: ${url.pathname}`);
  console.log(`🤖 Is bot: ${isBot}`);
  console.log(`📄 Accepts HTML: ${acceptsHTML}`);
  console.log(`📋 Accept Header: ${accept}`);
  
  // Only process HTML requests from bots
  if (!acceptsHTML || !isBot) {
    console.log(`⏭️ Skipping SEO processing - not a bot HTML request`);
    return await next();
  }
  
  console.log(`🤖 Bot detected: ${userAgent.substring(0, 50)}...`);
  
  const seoFileName = getSEOFileName(url.pathname);
  
  if (!seoFileName) {
    console.log(`⚠️ No SEO file mapping found for ${url.pathname}, trying generic fallback`);
    
    // Generic bot fallback - try direct path mapping when no explicit mapping exists
    const fallbackPaths = [
      `${url.pathname}.html`,
      `${url.pathname}/index.html`
    ];
    
    for (const fallbackPath of fallbackPaths) {
      const cleanPath = fallbackPath.replace(/^\/+/, '').replace(/\/+/g, '/');
      console.log(`⚠️ Trying generic fallback: ${cleanPath}`);
      
      const fallbackUrl = new URL('/' + cleanPath, c.req.url);
      const fallbackResponse = await c.env.ASSETS.fetch(fallbackUrl);
      
      if (fallbackResponse.ok) {
        const content = await fallbackResponse.text();
        console.log(`✅ Generic fallback served: ${cleanPath} (${content.length} chars)`);
        
        // Handle HEAD requests
        if (c.req.method === 'HEAD') {
          return new Response(null, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=300, must-revalidate',
              'X-Robots-Tag': 'index, follow',
              'X-Bot-Served': 'seo-fallback',
              'X-SEO-File': cleanPath
            }
          });
        }
        
        return c.html(content, 200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300, must-revalidate',
          'X-Robots-Tag': 'index, follow',
          'X-Bot-Served': 'seo-fallback',
          'X-SEO-File': cleanPath
        });
      }
    }
    
    return await next();
  }
  
  try {
    console.log(`🔍 Attempting to fetch SEO file: ${seoFileName}`);
    
    // Check if ASSETS binding exists
    if (!c.env?.ASSETS) {
      console.error(`❌ ASSETS binding not found in environment`);
      return await next();
    }
    
    const seoUrl = new URL('/' + seoFileName, c.req.url);
    console.log(`🌐 SEO URL: ${seoUrl.href}`);
    
    const seoResponse = await c.env.ASSETS.fetch(seoUrl);
    console.log(`📊 SEO Response status: ${seoResponse.status}`);
    
    if (seoResponse.ok) {
      const content = await seoResponse.text();
      console.log(`✅ Successfully served SEO content: ${seoFileName} (${content.length} chars)`);
      
      // Handle HEAD requests
      if (c.req.method === 'HEAD') {
        return new Response(null, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300, must-revalidate',
            'X-Robots-Tag': 'index, follow',
            'X-Bot-Served': 'seo-prerendered',
            'X-SEO-File': seoFileName
          }
        });
      }
      
      return c.html(content, 200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300, must-revalidate',
        'X-Robots-Tag': 'index, follow',
        'X-Bot-Served': 'seo-prerendered',
        'X-SEO-File': seoFileName
      });
    } else {
      console.log(`⚠️ SEO file not found: ${seoFileName} (${seoResponse.status})`);
      
      // Generic bot fallback - try direct path mapping
      const fallbackPaths = [
        `${url.pathname}.html`,
        `${url.pathname}/index.html`
      ];
      
      for (const fallbackPath of fallbackPaths) {
        const cleanPath = fallbackPath.replace(/^\/+/, '').replace(/\/+/g, '/');
        console.log(`⚠️ Trying generic fallback: ${cleanPath}`);
        
        const fallbackUrl = new URL('/' + cleanPath, c.req.url);
        const fallbackResponse = await c.env.ASSETS.fetch(fallbackUrl);
        
        if (fallbackResponse.ok) {
          const content = await fallbackResponse.text();
          console.log(`✅ Generic fallback served: ${cleanPath} (${content.length} chars)`);
          
          // Handle HEAD requests
          if (c.req.method === 'HEAD') {
            return new Response(null, {
              status: 200,
              headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, max-age=300, must-revalidate',
                'X-Robots-Tag': 'index, follow',
                'X-Bot-Served': 'seo-fallback',
                'X-SEO-File': cleanPath
              }
            });
          }
          
          return c.html(content, 200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300, must-revalidate',
            'X-Robots-Tag': 'index, follow',
            'X-Bot-Served': 'seo-fallback',
            'X-SEO-File': cleanPath
          });
        }
      }
    }
    
  } catch (error) {
    console.error(`❌ Error serving SEO file ${seoFileName}:`, error);
  }
  
  console.log(`📄 Falling back to SPA for bot request`);
  await next();
});

// Main route handler for all requests (GET and HEAD)
app.all('*', async (c) => {
  const url = new URL(c.req.url);
  const userAgent = c.req.header('user-agent') || '';
  const accept = c.req.header('accept') || '';
  const isBot = isBotRequest(userAgent);
  const acceptsHTML = accept.includes('text/html') || accept.includes('*/*');
  
  console.log(`🎯 Handling ${c.req.method} request for: ${url.pathname}`);
  
  // Handle HEAD requests for crawlers
  if (c.req.method === 'HEAD') {
    console.log(`🤖 HEAD request from: ${userAgent.substring(0, 50)}...`);
    
    // For bots, try to return headers for SEO content
    if (acceptsHTML && isBot) {
      console.log(`🤖 Bot HEAD request, checking SEO files`);
      
      const seoFileName = getSEOFileName(url.pathname);
      
      if (seoFileName) {
        // Try mapped SEO file
        const seoUrl = new URL('/' + seoFileName, c.req.url);
        const seoResponse = await c.env.ASSETS.fetch(seoUrl, { method: 'HEAD' });
        
        if (seoResponse.ok) {
          return new Response(null, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=300, must-revalidate',
              'X-Robots-Tag': 'index, follow',
              'X-Bot-Served': 'seo-prerendered',
              'X-SEO-File': seoFileName
            }
          });
        }
      }
      
      // Generic bot fallback for HEAD
      const fallbackPaths = [
        `${url.pathname}.html`,
        `${url.pathname}/index.html`
      ];
      
      for (const fallbackPath of fallbackPaths) {
        const cleanPath = fallbackPath.replace(/^\/+/, '').replace(/\/+/g, '/');
        const fallbackUrl = new URL('/' + cleanPath, c.req.url);
        const fallbackResponse = await c.env.ASSETS.fetch(fallbackUrl, { method: 'HEAD' });
        
        if (fallbackResponse.ok) {
          return new Response(null, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=300, must-revalidate',
              'X-Robots-Tag': 'index, follow',
              'X-Bot-Served': 'seo-fallback',
              'X-SEO-File': cleanPath
            }
          });
        }
      }
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
  }
  
  // Handle GET requests
  try {
    // Check if ASSETS binding exists
    if (!c.env?.ASSETS) {
      console.error(`❌ ASSETS binding not available`);
      return c.text('ASSETS binding not configured', 500);
    }
    
    // For HTML requests from humans, always serve SPA (home.html)
    if (acceptsHTML && !isBot) {
      console.log(`👤 Human detected, serving SPA`);
      const spaResponse = await c.env.ASSETS.fetch(new URL('/home.html', c.req.url));
      
      if (spaResponse.ok) {
        const content = await spaResponse.text();
        console.log(`✅ Serving SPA: home.html (${content.length} chars)`);
        
        return c.html(content, 200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
      }
    }
    
    // For non-HTML requests or static assets, try to serve static file
    if (!acceptsHTML) {
      console.log(`🔍 Checking for static asset: ${url.pathname}`);
      const assetResponse = await c.env.ASSETS.fetch(c.req);
      
      if (assetResponse.ok) {
        console.log(`✅ Serving static asset: ${url.pathname}`);
        return assetResponse;
      }
    }
    
    console.log(`❌ Asset not found: ${url.pathname}`);
    return c.text('Not found', 404);
    
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