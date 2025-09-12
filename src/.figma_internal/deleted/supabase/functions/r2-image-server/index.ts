// Cloudflare Worker for serving images from R2 storage
// This worker fetches images from the Tepa_Image R2 bucket and serves them with proper caching

interface Env {
  Tepa_Image: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Extract image path from URL (e.g., /images/roblox-group-photo.png)
    const imagePath = url.pathname.replace('/images/', '');
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Only allow GET and HEAD requests
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { 
        status: 405,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    try {
      // Get the image from R2
      const object = await env.Tepa_Image.get(imagePath);
      
      if (!object) {
        // Return placeholder image if not found
        const placeholderObject = await env.Tepa_Image.get('placeholder.png');
        if (placeholderObject) {
          return new Response(placeholderObject.body, {
            headers: {
              'Content-Type': placeholderObject.httpMetadata?.contentType || 'image/png',
              'Cache-Control': 'public, max-age=31536000, immutable',
              'Access-Control-Allow-Origin': '*',
              'ETag': placeholderObject.httpEtag,
            },
          });
        } else {
          return new Response('Image not found', { 
            status: 404,
            headers: {
              'Access-Control-Allow-Origin': '*',
            }
          });
        }
      }

      // Check if client has cached version
      const clientETag = request.headers.get('If-None-Match');
      if (clientETag && clientETag === object.httpEtag) {
        return new Response(null, { 
          status: 304,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        });
      }

      // Determine content type based on file extension
      const contentType = getContentType(imagePath);

      // Set appropriate caching headers
      const cacheControl = imagePath.includes('placeholder') 
        ? 'public, max-age=86400' // 1 day for placeholder
        : 'public, max-age=31536000, immutable'; // 1 year for regular images

      return new Response(object.body, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': cacheControl,
          'Access-Control-Allow-Origin': '*',
          'ETag': object.httpEtag || '',
          'Last-Modified': object.uploaded?.toUTCString() || '',
          'Vary': 'Accept-Encoding',
        },
      });

    } catch (error) {
      console.error('Error serving image:', error);
      return new Response('Internal Server Error', { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });
    }
  },
};

function getContentType(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    case 'ico':
      return 'image/x-icon';
    case 'avif':
      return 'image/avif';
    default:
      return 'image/png'; // Default fallback
  }
}