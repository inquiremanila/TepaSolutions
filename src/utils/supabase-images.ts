export interface SupabaseImage {
  id: string;
  filename?: string;
  alt: string;
  title?: string;
  url?: string; // Direct URL support
  bucket?: string;
  optimized?: boolean;
  priority?: boolean;
}

// Default bucket for images
export const DEFAULT_BUCKET = 'tepa-images';
export const SUPABASE_BASE_URL = 'https://ruhsxjeiegdeshcnbuxy.supabase.co/storage/v1/object/public';

// Image inventory - now supports both stored images and direct URLs
export const supabaseImages: Record<string, SupabaseImage> = {
  'roblox-group-photo': {
    id: 'roblox-group-photo',
    filename: 'roblox-group-photo.png',
    url: `${SUPABASE_BASE_URL}/tepa-images/roblox-group-photo.png`,
    alt: 'Roblox game development workshop group photo with participants',
    title: 'Roblox Game Development Workshop',
    bucket: DEFAULT_BUCKET,
    optimized: true,
    priority: false
  },
  'iphone-17-devices': {
    id: 'iphone-17-devices',
    filename: 'iphone-17-devices.png',
    url: `${SUPABASE_BASE_URL}/tepa-images/iphone-17-devices.png`,
    alt: 'iPhone 17 devices showcasing new features and design',
    title: 'iPhone 17 Device Collection',
    bucket: DEFAULT_BUCKET,
    optimized: true,
    priority: false
  },
  'placeholder': {
    id: 'placeholder',
    filename: 'placeholder.png',
    url: `${SUPABASE_BASE_URL}/tepa-images/placeholder.png`,
    alt: 'Placeholder image',
    title: 'Placeholder',
    bucket: DEFAULT_BUCKET,
    optimized: true,
    priority: false
  }
};

// Get Supabase image URL - simplified version
export function getSupabaseImageUrl(imageId: string): string {
  const image = supabaseImages[imageId];
  if (!image) {
    console.warn(`Supabase image with id "${imageId}" not found`);
    return getSupabaseImageUrl('placeholder');
  }

  // Return direct URL if available
  if (image.url) {
    return image.url;
  }

  // Fallback to constructing URL from filename
  if (image.filename) {
    const bucket = image.bucket || DEFAULT_BUCKET;
    return `${SUPABASE_BASE_URL}/${bucket}/${image.filename}`;
  }

  // Final fallback
  return `${SUPABASE_BASE_URL}/tepa-images/placeholder.png`;
}

// Get Supabase image data
export function getSupabaseImage(imageId: string): SupabaseImage | null {
  return supabaseImages[imageId] || null;
}

// Helper function to add new images easily
export function addSupabaseImage(
  id: string, 
  filename: string, 
  alt: string, 
  title?: string,
  bucket?: string
): void {
  const bucketName = bucket || DEFAULT_BUCKET;
  const url = `${SUPABASE_BASE_URL}/${bucketName}/${filename}`;
  
  supabaseImages[id] = {
    id,
    filename,
    url,
    alt,
    title,
    bucket: bucketName,
    optimized: true,
    priority: false
  };
}

// Helper function to add image by direct URL
export function addSupabaseImageByUrl(
  id: string,
  url: string,
  alt: string,
  title?: string
): void {
  supabaseImages[id] = {
    id,
    url,
    alt,
    title,
    optimized: true,
    priority: false
  };
}

// Check if image exists in inventory
export function hasSupabaseImage(imageId: string): boolean {
  return imageId in supabaseImages;
}

// Get all available image IDs
export function getAvailableImageIds(): string[] {
  return Object.keys(supabaseImages);
}