// R2 image configuration and utilities
export interface R2Image {
  id: string;
  filename: string;
  alt: string;
  title?: string;
  optimized?: boolean; // Whether the image is optimized for web
  priority?: boolean; // For critical images that should load first
}

// R2 images inventory - images are stored in Cloudflare R2 bucket "tepaimage"
export const r2Images: Record<string, R2Image> = {
  'roblox-group-photo': {
    id: 'roblox-group-photo',
    filename: 'roblox-group-photo.png',
    alt: 'Roblox game development workshop group photo with participants',
    title: 'Roblox Game Development Workshop',
    optimized: true,
    priority: false
  },
  'iphone-17-devices': {
    id: 'iphone-17-devices',
    filename: 'iphone-17-devices.png',
    alt: 'iPhone 17 devices showcasing new features and design',
    title: 'iPhone 17 Device Collection',
    optimized: true,
    priority: false
  },
  'placeholder': {
    id: 'placeholder',
    filename: 'placeholder.png',
    alt: 'Placeholder image',
    title: 'Placeholder',
    optimized: true,
    priority: false
  }
};

// Configuration for R2 image serving
export const R2_CONFIG = {
  // Your Cloudflare Worker URL that serves images from R2
  // Replace this with your actual worker URL after deployment
  WORKER_URL: 'https://tepa-r2-image-server.your-subdomain.workers.dev',
  
  // Fallback to local images during development
  USE_LOCAL_FALLBACK: process.env.NODE_ENV === 'development',
  
  // Image optimization settings
  OPTIMIZATION: {
    quality: 85,
    format: 'auto', // auto-detect best format (webp, avif, etc.)
    progressive: true,
  }
};

// Get R2 image URL
export function getR2ImagePath(imageId: string): string {
  const image = r2Images[imageId];
  if (!image) {
    console.warn(`R2 image with id "${imageId}" not found`);
    return `${R2_CONFIG.WORKER_URL}/images/placeholder.png`;
  }

  // Use local fallback during development if configured
  if (R2_CONFIG.USE_LOCAL_FALLBACK) {
    return `/images/${image.filename}`;
  }

  return `${R2_CONFIG.WORKER_URL}/images/${image.filename}`;
}

// Get R2 image data
export function getR2Image(imageId: string): R2Image | null {
  return r2Images[imageId] || null;
}

// Generate optimized image URL with query parameters
export function getOptimizedR2ImagePath(
  imageId: string, 
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
  }
): string {
  const basePath = getR2ImagePath(imageId);
  
  if (!options || R2_CONFIG.USE_LOCAL_FALLBACK) {
    return basePath;
  }

  const params = new URLSearchParams();
  
  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.quality) params.set('q', options.quality.toString());
  if (options.format) params.set('f', options.format);

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

// Preload critical images for better performance
export function preloadCriticalImages(): void {
  const criticalImages = Object.values(r2Images).filter(img => img.priority);
  
  criticalImages.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getR2ImagePath(image.id);
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Upload image to R2 (for admin/development use)
export async function uploadImageToR2(
  file: File, 
  filename: string,
  metadata?: Record<string, string>
): Promise<boolean> {
  try {
    // This would typically use the Cloudflare API
    // For now, this is a placeholder for the upload functionality
    console.warn('R2 upload not implemented in client. Use Cloudflare dashboard or API.');
    return false;
  } catch (error) {
    console.error('Failed to upload image to R2:', error);
    return false;
  }
}

// Generate responsive image srcset for different screen densities
export function generateR2Srcset(imageId: string, baseSizes: number[]): string {
  return baseSizes
    .map(size => {
      const url1x = getOptimizedR2ImagePath(imageId, { width: size });
      const url2x = getOptimizedR2ImagePath(imageId, { width: size * 2 });
      return `${url1x} 1x, ${url2x} 2x`;
    })
    .join(', ');
}

// Image loading utility with retry logic
export async function loadR2Image(imageId: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const maxRetries = 3;
    let retryCount = 0;

    const tryLoad = () => {
      img.onload = () => resolve(img);
      img.onerror = () => {
        retryCount++;
        if (retryCount < maxRetries) {
          // Retry with exponential backoff
          setTimeout(tryLoad, Math.pow(2, retryCount) * 1000);
        } else {
          // Final fallback to placeholder
          img.src = getR2ImagePath('placeholder');
          setTimeout(() => resolve(img), 100);
        }
      };
      img.src = getR2ImagePath(imageId);
    };

    tryLoad();
  });
}