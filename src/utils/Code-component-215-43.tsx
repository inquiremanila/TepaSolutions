// Local images configuration and utilities

export interface LocalImage {
  id: string;
  filename: string;
  alt: string;
  title?: string;
  category?: string;
  tags?: string[];
}

// Local images inventory
export const localImages: Record<string, LocalImage> = {
  'roblox-group-photo': {
    id: 'roblox-group-photo',
    filename: 'roblox-group-photo.png',
    alt: 'Roblox game development workshop group photo with participants and Roblox characters',
    title: 'Roblox Game Development Workshop',
    category: 'events',
    tags: ['roblox', 'workshop', 'game-development', 'education', 'participants']
  },
  'iphone-17-devices': {
    id: 'iphone-17-devices',
    filename: 'iphone-17-devices.png',
    alt: 'iPhone 17 devices showcasing new features and design variations',
    title: 'iPhone 17 Device Collection',
    category: 'articles',
    tags: ['iphone', 'apple', 'technology', 'mobile', 'devices', 'review']
  }
};

// Get local image path
export function getLocalImagePath(imageId: string): string {
  const image = localImages[imageId];
  if (!image) {
    console.warn(`Local image with id "${imageId}" not found`);
    return '/images/placeholder.png';
  }
  return `/images/${image.filename}`;
}

// Get local image data
export function getLocalImage(imageId: string): LocalImage | null {
  return localImages[imageId] || null;
}

// Get images by category
export function getImagesByCategory(category: string): LocalImage[] {
  return Object.values(localImages).filter(image => image.category === category);
}

// Get images by tag
export function getImagesByTag(tag: string): LocalImage[] {
  return Object.values(localImages).filter(image => 
    image.tags?.includes(tag.toLowerCase())
  );
}

// Search images
export function searchImages(query: string): LocalImage[] {
  const searchTerm = query.toLowerCase();
  return Object.values(localImages).filter(image => 
    image.alt.toLowerCase().includes(searchTerm) ||
    image.title?.toLowerCase().includes(searchTerm) ||
    image.tags?.some(tag => tag.includes(searchTerm)) ||
    image.category?.toLowerCase().includes(searchTerm)
  );
}

// Get all available image IDs
export function getAllImageIds(): string[] {
  return Object.keys(localImages);
}

// Get all categories
export function getAllCategories(): string[] {
  const categories = Object.values(localImages)
    .map(image => image.category)
    .filter((category): category is string => Boolean(category));
  return [...new Set(categories)];
}

// Get all tags
export function getAllTags(): string[] {
  const tags = Object.values(localImages)
    .flatMap(image => image.tags || []);
  return [...new Set(tags)];
}