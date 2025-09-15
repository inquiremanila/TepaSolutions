export interface SupabaseImage {
  id: string;
  filename?: string;
  alt: string;
  title?: string;
  url?: string; // Direct URL support
  bucket?: string;
  optimized?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
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
    priority: false,
    width: 800,
    height: 600
  },
  'iphone-17-devices': {
    id: 'iphone-17-devices',
    filename: 'iphone-17-devices.png',
    url: `${SUPABASE_BASE_URL}/tepa-images/iphone-17-devices.png`,
    alt: 'iPhone 17 devices showcasing new features and design',
    title: 'iPhone 17 Device Collection',
    bucket: DEFAULT_BUCKET,
    optimized: true,
    priority: false,
    width: 800,
    height: 400
  },
  'placeholder': {
    id: 'placeholder',
    filename: 'placeholder.png',
    url: `${SUPABASE_BASE_URL}/tepa-images/placeholder.png`,
    alt: 'Placeholder image',
    title: 'Placeholder',
    bucket: DEFAULT_BUCKET,
    optimized: true,
    priority: false,
    width: 800,
    height: 192
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

// NEW: Get image URL by filename (simplified usage)
export function getImageByName(filename: string): string {
  // Remove leading slash if present
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  
  // First, try to find by exact filename match
  const imageEntry = Object.values(supabaseImages).find(img => img.filename === cleanFilename);
  if (imageEntry) {
    return getSupabaseImageUrl(imageEntry.id);
  }
  
  // If not found in inventory, construct URL directly
  return `${SUPABASE_BASE_URL}/${DEFAULT_BUCKET}/${cleanFilename}`;
}

// NEW: Get complete image data by filename
export function getImageDataByName(filename: string): SupabaseImage | null {
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  const imageEntry = Object.values(supabaseImages).find(img => img.filename === cleanFilename);
  return imageEntry || null;
}

// NEW: Quick image component props generator
export function getImageProps(filename: string, customAlt?: string, customWidth?: number, customHeight?: number) {
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  const imageData = getImageDataByName(cleanFilename);
  
  return {
    src: getImageByName(filename),
    alt: customAlt || imageData?.alt || 'Image',
    width: customWidth || imageData?.width || 800,
    height: customHeight || imageData?.height || 192,
    title: imageData?.title,
    priority: imageData?.priority || false
  };
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
  bucket?: string,
  width?: number,
  height?: number
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
    priority: false,
    width,
    height
  };
}

// Helper function to add image by direct URL
export function addSupabaseImageByUrl(
  id: string,
  url: string,
  alt: string,
  title?: string,
  width?: number,
  height?: number
): void {
  supabaseImages[id] = {
    id,
    url,
    alt,
    title,
    optimized: true,
    priority: false,
    width,
    height
  };
}

// Check if image exists in inventory
export function hasSupabaseImage(imageId: string): boolean {
  return imageId in supabaseImages;
}

// Check if image exists by filename
export function hasImageByName(filename: string): boolean {
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  return Object.values(supabaseImages).some(img => img.filename === cleanFilename);
}

// Get all available image IDs
export function getAvailableImageIds(): string[] {
  return Object.keys(supabaseImages);
}

// Get all available filenames
export function getAvailableFilenames(): string[] {
  return Object.values(supabaseImages)
    .filter(img => img.filename)
    .map(img => img.filename!);
}