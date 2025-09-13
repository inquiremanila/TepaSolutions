# SEO Deployment Configuration for Replit

## URL Rewrite Configuration

Add these URL rewrites to your Replit deployment configuration (.replit file) to enable bot detection and prerendered HTML serving:

```toml
# URL rewrites for SEO - bots get prerendered HTML, humans get SPA
[[deployment.rewrites]]
from = "/business-automation/*"
to = "/SEO/business-automation/:splat.html"

[[deployment.rewrites]]
from = "/articles/*"
to = "/SEO/articles/:splat.html"

[[deployment.rewrites]]
from = "/events/*"
to = "/SEO/events/:splat.html"

[[deployment.rewrites]]
from = "/careers/*"
to = "/SEO/careers/:splat.html"

[[deployment.rewrites]]
from = "/"
to = "/SEO/index.html"

[[deployment.rewrites]]
from = "/*"
to = "/SEO/:splat.html"

# Fallback to SPA for dynamic routes
[[deployment.rewrites]]
from = "/*"
to = "/index.html"
```

## How It Works

1. **Bot Detection**: The worker in `src/worker.ts` detects bot user agents
2. **Prerendered HTML**: Bots are served static HTML from `/public/SEO/` directory
3. **SPA for Humans**: Human users get the full React SPA experience
4. **Canonical URLs**: All prerendered HTML includes proper canonical links
5. **Sitemap**: Complete sitemap.xml generated with all routes and dynamic content

## Generated Files

- **Static HTML**: `public/SEO/` contains prerendered HTML for all pages
- **Sitemap**: `public/sitemap.xml` with all routes (27 URLs)
- **Bot Worker**: `src/worker.ts` handles user agent detection
- **Generator**: `scripts/generate-seo-files-standalone.cjs` for updates

## SEO Features Implemented

✅ **Bot Detection Worker** - Serves different content to bots vs humans
✅ **Prerendered HTML Files** - All static and dynamic routes covered
✅ **URL Rewriting Configuration** - Pretty URLs served to search engines  
✅ **Comprehensive Sitemap** - All routes and dynamic content included
✅ **Canonical Links** - Proper canonical URLs in all prerendered HTML
✅ **Open Graph & Twitter Cards** - Social media optimization
✅ **Structured Data** - JSON-LD for organization schema
✅ **Meta Tags** - Title, description, keywords for all pages

## Maintenance

Run the generator script when content changes:
```bash
node scripts/generate-seo-files-standalone.cjs
```

This will update all prerendered HTML files and regenerate the sitemap.xml