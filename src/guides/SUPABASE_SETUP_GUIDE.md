# Supabase Image Storage Setup Guide

This guide will help you migrate from local images to Supabase Storage for better performance, CDN delivery, and scalability.

## 🚀 Quick Start

### 1. Supabase Project Setup

1. **Create Supabase Account:**
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in to your account

2. **Create New Project:**
   - Click "New Project"
   - Choose your organization
   - Enter project name: "Tepa Solutions Images"
   - Set a strong database password
   - Choose region closest to your users
   - Click "Create new project"

3. **Enable Storage:**
   - Go to Storage in your project dashboard
   - Storage should be enabled by default

### 2. Configure Storage Bucket

1. **Create Images Bucket:**
   ```sql
   -- Run this in your Supabase SQL Editor
   insert into storage.buckets (id, name, public) 
   values ('tepa-images', 'tepa-images', true);
   ```

2. **Set Bucket Policies (Optional):**
   ```sql
   -- Allow public access to images
   create policy "Public Access" on storage.objects
   for select using (bucket_id = 'tepa-images');

   -- Allow authenticated uploads
   create policy "Authenticated users can upload" on storage.objects
   for insert with check (bucket_id = 'tepa-images' and auth.role() = 'authenticated');
   ```

### 3. Environment Variables

1. **Create `.env` file in your project root:**
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **Get your credentials:**
   - Go to Settings → API in your Supabase dashboard
   - Copy the "Project URL" and "anon public" key
   - Paste them into your `.env` file

### 4. Upload Existing Images

1. **Upload images to Supabase:**
   ```bash
   npm run upload-to-supabase
   ```

2. **Verify uploads:**
   - Check Storage in your Supabase dashboard
   - Ensure all images from `/public/images/` are uploaded

### 5. Update Your Code - Enhanced Image Usage

1. **Replace LocalImage with simplified Supabase usage:**
   ```tsx
   // Old:
   <img src="/images/image-name.png" alt="Alt text" width={800} height={192} />
   
   // New - Simple filename approach:
   <img {...getImageProps("/image-name.png")} />
   
   // Or with custom values:
   <img {...getImageProps("/image-name.png", "Custom alt text", 1000, 500)} />
   
   // Just the URL if you need more control:
   <img 
     src={getImageByName("/image-name.png")} 
     alt="Your alt text" 
     width={800}
     height={192} 
   />
   ```

2. **For Next.js Image component:**
   ```tsx
   import Image from 'next/image';
   
   // Simple usage
   <Image {...getImageProps("roblox-group-photo.png")} />
   
   // Custom dimensions
   <Image {...getImageProps("iphone-17-devices.png", "iPhone showcase", 1200, 600)} />
   ```

3. **For background images:**
   ```tsx
   <div style={{
     backgroundImage: `url(${getImageByName("placeholder.png")})`
   }} />
   ```

## 📁 File Structure

```
├── utils/
│   └── supabase-images.ts         # Enhanced Supabase image utilities
├── components/
│   └── SupabaseImage.tsx          # SupabaseImage components (optional)
├── scripts/
│   ├── upload-to-supabase.js      # Upload script
│   └── migrate-to-supabase.js     # Migration helper
└── .env                           # Environment variables
```

## 🔧 Enhanced Image Utilities

### New Helper Functions

The enhanced `supabase-images.ts` provides these simplified functions:

```typescript
// Get image URL by filename - handles /image-name.png format
getImageByName("/image-name.png")

// Get all props at once (src, alt, width, height)
getImageProps("/image-name.png")
getImageProps("/image-name.png", "Custom alt", 1200, 600)

// Get complete image data
getImageDataByName("/image-name.png")

// Check if image exists
hasImageByName("/image-name.png")
```

### Adding New Images

```typescript
// Add image with filename
addSupabaseImage(
  'new-image-id',
  'new-image.png',
  'Alt text for new image',
  'Image Title',
  'tepa-images', // bucket (optional)
  800,           // width (optional)
  600            // height (optional)
);

// Add image with direct URL
addSupabaseImageByUrl(
  'external-image-id',
  'https://example.com/image.jpg',
  'Alt text',
  'Title',
  1200,  // width
  800    // height
);
```

## 🖼️ Usage Examples

### Basic HTML Images

```tsx
// Simplest usage - uses stored dimensions and alt text
<img {...getImageProps("hero-image.png")} />

// With custom alt text
<img {...getImageProps("hero-image.png", "Custom description")} />

// With custom dimensions
<img {...getImageProps("hero-image.png", "Custom alt", 1200, 600)} />

// Just the URL for more control
<img 
  src={getImageByName("hero-image.png")} 
  alt="Hero image" 
  className="rounded-lg shadow-md"
  width={800}
  height={400}
/>
```

### React Components

```tsx
function HeroSection() {
  return (
    <div className="hero-section">
      <img 
        {...getImageProps("hero-banner.png")} 
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
```

### Background Images

```tsx
function BackgroundCard() {
  return (
    <div 
      className="card-bg"
      style={{
        backgroundImage: `url(${getImageByName("card-background.jpg")})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      Content here
    </div>
  );
}
```

### Conditional Images

```tsx
function ProductImage({ productType }: { productType: string }) {
  const imageName = `${productType}-image.png`;
  
  if (!hasImageByName(imageName)) {
    return <img {...getImageProps("placeholder.png")} />;
  }
  
  return <img {...getImageProps(imageName)} />;
}
```

## 📊 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run upload-to-supabase` | Upload images from `/public/images/` to Supabase |
| `npm run migrate-to-supabase` | Run migration analysis and replace image paths |
| `npm run supabase:check` | Check Supabase setup status |
| `npm run supabase:analyze` | Analyze current image usage patterns |
| `npm run supabase:config` | Generate Supabase configuration |

## 🔄 Migration Process

### Step 1: Inventory Your Images

```typescript
// Check what images you currently have
console.log('Available images:', getAvailableFilenames());

// Check if specific images exist
if (hasImageByName('logo.png')) {
  console.log('Logo found!');
}
```

### Step 2: Replace Image Usage

```tsx
// Old approach:
<img src="/images/hero-banner.jpg" alt="Hero banner" width={1200} height={600} />

// New approach:
<img {...getImageProps("hero-banner.jpg")} />
```

### Step 3: Update Dynamic Images

```tsx
// Old:
const imagePath = `/images/${category}-thumbnail.png`;

// New:
const imageProps = getImageProps(`${category}-thumbnail.png`);
```

## 🔍 Migration Checklist

### Setup Phase
- [ ] ✅ Create Supabase project
- [ ] ✅ Enable Storage and create "tepa-images" bucket
- [ ] ✅ Configure environment variables
- [ ] ✅ Upload images to Supabase
- [ ] ✅ Update supabase-images.ts with enhanced utilities

### Migration Phase
- [ ] 🔄 Replace direct image paths with `getImageByName()`
- [ ] 🔄 Replace img tags with `getImageProps()`
- [ ] 🔄 Update background image styles
- [ ] 🔄 Handle dynamic image paths
- [ ] 🔄 Add missing images to inventory

### Testing Phase
- [ ] ✅ Test all image loads
- [ ] ✅ Verify fallback behavior
- [ ] ✅ Check responsive images
- [ ] ✅ Test error handling

### Cleanup Phase
- [ ] ✅ Remove old local images
- [ ] ✅ Clean up unused imports
- [ ] ✅ Update documentation

## 🚨 Troubleshooting

### Images Not Loading

1. **Check if image exists in inventory:**
   ```typescript
   console.log('Image exists:', hasImageByName('your-image.png'));
   console.log('Available images:', getAvailableFilenames());
   ```

2. **Verify URL generation:**
   ```typescript
   console.log('Generated URL:', getImageByName('your-image.png'));
   ```

3. **Check browser network tab:**
   - Look for 404 errors
   - Verify the generated URLs are correct

### Adding Missing Images

```typescript
// If an image isn't in your inventory, add it:
addSupabaseImage(
  'missing-image',
  'missing-image.png', 
  'Description of missing image',
  'Title',
  'tepa-images',
  800,
  600
);

// Or add by direct URL if it's external:
addSupabaseImageByUrl(
  'external-img',
  'https://example.com/image.jpg',
  'External image description',
  'External Image',
  1200,
  800
);
```

### Development vs Production

```typescript
// The utility automatically handles different environments
// In development, it can fallback to local images if configured
// In production, it uses Supabase URLs

// Check current configuration:
console.log('Supabase URL:', SUPABASE_BASE_URL);
console.log('Default bucket:', DEFAULT_BUCKET);
```

## 🎯 Performance Benefits

- **Simplified Usage**: Just use filename instead of full URLs
- **Automatic Dimensions**: Stored width/height reduce layout shift
- **Smart Fallbacks**: Automatic placeholder image for missing assets
- **Global CDN**: Images served from Supabase's global CDN
- **Consistent Alt Text**: Centralized image metadata
- **Easy Maintenance**: Add/update images in one place

## 💡 Best Practices

### 1. Image Naming Convention
```
// Use descriptive, kebab-case names
hero-banner.jpg
product-thumbnail-1.png
logo-dark-mode.svg
```

### 2. Dimension Management
```typescript
// Always specify dimensions when adding images
addSupabaseImage(
  'product-hero',
  'product-hero.jpg',
  'Product hero image',
  'Product Hero',
  'tepa-images',
  1200,  // width - always specify
  600    // height - always specify
);
```

### 3. Alt Text Strategy
```typescript
// Use descriptive alt text
addSupabaseImage(
  'team-photo',
  'team-photo.jpg',
  'Tepa Solutions team members gathered in the office conference room',
  'Team Photo'
);
```

### 4. Error Handling
```tsx
function SafeImage({ filename, fallback = "placeholder.png" }: Props) {
  if (!hasImageByName(filename)) {
    return <img {...getImageProps(fallback)} />;
  }
  
  return <img {...getImageProps(filename)} />;
}
```

## 🔒 Security & Performance

- **Public Bucket**: Images are publicly accessible via CDN
- **No Authentication**: Required for public image serving
- **Optimized Delivery**: Automatic compression and format optimization
- **Caching Headers**: Long-term browser caching
- **Lazy Loading**: Can be easily implemented with the URLs

## 🎉 Next Steps

After successful migration:

1. **Implement lazy loading:**
   ```tsx
   <img 
     {...getImageProps("large-image.jpg")} 
     loading="lazy"
     className="fade-in"
   />
   ```

2. **Add responsive images:**
   ```tsx
   <picture>
     <source 
       media="(max-width: 640px)" 
       srcSet={getImageByName("mobile-hero.jpg")} 
     />
     <img {...getImageProps("desktop-hero.jpg")} />
   </picture>
   ```

3. **Set up image upload interface** for content management

4. **Implement image transformations** using Supabase's transform API

5. **Add monitoring** for image load performance