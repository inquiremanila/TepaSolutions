# Cloudflare R2 Image Storage Setup Guide

This guide will help you set up Cloudflare R2 for image storage and serving through a Cloudflare Worker.

## 🚀 Quick Start

### 1. Prerequisites

- Cloudflare account with R2 enabled
- Node.js 18+ installed
- Wrangler CLI installed (`npm install -g wrangler`)

### 2. R2 Bucket Setup

1. **Create R2 Bucket:**
   ```bash
   wrangler r2 bucket create tepaimage
   ```

2. **Generate R2 API Tokens:**
   - Go to Cloudflare Dashboard → R2 → Manage R2 API tokens
   - Create token with Object Read & Write permissions
   - Save the Access Key ID and Secret Access Key

3. **Set Environment Variables:**
   ```bash
   export CLOUDFLARE_R2_ACCESS_KEY_ID="your_access_key_here"
   export CLOUDFLARE_R2_SECRET_ACCESS_KEY="your_secret_key_here"
   ```

### 3. Deploy Cloudflare Worker

1. **Deploy the image server worker:**
   ```bash
   npm run deploy:worker
   ```

2. **Update worker URL in code:**
   - Edit `/utils/r2-images.ts`
   - Replace `WORKER_URL: 'https://your-worker-name.your-subdomain.workers.dev'`
   - With your actual worker URL (shown after deployment)

### 4. Upload Images to R2

1. **Upload existing images:**
   ```bash
   npm run upload-to-r2
   ```

2. **Verify uploads:**
   - Check your R2 bucket in Cloudflare Dashboard
   - Ensure all images from `/public/images/` are uploaded

### 5. Update Code to Use R2

1. **Replace LocalImage with R2Image:**
   ```bash
   npm run migrate-to-r2 analyze
   ```

2. **Update imports:**
   ```tsx
   // Old:
   import { LocalImage } from './LocalImage';
   
   // New:
   import { R2Image } from './R2Image';
   ```

3. **Update component usage:**
   ```tsx
   // Old:
   <LocalImage imageId="iphone-17-devices" className="w-full h-64" />
   
   // New:
   <R2Image imageId="iphone-17-devices" className="w-full h-64" width={800} height={256} />
   ```

## 📁 File Structure

```
├── supabase/functions/r2-image-server/
│   └── index.ts                    # Cloudflare Worker for serving images
├── utils/
│   └── r2-images.ts               # R2 image utilities and configuration
├── components/
│   └── R2Image.tsx                # R2Image component with optimization
├── scripts/
│   ├── upload-to-r2.js           # Script to upload images to R2
│   └── migrate-to-r2.js          # Migration helper script
└── wrangler.toml                  # Cloudflare Worker configuration
```

## 🔧 Configuration

### Worker Configuration (`wrangler.toml`)

```toml
name = "tepa-r2-image-server"
compatibility_date = "2024-09-25"
main = "supabase/functions/r2-image-server/index.ts"

[[r2_buckets]]
binding = "Tepa_Image"
bucket_name = "tepaimage"
preview_bucket_name = "tepaimage"

[env.production]
account_id = "84dba3ff5add506e1aa52c53bcca2234"
```

### R2 Images Configuration (`/utils/r2-images.ts`)

Update the `WORKER_URL` with your deployed worker URL:

```typescript
export const R2_CONFIG = {
  WORKER_URL: 'https://tepa-r2-image-server.your-subdomain.workers.dev',
  USE_LOCAL_FALLBACK: process.env.NODE_ENV === 'development',
  // ... other config
};
```

## 🖼️ Using R2Image Components

### Basic Usage

```tsx
import { R2Image } from './components/R2Image';

<R2Image
  imageId="iphone-17-devices"
  className="w-full h-64 object-cover rounded-lg"
  width={800}
  height={256}
  priority={true}
/>
```

### With Optimization

```tsx
<R2Image
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
import { LazyR2Image } from './components/R2Image';

<LazyR2Image
  imageId="iphone-17-devices"
  className="w-full h-64 object-cover rounded-lg"
  width={800}
  height={256}
/>
```

### Responsive Images

```tsx
import { ResponsiveR2Image } from './components/R2Image';

<ResponsiveR2Image
  imageId="roblox-group-photo"
  className="w-full h-48 object-cover rounded-lg"
  width={800}
  height={192}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
/>
```

## 📊 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run deploy:worker` | Deploy Cloudflare Worker |
| `npm run dev:worker` | Run worker in development mode |
| `npm run upload-to-r2` | Upload images from `/public/images/` to R2 |
| `npm run migrate-to-r2` | Run migration analysis |
| `npm run r2:check` | Check R2 setup status |
| `npm run r2:analyze` | Analyze LocalImage usage |

## 🔍 Migration Checklist

- [ ] ✅ Set up R2 bucket
- [ ] ✅ Configure API tokens
- [ ] ✅ Deploy Cloudflare Worker
- [ ] ✅ Update worker URL in configuration
- [ ] ✅ Upload images to R2
- [ ] 🔄 Replace LocalImage imports with R2Image
- [ ] 🔄 Update component usage
- [ ] 🔄 Replace direct image paths
- [ ] ✅ Test application
- [ ] ✅ Remove old LocalImage files (optional)

## 🚨 Troubleshooting

### Worker Not Serving Images

1. Check worker deployment status: `wrangler tail`
2. Verify R2 bucket permissions
3. Ensure worker URL is correct in `/utils/r2-images.ts`

### Images Not Uploading to R2

1. Verify API tokens are set correctly
2. Check bucket name matches configuration
3. Ensure AWS SDK is installed: `npm install aws-sdk`

### CORS Issues

The worker includes CORS headers, but if you encounter issues:

1. Check the worker's CORS configuration
2. Verify the origin is allowed
3. Test with browser dev tools

### Development Fallback

During development, set `USE_LOCAL_FALLBACK: true` in R2_CONFIG to use local images:

```typescript
export const R2_CONFIG = {
  USE_LOCAL_FALLBACK: process.env.NODE_ENV === 'development',
  // ...
};
```

## 🎯 Performance Benefits

- **CDN Distribution**: Images served from Cloudflare's global network
- **Automatic Compression**: WebP/AVIF format support
- **Caching**: Aggressive caching with proper headers
- **Lazy Loading**: Built-in intersection observer
- **Responsive Images**: Multiple format support with `<picture>` element

## 🔒 Security Features

- **CORS Protection**: Proper CORS headers
- **Rate Limiting**: Worker-level protection
- **Access Control**: R2 bucket permissions
- **ETag Support**: Efficient caching validation

## 📈 Cost Optimization

- **R2 Storage**: $0.015 per GB per month
- **Class A Operations**: $4.50 per million requests
- **Class B Operations**: $0.36 per million requests
- **Egress**: Free within Cloudflare network

## 🤝 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Run `npm run r2:check` to verify setup
3. Check Cloudflare Worker logs with `wrangler tail`
4. Review R2 bucket permissions in Cloudflare Dashboard

## 🎉 Next Steps

After successful setup:

1. Consider implementing image transformations
2. Add analytics tracking for image views
3. Set up monitoring for worker performance
4. Implement automatic image optimization pipelines