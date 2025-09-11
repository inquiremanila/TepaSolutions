# Cloudflare Pages configuration for Tepa Solutions
name = "tepa-solutions-website"
compatibility_date = "2024-01-15"

[env.production]
route = "tepasolutions.asia/*"
zone_name = "tepasolutions.asia"

[env.staging]
route = "staging.tepasolutions.asia/*"

# Pages build configuration
[build]
command = "npm run build"
cwd = ""
watch_dir = ""

[build.upload]
format = "directory"
dir = "./dist"

# Custom headers for SEO and performance
[[headers]]
for = "/*"
[headers.values]
  X-Frame-Options = "DENY"
  X-Content-Type-Options = "nosniff"
  X-XSS-Protection = "1; mode=block"
  Referrer-Policy = "strict-origin-when-cross-origin"
  Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
for = "*.html"
[headers.values]
  Cache-Control = "public, max-age=300, s-maxage=86400"
  Content-Type = "text/html; charset=utf-8"

[[headers]]
for = "*.js"
[headers.values]
  Cache-Control = "public, max-age=31536000, immutable"
  Content-Type = "application/javascript; charset=utf-8"

[[headers]]
for = "*.css"
[headers.values]
  Cache-Control = "public, max-age=31536000, immutable" 
  Content-Type = "text/css; charset=utf-8"

[[headers]]
for = "*.png"
[headers.values]
  Cache-Control = "public, max-age=31536000, immutable"
  Content-Type = "image/png"

[[headers]]
for = "*.jpg"
[headers.values]
  Cache-Control = "public, max-age=31536000, immutable"
  Content-Type = "image/jpeg"

[[headers]]
for = "*.webp"
[headers.values]
  Cache-Control = "public, max-age=31536000, immutable"
  Content-Type = "image/webp"

[[headers]]
for = "*.svg"
[headers.values]
  Cache-Control = "public, max-age=31536000, immutable"
  Content-Type = "image/svg+xml; charset=utf-8"

[[headers]]
for = "/sitemap.xml"
[headers.values]
  Cache-Control = "public, max-age=86400"
  Content-Type = "application/xml; charset=utf-8"

[[headers]]
for = "/robots.txt"
[headers.values]
  Cache-Control = "public, max-age=86400"
  Content-Type = "text/plain; charset=utf-8"

[[headers]]
for = "/manifest.json"
[headers.values]
  Cache-Control = "public, max-age=86400"
  Content-Type = "application/manifest+json; charset=utf-8"

# Redirects for SEO
[[redirects]]
from = "/automation"
to = "/business-automation"
status = 301

[[redirects]]
from = "/services"
to = "/"
status = 301

[[redirects]]
from = "/about"
to = "/learn-about-tepa"
status = 301

[[redirects]]
from = "/contact"
to = "/contact-us/sales"
status = 301

# Handle old URLs
[[redirects]]
from = "/mobile-apps"
to = "/mobile-app-development"
status = 301

[[redirects]]
from = "/web-apps"
to = "/web-application-development"
status = 301

[[redirects]]
from = "/websites"
to = "/website-development"
status = 301

# Fallback for SPA routes (catch-all)
[[redirects]]
from = "/*"
to = "/index.html"
status = 200