import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'service' | 'organization';
  ogImage?: string;
  structuredData?: any;
  breadcrumbs?: Array<{ name: string; url: string }>;
  alternateLanguages?: Array<{ lang: string; url: string }>;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = 'https://tepasolutions.asia/og-image.jpg',
  structuredData,
  breadcrumbs,
  alternateLanguages,
  author = 'Tepa Solutions',
  publishedTime,
  modifiedTime,
  noIndex = false
}: SEOHeadProps) {
  
  useEffect(() => {
    // Set document title
    document.title = title;

    // Remove existing meta tags
    const existingMetas = document.querySelectorAll('meta[data-seo="true"]');
    existingMetas.forEach(meta => meta.remove());

    // Remove existing structured data
    const existingStructuredData = document.querySelectorAll('script[type="application/ld+json"]');
    existingStructuredData.forEach(script => script.remove());

    // Create meta tags
    const metaTags = [
      // Basic SEO
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author },
      { name: 'robots', content: noIndex ? 'noindex,nofollow' : 'index,follow' },
      { name: 'googlebot', content: noIndex ? 'noindex,nofollow' : 'index,follow' },
      
      // Open Graph / Facebook
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: canonical || window.location.href },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: 'Tepa Solutions' },
      { property: 'og:locale', content: 'en_US' },
      
      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:site', content: '@tepasolutions' },
      { name: 'twitter:creator', content: '@tepasolutions' },
      
      // Additional SEO
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { name: 'theme-color', content: '#030213' },
      { name: 'msapplication-TileColor', content: '#030213' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      
      // Favicon and App Icons
      { name: 'application-name', content: 'Tepa Solutions' },
      { name: 'msapplication-config', content: '/browserconfig.xml' },
      
      // Geographic targeting
      { name: 'geo.region', content: 'PH' },
      { name: 'geo.country', content: 'Philippines' },
      { name: 'geo.placename', content: 'Philippines' },
      
      // Business info
      { name: 'DC.title', content: title },
      { name: 'DC.creator', content: 'Tepa Solutions' },
      { name: 'DC.subject', content: keywords },
      { name: 'DC.description', content: description },
      { name: 'DC.language', content: 'en' },
      { name: 'DC.coverage', content: 'Worldwide' }
    ];

    // Add published/modified times if provided
    if (publishedTime) {
      metaTags.push({ property: 'article:published_time', content: publishedTime });
    }
    if (modifiedTime) {
      metaTags.push({ property: 'article:modified_time', content: modifiedTime });
    }

    // Create and append meta tags
    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute('data-seo', 'true');
      
      if ('name' in tag) {
        meta.setAttribute('name', tag.name);
      } else if ('property' in tag) {
        meta.setAttribute('property', tag.property);
      }
      
      meta.setAttribute('content', tag.content);
      document.head.appendChild(meta);
    });

    // Add favicon and icon links
    const iconLinks = [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.json' }
    ];

    // Remove existing favicon links
    const existingIcons = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]');
    existingIcons.forEach(icon => icon.remove());

    // Add favicon links
    iconLinks.forEach(linkData => {
      const link = document.createElement('link');
      Object.entries(linkData).forEach(([key, value]) => {
        link.setAttribute(key, value);
      });
      document.head.appendChild(link);
    });

    // Set canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical || window.location.href);

    // Add alternate language links
    if (alternateLanguages) {
      alternateLanguages.forEach(({ lang, url }) => {
        const alternateLink = document.createElement('link');
        alternateLink.setAttribute('rel', 'alternate');
        alternateLink.setAttribute('hreflang', lang);
        alternateLink.setAttribute('href', url);
        document.head.appendChild(alternateLink);
      });
    }

    // Default structured data for organization
    const defaultStructuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://tepasolutions.com/#organization",
          "name": "Tepa Solutions",
          "url": "https://tepasolutions.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://tepasolutions.com/logo.png",
            "width": 500,
            "height": 500
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+63-2-8558-1237",
            "contactType": "customer service",
            "availableLanguage": ["English", "Filipino"]
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Philippines"
          },
          "founder": {
            "@type": "Person",
            "name": "Jerrie Mataya"
          },
          "foundingDate": "2024",
            "description": "Specialized in web development, mobile app development, business automation, and AI-powered solutions for businesses worldwide. Open to partnerships and collaboration opportunities.",          "sameAs": [
            "https://linkedin.com/company/tepa-solutions",
            "https://twitter.com/tepasolutions",
            "https://facebook.com/tepasolutions"
          ],
          "services": [
            "Web Application Development",
            "Mobile App Development", 
            "Business Process Automation",
            "Digital Transformation Consulting",
            "AI & Machine Learning Solutions",
            "Cloud Migration Services",
            "API Integration",
            "SEO & Digital Marketing"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://tepasolutions.com/#website",
          "url": "https://tepasolutions.com",
          "name": "Tepa Solutions - Software Provider Philippines",
          "publisher": {
            "@id": "https://tepasolutions.com/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://tepasolutions.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ]
    };

    // Add breadcrumbs structured data if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbStructuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      };
      
      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.text = JSON.stringify(breadcrumbStructuredData);
      document.head.appendChild(breadcrumbScript);
    }

    // Add custom structured data or default
    const finalStructuredData = structuredData || defaultStructuredData;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(finalStructuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Cleanup is handled by the next useEffect run
    };
  }, [title, description, keywords, canonical, ogType, ogImage, structuredData, breadcrumbs, alternateLanguages, author, publishedTime, modifiedTime, noIndex]);

  return null; // This component doesn't render anything
}

// SEO utility functions
export const generateKeywords = (primary: string[], secondary: string[] = []) => {
  const baseKeywords = [
    'digital transformation Philippines',
    'business automation solutions',
    'web development company Philippines',
    'mobile app development',
    'custom software development',
    'AI solutions Philippines',
    'cloud migration services',
    'enterprise software solutions',
    'digital innovation agency',
    'tech consulting Philippines',
    'API integration services',
    'workflow automation tools',
    'SaaS development',
    'full-stack development',
    'scalable web applications',
    'Tepa Solutions',
    'affordable website',
    'professional web design',
    'responsive web design',
    'small business website',
    'shopify website',
    'wordpress website',
    'customer service automation',
    'customer service philippines',
    'mobile app maker',
    'mobile app developer',
    'mobile app development company',
    'mobile app development philippines',
    'mobile app development services',
    'business process automation',
    'business process automation tools',
    'business process automation services',
    'business process automation software',
    'fintech solutions',
    'fintech philippines',
    'ecommerce solutions',
    'sales automation',
    'marketing automation',
    'hr automation',
    'inventory management automation',
    'finance automation'
    
  ];
  
  return [...primary, ...secondary, ...baseKeywords].join(', ');
};

export const createServiceStructuredData = (service: any) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@id": "https://tepasolutions.com/#organization"
  },
  "serviceType": service.type,
  "areaServed": "Worldwide",
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": service.url,
    "servicePhone": "+63-2-8558-1237",
    "serviceSmsNumber": "+63-2-8558-1237"
  }
});

export const createArticleStructuredData = (article: any) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "author": {
    "@type": "Person",
    "name": article.author || "Tepa Solutions Team"
  },
  "publisher": {
    "@id": "https://tepasolutions.com/#organization"
  },
  "datePublished": article.publishedDate,
  "dateModified": article.modifiedDate || article.publishedDate,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  },
  "image": article.image
});