// Enhanced SEO generator for all routes
import { companySeoData, serviceSeoData } from './seo-company'
import { articleSeoData, eventSeoData, careerSeoData } from './seo-content'

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonical?: string
  robots?: string
  jsonLd?: object
}

const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://tepasolutions.asia' 
  : 'http://localhost:5173'

// Generate SEO data for any route
export function generateSEOData(path: string, slug?: string): SEOData {
  // Remove trailing slash except for root
  const normalizedPath = path === '/' ? path : path.replace(/\/$/, '')
  
  // Company pages
  if (companySeoData[normalizedPath]) {
    return {
      ...companySeoData[normalizedPath],
      canonical: `${baseUrl}${normalizedPath}`,
      ogImage: `${baseUrl}/og-tepa-default.jpg`,
      twitterImage:`${baseUrl}/twitter-tepa-default.jpg`
    }
  }
  
  // Service pages
  if (serviceSeoData[normalizedPath]) {
    return {
      ...serviceSeoData[normalizedPath],
      canonical: `${baseUrl}${normalizedPath}`,
      ogImage:  `${baseUrl}/og-tepa-services.jpg`,
      twitterImage:  `${baseUrl}/twitter-tepa-services.jpg`
    }
  }
  
  // Dynamic content pages
  if (slug) {
    if (normalizedPath.includes('/articles/')) {
      const articleData = articleSeoData[slug]
      if (articleData) {
        return {
          ...articleData,
          canonical: `${baseUrl}/articles/${slug}`,
          ogImage:   `${baseUrl}/og-article-${slug}.jpg`,
          twitterImage:   `${baseUrl}/twitter-article-${slug}.jpg`
        }
      }
    }
    
    if (normalizedPath.includes('/events/')) {
      const eventData = eventSeoData[slug]
      if (eventData) {
        return {
          ...eventData,
          canonical: `${baseUrl}/events/${slug}`,
          ogImage: `${baseUrl}/og-event-${slug}.jpg`,
          twitterImage:  `${baseUrl}/twitter-event-${slug}.jpg`
        }
      }
    }
    
    if (normalizedPath.includes('/careers/')) {
      const careerData = careerSeoData[slug]
      if (careerData) {
        return {
          ...careerData,
          canonical: `${baseUrl}/careers/${slug}`,
          ogImage:  `${baseUrl}/og-careers.jpg`,
          twitterImage:  `${baseUrl}/twitter-careers.jpg`
        }
      }
    }
  }
  
  // Default fallback SEO
  return {
    title: 'Tepa Solutions - Digital Innovation & Business Automation',
    description: 'Transform your business with cutting-edge digital solutions. Expert web development, mobile apps, and automation services in the Philippines.',
    keywords: ['digital solutions', 'business automation', 'web development', 'mobile apps', 'Philippines', 'technology'],
    canonical: `${baseUrl}${normalizedPath}`,
    ogImage: `${baseUrl}/og-tepa-default.jpg`,
    twitterImage: `${baseUrl}/twitter-tepa-default.jpg`,
    robots: 'index, follow'
  }
}

// Generate HTML meta tags from SEO data
export function generateMetaTags(seoData: SEOData): string {
  const {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    canonical,
    robots,
    jsonLd
  } = seoData

  return `
  <!-- Primary Meta Tags -->
  <title>${title}</title>
  <meta name="title" content="${title}">
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords.join(', ')}">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${canonical}">
  
  <!-- Robots -->
  <meta name="robots" content="${robots || 'index, follow'}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${ogTitle || title}">
  <meta property="og:description" content="${ogDescription || description}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:site_name" content="Tepa Solutions">
  <meta property="og:locale" content="en_PH">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${canonical}">
  <meta property="twitter:title" content="${twitterTitle || title}">
  <meta property="twitter:description" content="${twitterDescription || description}">
  <meta property="twitter:image" content="${twitterImage}">
  <meta property="twitter:site" content="@tepasolutions">
  <meta property="twitter:creator" content="@tepasolutions">
  
  <!-- JSON-LD Structured Data -->
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>` : ''}
  `.trim()
}

// Generate sitemap priorities and change frequencies
export function getSitemapData(path: string): { priority: string; changefreq: string } {
  if (path === '/') return { priority: '1.0', changefreq: 'weekly' }
  
  // High priority service pages
  if (path.includes('/business-automation') || 
      path.includes('/mobile-app-development') || 
      path.includes('/web-application-development')) {
    return { priority: '0.9', changefreq: 'monthly' }
  }
  
  // Important contact/company pages
  if (path.includes('/contact-us/sales') || 
      path.includes('/learn-about-tepa')) {
    return { priority: '0.8', changefreq: 'monthly' }
  }
  
  // Dynamic content
  if (path.includes('/articles/') || path.includes('/events/')) {
    return { priority: '0.7', changefreq: 'weekly' }
  }
  
  if (path.includes('/careers/')) {
    return { priority: '0.8', changefreq: 'weekly' }
  }
  
  // Default priority
  return { priority: '0.6', changefreq: 'monthly' }
}