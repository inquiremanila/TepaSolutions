// Enhanced Cloudflare Pages Function middleware with SEO optimization
// Serves optimized HTML to bots while maintaining SPA experience for users

export async function onRequest(context) {
  const { request, next, env } = context;
  
  try {
    const userAgent = request.headers.get('User-Agent')?.toLowerCase() || '';
    const url = new URL(request.url);
    
    // Comprehensive bot/crawler detection
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
                     userAgent.includes('sistrix') ||
                     userAgent.includes('screaming') ||
                     userAgent.includes('seobility') ||
                     userAgent.includes('crawl') ||
                     userAgent.includes('spider') ||
                     userAgent.includes('bot') ||
                     // Social media crawlers
                     userAgent.includes('pinterest') ||
                     userAgent.includes('tumblr') ||
                     userAgent.includes('reddit') ||
                     // SEO tools
                     userAgent.includes('lighthouse') ||
                     userAgent.includes('pagespeed') ||
                     userAgent.includes('gtmetrix') ||
                     // Archive crawlers
                     userAgent.includes('archive.org') ||
                     userAgent.includes('wayback');
    
    if (isCrawler) {
      let pathname = url.pathname;
      
      // Normalize path: remove trailing slash unless it's root
      if (pathname.endsWith('/') && pathname !== '/') {
        pathname = pathname.slice(0, -1);
      }
      
      // URL aliases and redirects for better SEO
      const urlAliases = {
        // Common aliases
        '/about': '/learn-about-tepa.html',
        '/contact': '/contact-us/sales.html',
        '/get-quote': '/contact-us/sales.html',
        '/support': '/contact-us/support.html',
        '/volunteer': '/contact-us/volunteer.html',
        '/join': '/careers.html',
        '/jobs': '/careers.html',
        
        // Service aliases
        '/automation': '/business-automation.html',
        '/digital-transformation': '/business-automation.html',
        '/mobile-apps': '/mobile-app-development.html',
        '/web-apps': '/web-application-development.html',
        '/websites': '/website-development.html',
        '/seo': '/seo-services.html',
        '/search-engine-optimization': '/seo-services.html',
        
        // Business automation sub-services
        '/sales-automation': '/business-automation/sales-process-automation.html',
        '/marketing-automation': '/business-automation/marketing-automation.html',
        '/support-automation': '/business-automation/customer-support-automation.html',
        '/hr-automation': '/business-automation/hr-automation.html',
        '/finance-automation': '/business-automation/finance-automation.html',
        '/inventory-automation': '/business-automation/inventory-management-automation.html',
        
        // Regional pages (future expansion)
        '/us': '/index.html',
        '/uk': '/index.html',
        '/au': '/index.html',
        '/ph': '/index.html',
        '/philippines': '/index.html',
        '/united-states': '/index.html',
        '/united-kingdom': '/index.html',
        '/australia': '/index.html'
      };
      
      let htmlPath;
      
      // Check if this is an aliased path
      if (urlAliases[pathname]) {
        htmlPath = urlAliases[pathname];
      } else {
        // Regular path mapping
        htmlPath = pathname;
        
        // Handle dynamic routes
        if (pathname.startsWith('/articles/') || 
            pathname.startsWith('/events/') || 
            pathname.startsWith('/careers/')) {
          
          // For dynamic routes, try the specific file first
          if (pathname === '/') {
            htmlPath = '/index.html';
          } else if (!pathname.endsWith('.html')) {
            htmlPath = pathname + '.html';
          }
        } else {
          // Static routes
          if (pathname === '/') {
            htmlPath = '/index.html';
          } else if (!pathname.endsWith('.html')) {
            htmlPath = pathname + '.html';
          }
        }
      }
      
      // Try to fetch the prerendered HTML file
      const htmlRequest = new Request(url.origin + htmlPath, {
        method: 'GET',
        headers: request.headers
      });
      
      const htmlResponse = await context.env.ASSETS.fetch(htmlRequest);
      
      if (htmlResponse && htmlResponse.ok) {
        const htmlContent = await htmlResponse.text();
        
        // Enhance HTML content for bots with additional SEO signals
        const enhancedHtml = enhanceHtmlForBots(htmlContent, pathname, userAgent);
        
        return new Response(enhancedHtml, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=7200',
            'Vary': 'User-Agent',
            'X-Served-By': 'CF-Pages-SEO-Bot',
            'X-Resolved-Path': htmlPath,
            'X-Bot-Detected': userAgent.substring(0, 50),
            'X-Crawl-Time': new Date().toISOString(),
            // Additional SEO headers
            'X-Robots-Tag': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            'Link': `<${url.origin}${pathname}>; rel="canonical"`,
            'Referrer-Policy': 'strict-origin-when-cross-origin'
          }
        });
      }
      
      // If specific HTML file doesn't exist, try fallback strategies
      const fallbackStrategies = [
        // Try parent directory index
        pathname.split('/').slice(0, -1).join('/') + '/index.html',
        // Try removing last segment
        pathname.split('/').slice(0, -1).join('/') + '.html',
        // Main fallback
        '/index.html'
      ];
      
      for (const fallbackPath of fallbackStrategies) {
        if (fallbackPath === '/index.html' || fallbackPath === '.html') {
          const indexRequest = new Request(url.origin + '/index.html', {
            method: 'GET',
            headers: request.headers
          });
          
          const indexResponse = await context.env.ASSETS.fetch(indexRequest);
          
          if (indexResponse && indexResponse.ok) {
            let indexContent = await indexResponse.text();
            
            // Customize index.html for the specific path
            indexContent = customizeIndexForPath(indexContent, pathname);
            
            return new Response(indexContent, {
              status: 200,
              headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, max-age=300',
                'Vary': 'User-Agent',
                'X-Served-By': 'CF-Pages-SEO-Fallback',
                'X-Requested-Path': pathname,
                'X-Fallback-Used': 'index.html',
                'X-Bot-Detected': userAgent.substring(0, 50)
              }
            });
          }
          break;
        }
      }
    }
    
    // Handle special files for bots
    if (pathname === '/sitemap.xml' || pathname === '/robots.txt') {
      return await next();
    }
    
    // For regular users, continue to normal SPA processing
    const response = await next();
    
    // Add security headers for regular users
    if (!isCrawler) {
      const newHeaders = new Headers(response.headers);
      newHeaders.set('X-Content-Type-Options', 'nosniff');
      newHeaders.set('X-Frame-Options', 'DENY');
      newHeaders.set('X-XSS-Protection', '1; mode=block');
      newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }
    
    return response;
    
  } catch (error) {
    // If anything goes wrong, fall back to normal processing
    console.error('Enhanced middleware error:', error);
    return await next();
  }
}

// Enhance HTML content specifically for bots
function enhanceHtmlForBots(htmlContent, pathname, userAgent) {
  // Add additional meta tags for specific bot types
  let enhancements = '';
  
  if (userAgent.includes('googlebot')) {
    enhancements += `
    <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
    <meta name="googlebot" content="index, follow, max-image-preview:large" />`;
  }
  
  if (userAgent.includes('bingbot')) {
    enhancements += `
    <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />`;
  }
  
  if (userAgent.includes('facebookexternalhit')) {
    enhancements += `
    <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />`;
  }
  
  // Add bot-specific structured data
  const botStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": `https://tepasolutions.asia${pathname}`,
    "lastReviewed": new Date().toISOString(),
    "reviewedBy": {
      "@type": "Organization",
      "name": "Tepa Solutions"
    }
  };
  
  enhancements += `
  <script type="application/ld+json">
${JSON.stringify(botStructuredData, null, 2)}
  </script>`;
  
  // Insert enhancements before closing head tag
  return htmlContent.replace('</head>', enhancements + '\n</head>');
}

// Customize index.html for specific paths when serving as fallback
function customizeIndexForPath(indexContent, pathname) {
  // Extract dynamic information from path
  let customTitle = 'Tepa Solutions - Digital Transformation & Business Automation';
  let customDescription = 'Transform your business with cutting-edge automation and digital solutions.';
  
  if (pathname.startsWith('/articles/')) {
    const slug = pathname.split('/').pop();
    const title = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Article';
    customTitle = `${title} | Tepa Solutions Blog`;
    customDescription = `Read about ${title.toLowerCase()} and other digital transformation insights from Tepa Solutions.`;
  } else if (pathname.startsWith('/events/')) {
    const slug = pathname.split('/').pop();
    const title = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Event';
    customTitle = `${title} | Tepa Solutions Events`;
    customDescription = `Join us for ${title.toLowerCase()} and other technology events and workshops.`;
  } else if (pathname.startsWith('/careers/')) {
    const slug = pathname.split('/').pop();
    const title = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Career';
    customTitle = `${title} | Careers | Tepa Solutions`;
    customDescription = `Apply for ${title.toLowerCase()} position and join our global team of digital transformation experts.`;
  }
  
  // Update title and description in the HTML
  indexContent = indexContent.replace(
    /<title>.*?<\/title>/i, 
    `<title>${customTitle}</title>`
  );
  
  indexContent = indexContent.replace(
    /<meta name="description" content=".*?"[^>]*>/i, 
    `<meta name="description" content="${customDescription}" />`
  );
  
  // Update Open Graph tags
  indexContent = indexContent.replace(
    /<meta property="og:title" content=".*?"[^>]*>/i, 
    `<meta property="og:title" content="${customTitle}" />`
  );
  
  indexContent = indexContent.replace(
    /<meta property="og:description" content=".*?"[^>]*>/i, 
    `<meta property="og:description" content="${customDescription}" />`
  );
  
  // Update canonical URL
  indexContent = indexContent.replace(
    /<link rel="canonical" href=".*?"[^>]*>/i, 
    `<link rel="canonical" href="https://tepasolutions.asia${pathname}" />`
  );
  
  return indexContent;
}