# SEO Content Management Guide

## Overview
This guide covers how to manage and improve SEO content for each page of the Tepa Solutions website. The site uses a dual content delivery system: prerendered HTML for search engine bots and a React SPA for human users.

## File Structure

### Core SEO Files
```
├── server.js                           # Production server with bot detection
├── scripts/
│   ├── seo-html-generator.ts           # Main SEO content generator
│   ├── seo5-build-sitemap-dynamic.ts   # Sitemap generator
│   ├── create-homepage-seo.ts          # Homepage SEO generator
│   └── generate-seo-files-standalone.cjs  # Standalone generator
├── src/
│   ├── components/seo4-head.tsx        # Dynamic SEO metadata component
│   ├── utils/
│   │   ├── seo1-data-sources.ts        # Central content data hub
│   │   ├── seo2-sitemap-generator.ts   # Sitemap utilities
│   │   └── seo3-config.ts              # SEO configuration
│   └── data/
│       ├── articles-data.ts            # Articles content data
│       ├── events-data.ts              # Events content data
│       └── careers-data.ts             # Job positions data
├── build/SEO/                          # Generated SEO HTML files (after build)
├── public/SEO/                         # Generated SEO HTML files (for development)
└── public/sitemap.xml                  # Generated sitemap
```

## How to Update SEO Content

### 1. Adding New Articles
**File to edit:** `src/data/articles-data.ts`

```typescript
export const articles = [
  {
    id: 1,
    title: "Your New Article Title",
    excerpt: "Brief description for search results",
    content: "Full article content for SEO pages",
    date: "2025-09-14",
    readTime: "5 min read",
    category: "Technology",
    image: "path/to/image.jpg",
    author: "Author Name"
  }
  // ... add your new article here
];
```

### 2. Adding New Events  
**File to edit:** `src/data/events-data.ts`

```typescript
export const events = [
  {
    id: 1,
    slug: "your-event-slug",
    title: "Event Title",
    description: "Event description for SEO",
    date: "2025-12-01",
    time: "10:00 AM",
    location: "Event Location",
    image: "path/to/event-image.jpg",
    category: "Workshop",
    status: "registration-open"
  }
  // ... add your new event here
];
```

### 3. Adding New Job Positions
**File to edit:** `src/data/careers-data.ts`

```typescript
export const jobPositions = [
  {
    id: 1,
    slug: "job-position-slug",
    title: "Job Title",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    description: "Job description for SEO",
    requirements: ["Requirement 1", "Requirement 2"],
    responsibilities: ["Responsibility 1", "Responsibility 2"]
  }
  // ... add your new position here
];
```

### 4. Updating Page Metadata
**File to edit:** `src/components/seo4-head.tsx`

This component manages dynamic SEO metadata. To customize SEO for specific pages:

```typescript
// Example usage in a page component
<SEOHead
  title="Your Page Title | Tepa Solutions"
  description="Your page description for search results"
  keywords="relevant, keywords, separated, by, commas"
  canonical="https://tepasolutions.asia/your-page"
  ogType="website"
  ogImage="https://tepasolutions.asia/your-og-image.jpg"
/>
```

## Regenerating SEO Content

### After Adding Content
Run this command to regenerate all SEO files:

```bash
node scripts/generate-seo-files-standalone.cjs
```

This will:
- Generate static HTML files in `build/SEO/` and `public/SEO/`
- Update the sitemap with new content
- Create prerendered pages for search engines

### Manual Build Process
```bash
# 1. Build the main application
npm run build

# 2. Generate SEO files
node scripts/generate-seo-files-standalone.cjs

# 3. Restart production server
npm start
```

## Deployment Process

### Development
```bash
npm run dev
```
- Serves React SPA on port 5000
- SEO files available at `/public/SEO/`

### Production
```bash
npm start
```
- Runs production server (`server.js`)
- Bot detection active
- Serves prerendered HTML to search engines
- Serves React SPA to human users

### Deployment Configuration
**File:** `package.json` scripts section
```json
{
  "scripts": {
    "build": "vite build && node scripts/generate-seo-files-standalone.cjs",
    "start": "node server.js"
  }
}
```

## Bot Detection & Content Delivery

### How It Works
The production server (`server.js`) detects search engine bots and serves appropriate content:

- **Search Engine Bots** → Get prerendered HTML from `build/SEO/`
- **Human Users** → Get interactive React SPA

### Monitoring Bot Detection
Check server logs for bot detection:
```
🤖 Bot detected: Mozilla/5.0 (compatible; Googlebot/2.1...)
✅ Serving SEO content: /build/SEO/index.html
```

### Adding New Bot Patterns
**File to edit:** `server.js`

```javascript
const botPatterns = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /google-site-verification/i,
  // Add your new bot pattern here
];
```

## URL Mapping & Routes

### Static Routes
**File to edit:** `server.js` (routeMap object)

```javascript
const routeMap = {
  '/': 'index.html',
  '/web-application-development': 'web-application-development.html',
  '/mobile-app-development': 'mobile-application-development.html',
  // Add new static routes here
};
```

### Dynamic Routes
Handled automatically for:
- `/articles/*` → `build/SEO/articles/[slug].html`
- `/events/*` → `build/SEO/events/[slug].html`
- `/careers/*` → `build/SEO/careers/[slug].html`
- `/business-automation/*` → `build/SEO/business-automation/[slug].html`

## Common SEO Tasks

### 1. Update Homepage SEO
**File:** `scripts/create-homepage-seo.ts`
- Modify title, description, keywords
- Update structured data
- Change Open Graph metadata

### 2. Add New Service Pages
1. Create page component in `src/pages/`
2. Add route to `src/router.tsx`
3. Add to `routeMap` in `server.js`
4. Add to sitemap in `scripts/seo5-build-sitemap-dynamic.ts`
5. Run SEO regeneration

### 3. Update Meta Keywords
**File:** `src/utils/seo3-config.ts`
- Global SEO configuration
- Default keywords and metadata

### 4. Google Search Console Integration
- Submit updated sitemap: `https://tepasolutions.asia/sitemap.xml`
- Request indexing for new pages
- Monitor for "indexing request rejected" errors

## Testing SEO Setup

### Test Bot Detection
```bash
# Test Googlebot
curl -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
     http://localhost:5000/

# Check response headers
curl -I -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
       http://localhost:5000/
```

Expected headers:
- `x-bot-served: seo-prerendered`
- `cache-control: public, max-age=300, must-revalidate`
- `x-robots-tag: index, follow`

### Validate SEO Files
1. Check `build/SEO/` directory has all expected files
2. Verify sitemap.xml is accessible: `http://localhost:5000/sitemap.xml`
3. Test specific routes with bot user agents

## Troubleshooting

### Common Issues

1. **SEO files not generating**
   - Check data files have valid content
   - Ensure build process completed successfully
   - Verify file permissions

2. **Bot detection not working**
   - Check server logs for bot detection messages
   - Verify user agent patterns in `server.js`
   - Test with correct bot user agents

3. **Sitemap not updating**
   - Run `node scripts/seo5-build-sitemap-dynamic.ts`
   - Check data sources are properly imported
   - Verify sitemap.xml file permissions

4. **Search Console errors**
   - Monitor bot detection logs
   - Ensure prerendered files exist
   - Check cache headers and response codes

### Debug Commands
```bash
# Check SEO file structure
ls -la build/SEO/

# Test sitemap generation
node scripts/seo5-build-sitemap-dynamic.ts

# Validate specific SEO file
curl http://localhost:5000/articles/your-article-slug

# Check server logs
tail -f /tmp/logs/Production_Server_*.log
```

## Best Practices

1. **Content Updates**
   - Always regenerate SEO files after content changes
   - Test bot detection after deployment
   - Monitor Search Console for indexing issues

2. **Performance**
   - Keep SEO files under 100KB when possible
   - Optimize images used in Open Graph tags
   - Use appropriate cache headers

3. **SEO Optimization**
   - Include relevant keywords in titles and descriptions
   - Use proper heading structure in content
   - Add structured data for rich snippets
   - Maintain consistent URL patterns

4. **Monitoring**
   - Regular sitemap submissions to Search Console
   - Monitor bot detection logs
   - Track indexing status for new content