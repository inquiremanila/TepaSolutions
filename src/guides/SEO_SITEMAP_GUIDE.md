# SEO and Sitemap Building Guide

## Overview

This guide explains how the SEO and sitemap system works in your Tepa Solutions project. The files are numbered to show their relationships and dependencies.

## File Structure and Dependencies

### 🗃️ SEO1: Data Sources (`src/utils/seo1-data-sources.ts`)
**Purpose**: Central hub for all content data
- Imports articles from `src/pages/ArticlesPage.tsx`
- Imports events from `src/pages/EventsPage.tsx` 
- Imports careers from `src/pages/CareersPage.tsx`
- Generates slugs for articles (they don't have them by default)
- Exports unified data structure for other SEO components

**Dependencies**: Raw data files
**Used by**: SEO2 (sitemap generator)

### 🗺️ SEO2: Sitemap Generator (`src/utils/seo2-sitemap-generator.ts`)
**Purpose**: Dynamic sitemap generation from content data
- Imports data from SEO1
- Generates sitemap entries for all content types
- Creates proper XML structure with images, priorities, etc.
- Handles static pages and dynamic content

**Dependencies**: SEO1 (data sources)
**Used by**: SEO5 (build script)

### ⚙️ SEO3: Config (`src/utils/seo3-config.ts`)
**Purpose**: SEO configuration and metadata
- Company information and defaults
- Meta tag generation
- Breadcrumb generation
- Structured data helpers

**Dependencies**: None
**Used by**: SEO4 (head component)

### 🏷️ SEO4: Head Component (`src/components/seo4-head.tsx`)
**Purpose**: React component that renders SEO meta tags
- Uses SEO3 for configuration
- Generates structured data
- Handles Open Graph, Twitter Cards
- Manages canonical URLs and meta descriptions

**Dependencies**: SEO3 (config)
**Used by**: Page components throughout the app

### 🔨 SEO5: Build Script (`scripts/seo5-build-sitemap.js`)
**Purpose**: Automated sitemap generation during build
- Reads content from SEO2
- Generates sitemap.xml files
- Updates both public/ and build/ directories
- Runs during npm build process

**Dependencies**: SEO2 (sitemap generator)
**Used by**: Build process

## How It Works

### Data Flow
```
Content Files → SEO1 → SEO2 → SEO5 → sitemap.xml
                ↓
              SEO3 → SEO4 → Page Meta Tags
```

### Build Process
1. **Content Creation**: Add articles, events, or careers to their respective data files
2. **Data Import**: SEO1 imports and processes all content data
3. **Sitemap Generation**: SEO2 creates sitemap entries from the data
4. **Build Execution**: SEO5 runs during build to generate sitemap.xml
5. **SEO Rendering**: SEO4 renders meta tags on each page using SEO3 config

## Adding New Content

### Articles
1. Add to `src/pages/ArticlesPage.tsx` in the `articles` array
2. Include: `id`, `title`, `excerpt`, `content`, `author`, `date`, `tags`, `category`
3. SEO1 automatically generates slug from title
4. Build process will include in sitemap

### Events  
1. Add to `src/pages/EventsPage.tsx` in the `events` array
2. Include: `id`, `slug`, `title`, `description`, `date`, `image`, etc.
3. Build process will include in sitemap

### Careers
1. Add to `src/pages/CareersPage.tsx` in the `jobPositions` array  
2. Include: `id`, `slug`, `title`, `department`, `type`, `description`, etc.
3. Build process will include in sitemap

## Build Commands

### Generate Sitemap
```bash
# Simple generation (recommended for development)
node scripts/seo5-build-sitemap.js --simple

# Full generation (requires TypeScript compilation)
npm run build:seo

# Manual generation during development
npm run sitemap
```

### Integration with Build Process
The sitemap generation is automatically included in:
- `npm run build` - Full production build
- `npm run sitemap` - Standalone sitemap generation

## URLs Generated

### Articles
- Base: `/articles`
- Individual: `/articles/{slug}`
- Example: `/articles/iphone-17-review-philippines-pricing-release`

### Events
- Base: `/events`
- Individual: `/events/{slug}`
- Example: `/events/introduction-to-html-and-css`

### Careers
- Base: `/careers`
- Individual: `/careers/{slug}`
- Example: `/careers/intern-article-writer`

## Sitemap Features

### XML Structure
- Proper XML formatting with namespaces
- Image tags for content with featured images
- Priority settings (homepage=1.0, services=0.9, content=0.7-0.8)
- Change frequency hints for search engines
- Last modified dates from content data

### SEO Optimization
- Canonical URLs for all pages
- Open Graph and Twitter Card meta tags
- Structured data (JSON-LD) for articles and events
- Proper meta descriptions and keywords
- Image optimization tags

## Troubleshooting

### Sitemap Not Updating
1. Check that new content has proper data structure
2. Run `npm run sitemap` manually to regenerate
3. Verify build script runs without errors
4. Check that content files export data correctly

### Missing URLs
1. Verify content has required fields (id, slug/title)
2. Check SEO1 is importing from correct files
3. Ensure build script includes all content types
4. Check for TypeScript compilation errors

### SEO Meta Tags Not Showing
1. Verify SEO4 component is imported on pages
2. Check SEO3 config has correct base URL
3. Ensure structured data is valid JSON-LD
4. Test with browser dev tools and SEO checkers

## Best Practices

### Content Structure
- Always include all required fields
- Use descriptive, SEO-friendly titles
- Add relevant tags and categories
- Include featured images when possible
- Keep excerpts under 160 characters for meta descriptions

### Slug Generation
- Use kebab-case (lowercase with hyphens)
- Avoid special characters and numbers at the start
- Keep under 60 characters for better URLs
- Include target keywords when relevant

### Sitemap Maintenance
- Regenerate sitemap after adding content
- Test sitemap validity with online tools
- Submit updated sitemap to Google Search Console
- Monitor for crawl errors and fix promptly

## File Connections Summary

```
📊 Content Data Files
├── src/pages/ArticlesPage.tsx (articles array)
├── src/pages/EventsPage.tsx (events array)  
└── src/pages/CareersPage.tsx (jobPositions array)

🔄 SEO Processing Chain
├── SEO1: seo1-data-sources.ts (imports & processes data)
├── SEO2: seo2-sitemap-generator.ts (creates sitemap entries)
├── SEO3: seo3-config.ts (SEO configuration)
├── SEO4: seo4-head.tsx (React meta tag component)
└── SEO5: seo5-build-sitemap.js (build automation)

📄 Output Files
├── public/sitemap.xml (development)
└── build/sitemap.xml (production)
```

This numbered system makes it easy to understand which files depend on each other and how the SEO/sitemap generation flows through your application.