 // Cloudflare Pages Function middleware to serve SEO-optimized HTML to bots
// while serving the SPA to regular users

export async function onRequest(context) {
  const { request, next, env } = context;
  
  try {
    const userAgent = request.headers.get('User-Agent')?.toLowerCase() || '';
    const url = new URL(request.url);
    
    // Known bot/crawler user agents that need prerendered HTML
    const isCrawler = userAgent.includes('googlebot') ||
                     userAgent.includes('bingbot') ||
                     userAgent.includes('slurp') ||
                     userAgent.includes('duckduckbot') ||
                     userAgent.includes('baiduspider') ||
                     userAgent.includes('yandexbot') ||
                     userAgent.includes('facebookexternalhit') ||
                     userAgent.includes('twitterbot') ||
                     userAgent.includes('linkedinbot') ||
                     userAgent.includes('telegrambot') ||
                     userAgent.includes('whatsapp') ||
                     userAgent.includes('skype') ||
                     userAgent.includes('slack') ||
                     userAgent.includes('discord') ||
                     userAgent.includes('applebot') ||
                     userAgent.includes('petalbot') ||
                     userAgent.includes('mj12bot') ||
                     userAgent.includes('ahrefsbot') ||
                     userAgent.includes('semrushbot') ||
                     userAgent.includes('crawl') ||
                     userAgent.includes('spider') ||
                     userAgent.includes('bot');
    
    if (isCrawler) {
      // URL aliases mapping to correct HTML files
      const urlAliases = {
        '/about': '/learn-about-tepa.html',
        '/contact': '/contact-us/sales.html',
        '/volunteer': '/volunteer-with-us.html',
        '/digital-transformation': '/business-automation.html'
      };
      
      let pathname = url.pathname;
      
      // Normalize path: remove trailing slash unless it's root
      if (pathname.endsWith('/') && pathname !== '/') {
        pathname = pathname.slice(0, -1);
      }
      
      let htmlPath;
      
      // Check if this is an aliased path
      if (urlAliases[pathname]) {
        htmlPath = urlAliases[pathname];
      } else {
        // Regular path mapping
        htmlPath = pathname;
        
        // Remove trailing slash and add .html extension if needed
        if (htmlPath.endsWith('/') && htmlPath !== '/') {
          htmlPath = htmlPath.slice(0, -1);
        }
        
        if (htmlPath === '/') {
          htmlPath = '/index.html';
        } else if (!htmlPath.endsWith('.html')) {
          htmlPath = htmlPath + '.html';
        }
      }
      
      // Try to fetch the prerendered HTML file
      const htmlRequest = new Request(url.origin + htmlPath, {
        method: 'GET',
        headers: request.headers
      });
      
      const htmlResponse = await context.env.ASSETS.fetch(htmlRequest);
      
      if (htmlResponse && htmlResponse.ok) {
        // Return the prerendered HTML with proper headers
        const htmlContent = await htmlResponse.text();
        
        return new Response(htmlContent, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=7200',
            'Vary': 'User-Agent',
            'X-Served-By': 'CF-Pages-Bot-Middleware',
            'X-Resolved-Path': htmlPath,
            'X-Bot-Detected': userAgent.substring(0, 50) // First 50 chars for debugging
          }
        });
      }
      
      // If HTML file doesn't exist, fall back to index.html for SPA
      const indexRequest = new Request(url.origin + '/index.html', {
        method: 'GET',
        headers: request.headers
      });
      
      const indexResponse = await context.env.ASSETS.fetch(indexRequest);
      
      if (indexResponse && indexResponse.ok) {
        const indexContent = await indexResponse.text();
        
        return new Response(indexContent, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300', // Shorter cache for fallback
            'Vary': 'User-Agent',
            'X-Served-By': 'CF-Pages-Bot-Fallback',
            'X-Requested-Path': pathname,
            'X-Bot-Detected': userAgent.substring(0, 50)
          }
        });
      }
    }
    
    // For regular users, continue to normal processing (SPA)
    return await next();
    
  } catch (error) {
    // If anything goes wrong, fall back to normal processing
    console.error('Middleware error:', error);
    return await next();
  }
}