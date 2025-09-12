// Supabase image storage configuration and utilities
import { createClient } from '@supabase/supabase-js';

export interface SupabaseImage {
  id: string;
  filename: string;
  alt: string;
  title?: string;
  bucket?: string;
  optimized?: boolean;
  priority?: boolean;
}

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Default bucket for images
export const DEFAULT_BUCKET = 'tepa-images';

// Image inventory - images stored in Supabase Storage
export const supabaseImages: Record<string, SupabaseImage> = {
  'roblox-group-photo': {
    id: 'roblox-group-photo',
    filename: 'roblox-group-photo.png',
    alt: 'Roblox game development workshop group photo with participants',
    title: 'Roblox Game Development Workshop',
    bucket: DEFAULT_BUCKET,
    optimized: true,
    priority: false
  },
  'iphone-17-devices': {
    id: 'iphone-17-devices',
    filename: 'iphone-17-devices.png',
    alt: 'iPhone 17 devices showcasing new features and design',
    title: 'iPhone 17 Device Collection',
    bucket: DEFAULT_BUCKET,
    optimized: true,
    priority: false
  },
  'placeholder': {
    id: 'placeholder',
    filename: 'placeholder.png',
    alt: 'Placeholder image',
    title: 'Placeholder',
    bucket: DEFAULT_BUCKET,
    optimized: true,
    priority: false
  }
};

// Configuration for Supabase image serving
export const SUPABASE_CONFIG = {
  // Enable local fallback during development
  USE_LOCAL_FALLBACK: process.env.NODE_ENV === 'development' && !supabaseUrl.includes('supabase.co'),
  
  // Image transformation options
  TRANSFORMATIONS: {
    quality: 85,
    progressive: true,
    format: 'webp', // Auto-convert to WebP for better performance
  },

  // CDN settings
  CDN: {
    cacheDuration: 31536000, // 1 year in seconds
    enableOptimization: true,
  }
};

// Get Supabase image URL
export function getSupabaseImageUrl(imageId: string, options?: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'png' | 'jpg' | 'auto';
}): string {
  const image = supabaseImages[imageId];
  if (!image) {
    console.warn(`Supabase image with id "${imageId}" not found`);
    return getSupabaseImageUrl('placeholder');
  }

  // Use local fallback during development if configured
  if (SUPABASE_CONFIG.USE_LOCAL_FALLBACK) {
    return `/images/${image.filename}`;
  }

  const bucket = image.bucket || DEFAULT_BUCKET;
  
  try {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(image.filename);

    let url = data.publicUrl;

    // Add transformation parameters if provided
    if (options && Object.keys(options).length > 0) {
      const params = new URLSearchParams();
      
      if (options.width) params.set('width', options.width.toString());
      if (options.height) params.set('height', options.height.toString());
      if (options.quality) params.set('quality', options.quality.toString());
      if (options.format && options.format !== 'auto') params.set('format', options.format);

      // Add transform parameter to enable Supabase image transformations
      if (params.toString()) {
        url += `/transform?${params.toString()}`;
      }
    }

    return url;
  } catch (error) {
    console.error('Error getting Supabase image URL:', error);
    return '/images/placeholder.png'; // Fallback to local placeholder
  }
}

// Get Supabase image data
export function getSupabaseImage(imageId: string): SupabaseImage | null {
  return supabaseImages[imageId] || null;
}

// Generate optimized image URL with automatic WebP conversion
export function getOptimizedSupabaseImageUrl(
  imageId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
  }
): string {
  return getSupabaseImageUrl(imageId, {
    ...options,
    format: 'webp' // Always use WebP for optimization
  });
}

// Upload image to Supabase Storage
export async function uploadImageToSupabase(
  file: File,
  filename: string,
  bucket: string = DEFAULT_BUCKET
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filename, file, {
        cacheControl: '31536000', // 1 year cache
        upsert: false
      });

    if (error) {
      return { success: false, error: error.message };
    }

    const url = getSupabaseImageUrl(filename);
    return { success: true, url };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Delete image from Supabase Storage
export async function deleteImageFromSupabase(
  filename: string,
  bucket: string = DEFAULT_BUCKET
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filename]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// List all images in bucket
export async function listImagesInSupabase(
  bucket: string = DEFAULT_BUCKET
): Promise<{ success: boolean; files?: string[]; error?: string }> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list();

    if (error) {
      return { success: false, error: error.message };
    }

    const files = data?.map(file => file.name) || [];
    return { success: true, files };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Generate responsive srcset for different screen densities
export function generateSupabaseSrcset(imageId: string, baseSizes: number[]): string {
  return baseSizes
    .map(size => {
      const url1x = getOptimizedSupabaseImageUrl(imageId, { width: size });
      const url2x = getOptimizedSupabaseImageUrl(imageId, { width: size * 2 });
      return `${url1x} 1x, ${url2x} 2x`;
    })
    .join(', ');
}

// Preload critical images for better performance
export function preloadCriticalSupabaseImages(): void {
  const criticalImages = Object.values(supabaseImages).filter(img => img.priority);
  
  criticalImages.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getSupabaseImageUrl(image.id);
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Check if Supabase Storage is properly configured
export async function checkSupabaseStorageHealth(): Promise<{
  success: boolean;
  configured: boolean;
  bucketExists: boolean;
  error?: string;
}> {
  try {
    // Check if Supabase is configured
    if (!supabaseUrl.includes('supabase.co') || !supabaseAnonKey || supabaseAnonKey.includes('your-')) {
      return {
        success: false,
        configured: false,
        bucketExists: false,
        error: 'Supabase not properly configured'
      };
    }

    // Check if bucket exists
    const { data, error } = await supabase.storage.getBucket(DEFAULT_BUCKET);
    
    if (error) {
      return {
        success: false,
        configured: true,
        bucketExists: false,
        error: `Bucket "${DEFAULT_BUCKET}" not found: ${error.message}`
      };
    }

    return {
      success: true,
      configured: true,
      bucketExists: true
    };
  } catch (error) {
    return {
      success: false,
      configured: false,
      bucketExists: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}