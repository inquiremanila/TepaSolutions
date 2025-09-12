# Local Images Guide

## Clean and Simple Local Image Solution

### How it works:
1. **Images are stored in `/public/images/`** - This makes them accessible via direct HTTP paths
2. **Simple utility functions** in `/utils/local-images.ts` manage image metadata
3. **LocalImage component** provides a clean interface for using local images

### Usage:

#### Method 1: Using LocalImage Component (Recommended)
```tsx
import { LocalImage } from './components/LocalImage';

<LocalImage
  imageId="iphone-17-devices"
  className="w-full h-64 object-cover rounded-lg"
  priority={true}
/>
```

#### Method 2: Direct Image Usage
```tsx
<img
  src="/images/iphone-17-devices.png"
  alt="iPhone 17 devices"
  className="w-full h-64 object-cover rounded-lg"
  loading="lazy"
/>
```

### Adding New Images:

1. **Add image file** to `/public/images/filename.png`
2. **Register in utility** by adding to `localImages` object in `/utils/local-images.ts`:
```ts
'new-image-id': {
  id: 'new-image-id',
  filename: 'new-image.png',
  alt: 'Description of the image',
  title: 'Image Title'
}
```

### Current Available Images:
- `iphone-17-devices` → `/public/images/iphone-17-devices.png`
- `roblox-group-photo` → `/public/images/roblox-group-photo.png`
- `placeholder` → `/public/images/placeholder.png`

### Benefits:
- ✅ **No 404 errors** - Images are properly served as static assets
- ✅ **Clean code** - Simple utility functions and component
- ✅ **SEO friendly** - Proper image paths and metadata
- ✅ **Performance** - Direct static asset serving
- ✅ **Easy maintenance** - Clear structure and organization