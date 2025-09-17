// Enhanced Cloudflare Pages Function middleware 
// Optimized for serving SEO-rich HTML to bots while maintaining SPA for users

export async function onRequest(context) {
  const { request, next, env } = context;
  
  try {
    const userAgent = request.headers.get('User-Agent')?.toLowerCase() || '';
    const url = new URL(request.url);
    
    // Comprehensive bot detection (expanded list)
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
                     userAgent.includes('bot') ||
                     // Additional social media crawlers
                     userAgent.includes('pinterest') ||
                     userAgent.includes('reddit') ||
                     userAgent.includes('tumblr') ||
                     // SEO tools
                     userAgent.includes('screaming') ||
                     userAgent.includes('sitebulb') ||
                     // Preview generators
                     userAgent.includes('preview') ||
                     // Force bot mode with query parameter (for testing)
                     url.searchParams.has('_bot');
    
    if (isCrawler) {
      // Enhanced URL aliases mapping - matches build-pages.ts exactly
      const urlAliases = {
        '/about': '/learn-about-tepa.html',
        '/contact': '/contact/sales.html',  // Fixed path
        '/contact-us': '/contact/sales.html', // Alternative
        '/volunteer': '/volunteer-with-us.html',
        '/digital-transformation': '/business-automation.html'
      };
      
      let pathname = url.pathname;
      
      // Normalize path: remove trailing slash unless it's root
      if (pathname.endsWith('/') && pathname !== '/') {
        pathname = pathname.slice(0, -1);
      }
      
      let htmlPath;
      
      // Check if this is an aliased path first
      if (urlAliases[pathname]) {
        htmlPath = urlAliases[pathname];
      } else {
        // Regular path mapping - matches build script logic
        htmlPath = pathname;
        
        if (htmlPath === '/') {
          htmlPath = '/index.html';
        } else if (!htmlPath.endsWith('.html')) {
          htmlPath = htmlPath + '.html';
        }
      }
      
      console.log(`Bot detected: ${userAgent.substring(0, 50)}`);
      console.log(`Original path: ${pathname}`);
      console.log(`Resolved HTML path: ${htmlPath}`);
      
      // Try to fetch the prerendered HTML file
      const htmlRequest = new Request(url.origin + htmlPath, {
        method: 'GET',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.5',
          'Cache-Control': 'no-cache',
          'User-Agent': 'CF-Pages-Bot-Fetcher'
        }
      });
      
      try {
        const htmlResponse = await context.env.ASSETS.fetch(htmlRequest);
        
        if (htmlResponse && htmlResponse.ok) {
          const htmlContent = await htmlResponse.text();
          
          // Verify this is actually SEO-optimized content
          const hasSEO = htmlContent.includes('<meta property="og:') || 
                        htmlContent.includes('<meta name="description"') ||
                        htmlContent.includes('application/ld+json');
          
          if (hasSEO) {
            console.log(`✅ Serving SEO-optimized HTML for: ${htmlPath}`);
            
            return new Response(htmlContent, {
              status: 200,
              headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, s-maxage=7200',
                'Vary': 'User-Agent',
                'X-Served-By': 'CF-Pages-Bot-SEO',
                'X-Resolved-Path': htmlPath,
                'X-Bot-Detected': userAgent.substring(0, 50),
                'X-SEO-Optimized': 'true'
              }
            });
          } else {
            console.log(`⚠️ HTML found but not SEO-optimized: ${htmlPath}`);
          }
        } else {
          console.log(`❌ HTML file not found: ${htmlPath} (Status: ${htmlResponse?.status})`);
        }
      } catch (fetchError) {
        console.error(`Fetch error for ${htmlPath}:`, fetchError);
      }
      
      // Fallback to index.html for SPA routes
      const indexRequest = new Request(url.origin + '/index.html', {
        method: 'GET',
        headers: request.headers
      });
      
      try {
        const indexResponse = await context.env.ASSETS.fetch(indexRequest);
        
        if (indexResponse && indexResponse.ok) {
          const indexContent = await indexResponse.text();
          
          console.log(`📄 Serving fallback index.html for bot`);
          
          return new Response(indexContent, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=300', // Shorter cache for fallback
              'Vary': 'User-Agent',
              'X-Served-By': 'CF-Pages-Bot-Fallback',
              'X-Requested-Path': pathname,
              'X-Bot-Detected': userAgent.substring(0, 50),
              'X-SEO-Optimized': 'fallback'
            }
          });
        }
      } catch (indexError) {
        console.error('Index.html fetch error:', indexError);
      }
    }
    
    // For regular users, continue to normal processing (SPA)
    console.log(`👤 Regular user request: ${url.pathname}`);
    return await next();
    
  } catch (error) {
    // If anything goes wrong, fall back to normal processing
    console.error('Middleware error:', error);
    return await next();
  }
}