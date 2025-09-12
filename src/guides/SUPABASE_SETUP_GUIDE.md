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

### 5. Update Your Code

1. **Analyze current usage:**
   ```bash
   npm run supabase:analyze
   ```

2. **Replace LocalImage with SupabaseImage:**
   ```tsx
   // Old:
   import { LocalImage } from './LocalImage';
   
   // New:
   import { SupabaseImage } from './SupabaseImage';
   ```

3. **Update component usage:**
   ```tsx
   // Old:
   <LocalImage imageId="iphone-17-devices" className="w-full h-64" />
   
   // New:
   <SupabaseImage 
     imageId="iphone-17-devices" 
     className="w-full h-64" 
     width={800} 
     height={256} 
   />
   ```

## 📁 File Structure

```
├── utils/
│   └── supabase-images.ts         # Supabase image utilities
├── components/
│   └── SupabaseImage.tsx          # SupabaseImage components
├── scripts/
│   ├── upload-to-supabase.js      # Upload script
│   └── migrate-to-supabase.js     # Migration helper
└── .env                           # Environment variables
```

## 🔧 Configuration

### Environment Variables

```env
# Required
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional - for development fallback
VITE_USE_LOCAL_FALLBACK=true
```

### Supabase Images Configuration

```typescript
// In /utils/supabase-images.ts
export const SUPABASE_CONFIG = {
  USE_LOCAL_FALLBACK: process.env.NODE_ENV === 'development',
  TRANSFORMATIONS: {
    quality: 85,
    progressive: true,
    format: 'webp',
  },
  CDN: {
    cacheDuration: 31536000, // 1 year
    enableOptimization: true,
  }
};
```

## 🖼️ Using SupabaseImage Components

### Basic Usage

```tsx
import { SupabaseImage } from './components/SupabaseImage';

<SupabaseImage
  imageId="iphone-17-devices"
  className="w-full h-64 object-cover rounded-lg"
  width={800}
  height={256}
  priority={true}
/>
```

### With Optimization

```tsx
<SupabaseImage
  imageId="roblox-group-photo"
  className="w-full h-48 object-cover rounded-lg"
  width={800}
  height={192}
  optimization={{
    quality: 85,
    format: 'webp'
  }}
/>
```

### Lazy Loading

```tsx
import { LazySupabaseImage } from './components/SupabaseImage';

<LazySupabaseImage
  imageId="iphone-17-devices"
  className="w-full h-64 object-cover rounded-lg"
  width={800}
  height={256}
/>
```

### Responsive Images

```tsx
import { ResponsiveSupabaseImage } from './components/SupabaseImage';

<ResponsiveSupabaseImage
  imageId="roblox-group-photo"
  className="w-full h-48 object-cover rounded-lg"
  width={800}
  height={192}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
/>
```

### Using the Hook

```tsx
import { useSupabaseImage } from './components/SupabaseImage';

function MyComponent() {
  const { loading, error, url, imageData } = useSupabaseImage('iphone-17-devices');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <img src={url} alt={imageData?.alt} />;
}
```

## 📊 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run upload-to-supabase` | Upload images from `/public/images/` to Supabase |
| `npm run migrate-to-supabase` | Run migration analysis |
| `npm run supabase:check` | Check Supabase setup status |
| `npm run supabase:analyze` | Analyze LocalImage usage |
| `npm run supabase:config` | Generate Supabase configuration |

## 🔍 Migration Checklist

- [ ] ✅ Create Supabase project
- [ ] ✅ Enable Storage and create "tepa-images" bucket
- [ ] ✅ Configure environment variables
- [ ] ✅ Upload images to Supabase
- [ ] 🔄 Replace LocalImage imports with SupabaseImage
- [ ] 🔄 Update component usage
- [ ] 🔄 Replace direct image paths
- [ ] ✅ Test application
- [ ] ✅ Remove old LocalImage files

## 🚨 Troubleshooting

### Images Not Loading

1. **Check Supabase connection:**
   ```bash
   npm run supabase:check
   ```

2. **Verify bucket permissions:**
   - Go to Storage → tepa-images in Supabase dashboard
   - Ensure bucket is public
   - Check bucket policies

3. **Test image URLs manually:**
   - Copy an image URL from Supabase dashboard
   - Open it in browser to verify access

### Upload Failures

1. **Check environment variables:**
   ```bash
   echo $VITE_SUPABASE_URL
   echo $VITE_SUPABASE_ANON_KEY
   ```

2. **Verify bucket exists:**
   - Check Storage section in Supabase dashboard
   - Recreate bucket if missing

3. **Check file permissions:**
   - Ensure files in `public/images/` are readable
   - Check file sizes (Supabase has upload limits)

### Development Fallback

If Supabase is not configured, the system will automatically fallback to local images during development:

```typescript
// This will use local images if Supabase is not configured
export const SUPABASE_CONFIG = {
  USE_LOCAL_FALLBACK: process.env.NODE_ENV === 'development',
  // ...
};
```

## 🎯 Performance Benefits

- **Global CDN**: Images served from Supabase's global CDN
- **Automatic Optimization**: WebP conversion and compression
- **Lazy Loading**: Built-in intersection observer
- **Responsive Images**: Multiple format support
- **Caching**: Aggressive browser and CDN caching
- **Transform API**: On-the-fly image transformations

## 🔒 Security Features

- **RLS Policies**: Row Level Security for access control
- **JWT Authentication**: Secure API access
- **CORS Support**: Proper cross-origin headers
- **Rate Limiting**: Built-in DDoS protection

## 💰 Cost Optimization

- **Free Tier**: 2GB storage, 2GB bandwidth per month
- **Pro Tier**: $25/month for 8GB storage, 50GB bandwidth
- **Pay-as-you-go**: Additional usage charged monthly
- **CDN Included**: No additional CDN costs

## 🤝 Support

If you encounter issues:

1. Check this troubleshooting guide
2. Run `npm run supabase:check` to verify setup
3. Check Supabase dashboard for error logs
4. Review browser network tab for failed requests

## 🎉 Next Steps

After successful migration:

1. Set up image transformations for different screen sizes
2. Implement automatic WebP conversion
3. Add image upload functionality for admin users
4. Set up monitoring and analytics
5. Consider implementing a image optimization pipeline