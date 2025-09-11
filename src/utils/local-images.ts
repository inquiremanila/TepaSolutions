// Simple local images configuration
export interface LocalImage {
  id: string;
  filename: string;
  alt: string;
  title?: string;
}

// Local images inventory - images are stored in /public/images/
export const localImages: Record<string, LocalImage> = {
  'roblox-group-photo': {
    id: 'roblox-group-photo',
    filename: 'roblox-group-photo.png',
    alt: 'Roblox game development workshop group photo with participants',
    title: 'Roblox Game Development Workshop'
  },
  'iphone-17-devices': {
    id: 'iphone-17-devices',
    filename: 'iphone-17-devices.png',
    alt: 'iPhone 17 devices showcasing new features and design',
    title: 'iPhone 17 Device Collection'
  }
};

// Get local image path (images are served from /public/images/)
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