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
      
      // Geographic targeting - Worldwide English-speaking
      { name: 'geo.region', content: 'US;CA;GB;AU;NZ;ZA;PH;SG;JP;IND' },
      { name: 'geo.country', content: 'Worldwide' },
      { name: 'geo.placename', content: 'Global' },
      
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
          "@id": "https://tepasolutions.asia/#organization",
          "name": "Tepa Solutions",
          "url": "https://tepasolutions.asia",
          "logo": {
            "@type": "ImageObject",
            "url": "https://tepasolutions.asia/logo.png",
            "width": 500,
            "height": 500
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+63-2-8558-1237",
            "contactType": "customer service",
            "availableLanguage": ["English"]
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Philippines"
          },
          "foundingDate": "2024",
          "description": "Leading digital transformation agency specializing in business automation, web development, mobile app development, and AI-powered solutions for businesses worldwide.",
          "sameAs": [
            "https://linkedin.com/company/tepa-solutions",
            "https://twitter.com/tepasolutions",
            "https://facebook.com/tepasolutions"
          ],
          "areaServed": "Worldwide",
          "services": [
            "Business Process Automation",
            "Web Application Development",
            "Mobile App Development", 
            "Digital Transformation Consulting",
            "AI & Machine Learning Solutions",
            "Cloud Migration Services",
            "API Integration",
            "Customer Service",
            "IT Support",
            "Customer Support Solutions",
            "SEO & Digital Marketing"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://tepasolutions.asia/#website",
          "url": "https://tepasolutions.asia",
          "name": "Tepa Solutions - Business Automation & Digital Solutions",
          "publisher": {
            "@id": "https://tepasolutions.asia/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://tepasolutions.asia/search?q={search_term_string}",
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
    // Common search queries people actually type
    'how can i automate my business',
    'business process automation',
    'automate customer service',
    'hire virtual assistant',
    'affordable website development',
    'cheap website design',
    'custom web application',
    'mobile app development services',
    'business automation tools',
    'workflow automation software',
    'digital transformation services',
    'outsource customer support',
    'hire remote developers',
    'cloud migration services',
    'API integration services',
    'automated business solutions',
    'small business automation',
    'enterprise software development',
    'ai chatbot development',
    'crm automation',
    'inventory management system',
    'e-commerce development',
    'saas application development',
    'business intelligence solutions',
    'data analytics services',
    'cost effective web solutions',
    'scalable web applications',
    'custom software development',
    'business consulting services',
    'digital marketing automation',
    'lead generation automation'
  ];
  
  return [...primary, ...secondary, ...baseKeywords].join(', ');
};

export const createServiceStructuredData = (service: any) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@id": "https://tepasolutions.asia/#organization"
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
    "@id": "https://tepasolutions.asia/#organization"
  },
  "datePublished": article.publishedDate,
  "dateModified": article.modifiedDate || article.publishedDate,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  },
  "image": article.image
});