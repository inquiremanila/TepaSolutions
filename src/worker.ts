// SEO Worker for Bot Detection and URL Rewriting
// Serves prerendered HTML to bots and SPA to humans

// Define Cloudflare Workers types if not using @cloudflare/workers-types
interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

// Bot user agent patterns
const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest',
  'developers.google.com',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'redditbot',
  'applebot',
  'whatsapp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'google page speed',
  'qwantify',
  'pinterestbot',
  'bitrix link preview',
  'xing-contenttabreceiver',
  'chrome-lighthouse',
  'telegrambot'
];

function isBotRequest(userAgent: string | null): boolean {
  if (!userAgent) return false;
  
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

function getPrerenderedPath(pathname: string): string {
  // Remove trailing slash and handle root
  const cleanPath = pathname === '/' ? '/index' : pathname.replace(/\/$/, '');
  
  // Map to prerendered HTML file
  return `/SEO${cleanPath}.html`;
}
export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent');
    const isBot = isBotRequest(userAgent);
    
    // Handle static assets first (CSS, JS, images, etc.) but NOT HTML files
    if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|avif|mp4|webm)$/)) {
      return env.ASSETS.fetch(request);
    }
    
    // Handle sitemap.xml
    if (url.pathname === '/sitemap.xml') {
      return env.ASSETS.fetch(request);
    }
    
    // Check if this is a bot request
    if (isBot) {
      try {
        // Don't serve SEO HTML files directly to bots
        if (url.pathname.startsWith('/SEO/')) {
          // Redirect to the actual page
          const actualPath = url.pathname.replace('/SEO/', '/').replace('.html', '');
          return Response.redirect(`${url.origin}${actualPath}`, 301);
        }
        
        // Serve prerendered HTML to bots
        const prerenderedPath = getPrerenderedPath(url.pathname);
        const prerenderedRequest = new Request(
          new URL(prerenderedPath, url.origin),
          { 
            method: request.method,
            headers: request.headers 
          }
        );
        
        const prerenderedResponse = await env.ASSETS.fetch(prerenderedRequest);
        
        if (prerenderedResponse.ok) {
          // Return the prerendered HTML with proper headers
          const html = await prerenderedResponse.text();
          
          return new Response(html, {
            status: prerenderedResponse.status,
            headers: {
              'content-type': 'text/html;charset=UTF-8',
              'cache-control': 'public, max-age=86400, s-maxage=86400',
              'x-served-by': 'seo-worker',
              'x-bot-detected': 'true',
              'x-prerendered': 'true'
            }
          });
        }
      } catch (error) {
        console.error('Error serving prerendered content:', error);
        // Fall through to serve SPA
      }
    }
    
    // For human users or if prerendered content fails, serve the SPA
    // But don't serve SEO HTML files directly
    if (url.pathname.startsWith('/SEO/')) {
      return new Response('Not Found', { status: 404 });
    }
    
    // Serve the SPA for human users
    try {
      const indexRequest = new Request(
        new URL('/index.html', url.origin),
        { 
          method: request.method,
          headers: request.headers 
        }
      );
      
      const indexResponse = await env.ASSETS.fetch(indexRequest);
      
      if (indexResponse.ok) {
        const html = await indexResponse.text();
        
        return new Response(html, {
          status: indexResponse.status,
          headers: {
            'content-type': 'text/html;charset=UTF-8',
            'cache-control': 'public, max-age=300',
            'x-served-by': 'seo-worker',
            'x-bot-detected': isBot ? 'true' : 'false',
            'x-prerendered': 'false'
          }
        });
      }
    } catch (error) {
      console.error('Error serving SPA:', error);
    }
    
    // Fallback: return 404
    return new Response('Not Found', { 
      status: 404,
      headers: {
        'content-type': 'text/html;charset=UTF-8'
      }
    });
  }
};