// Enhanced SEO configuration module for Tepa Solutions
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  areaServing: string[];
  image?: string;
  type?: 'website' | 'article' | 'service' | 'company';
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  category?: string;
  noPrice?: boolean;
  noSalary?: boolean;
}

// Global company information
export const COMPANY_INFO = {
  name: 'Tepa Solutions',
description: 'Affordable web, mobile, and automation solutions. Scalable for startups and enterprises to build apps, websites, and digital growth tools.',
  url: 'https://tepasolutions.asia',
  logo: '/tepa.png',
  phone: '+63-945-723-9818', // Update with actual phone
  email: 'info@tepasolutions.asia',
  address: 'Philippines', // Update with actual address
  foundedYear: '2024',
  social: {
    facebook: 'https://facebook.com/tepasolutions',
    linkedin: 'https://linkedin.com/company/tepasolutions',
    twitter: 'https://twitter.com/tepasolutions'
  }
};

// Service areas - worldwide coverage
export const SERVICE_AREAS = [
  // Primary markets
  'Philippines',
  'United States',
  'United Kingdom', 
  'Australia',
  
  // Major cities Philippines
  'Manila, Philippines',
  'Cebu, Philippines',
  'Davao, Philippines',
  'Quezon City, Philippines',
  'Pasig City, Philippines',
  
  // Major cities US
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'San Francisco, CA',
  'Seattle, WA',
  'Miami, FL',
  
  // Major cities UK
  'London, UK',
  'Manchester, UK',
  'Birmingham, UK',
  'Glasgow, UK',
  'Liverpool, UK',
  
  // Major cities Australia
  'Sydney, Australia',
  'Melbourne, Australia',
  'Brisbane, Australia',
  'Perth, Australia',
  'Adelaide, Australia',
  
  // Global reach
  'Worldwide',
  'Remote Services Available'
];

// Core business keywords
export const CORE_KEYWORDS = [
  'business automation',
  'digital transformation', 
  'web development',
  'mobile app development',
  'SEO services',
  'process automation',
  'workflow optimization',
  'custom software development',
  'enterprise solutions',
  'technology consulting'
];

// SEO configurations for different page types
export const SEO_CONFIGS = {
  // Home page
  home: {
    title: 'Web, Mobile App & Automation Provider in the Philippines',
    description: 'Web, mobile, and automation solutions in the Philippines. Trusted by businesses to build apps, websites, and digital growth tools.',
    keywords: [
      ...CORE_KEYWORDS,
      'digital transformation company',
      'business automation services',
      'enterprise software development',
      'technology solutions provider',
      'software company ',
      'web development Manila',
      'mobile app development ',
      'business automation',
      'IT solutions '
    ],
    areaServing: SERVICE_AREAS,
    image: '/og-home.jpg',
    type: 'website' as const
  },

  // Services
  services: {
    'business-automation': {
      title: 'Business Automation Services | Process Optimization | Tepa Solutions',
      description: 'Streamline operations with intelligent business automation. Sales, marketing, HR, finance automation solutions for companies worldwide. Get free consultation.',
      keywords: [
        'business automation',
        'process automation',
        'workflow optimization',
        'sales automation',
        'marketing automation',
        'HR automation',
        'finance automation',
        'inventory management automation',
              'automation services',

      ],
      areaServing: SERVICE_AREAS,
      image: '/services/business-automation-og.jpg',
      type: 'service' as const
    },

    'mobile-app-development': {
      title: 'Mobile App Development Services | iOS & Android Apps | Tepa Solutions',
      description: 'Custom mobile app development for iOS and Android. Native and cross-platform solutions for startups and enterprises across US, UK, AU, PH and globally.',
      keywords: [
        'mobile app development',
        'iOS app development',
        'Android app development',
        'cross-platform apps',
        'React Native development',
        'Flutter development',
        'mobile app design',
        'app store optimization'
      ],
      areaServing: SERVICE_AREAS,
      image: '/services/mobile-app-og.jpg',
      type: 'service' as const
    },

    'web-application-development': {
      title: 'Web Application Development | Custom Web Apps | Tepa Solutions',
      description: 'Build powerful web applications with modern frameworks. React, Node.js, Python, and cloud solutions for businesses worldwide.',
      keywords: [
        'web application development',
        'custom web apps',
        'React development',
        'Node.js development',
        'Python development',
        'cloud applications',
        'SaaS development',
        'API development'
      ],
      areaServing: SERVICE_AREAS,
      image: '/services/web-app-og.jpg',
      type: 'service' as const
    },

    'website-development': {
      title: 'Professional Website Development | Modern Web Design | Tepa Solutions',
      description: 'Create stunning, responsive websites that convert. E-commerce, corporate, and portfolio websites with SEO optimization and modern design.',
      keywords: [
        'website development',
        'web design',
        'responsive websites',
        'e-commerce websites',
        'WordPress development',
        'website redesign',
        'landing page design',
        'CMS development'
      ],
      areaServing: SERVICE_AREAS,
      image: '/services/website-dev-og.jpg',
      type: 'service' as const
    },

    'seo-services': {
      title: 'Professional SEO Services | Search Engine Optimization | Tepa Solutions',
      description: 'Boost your online visibility with expert SEO services. Keyword research, on-page optimization, link building, and local SEO for global reach.',
      keywords: [
        'SEO services',
        'search engine optimization',
        'keyword research',
        'on-page SEO',
        'off-page SEO',
        'local SEO',
        'technical SEO',
        'SEO audit',
        'link building',
        'Google ranking'
      ],
      areaServing: SERVICE_AREAS,
      image: '/services/seo-services-og.jpg',
      type: 'service' as const
    }
  },

  // Company pages
  company: {
    'learn-about-tepa': {
      title: 'About Tepa Solutions | Digital Transformation Experts | Our Story',
      description: 'Learn about Tepa Solutions - your trusted partner in digital transformation. Discover our mission, values, and commitment to innovation across global markets.',
      keywords: [
        'about tepa solutions',
        'digital transformation company',
        'technology consulting',
        'business automation experts',
        'software development team',
        'innovation partners'
      ],
      areaServing: SERVICE_AREAS,
      image: '/company/about-og.jpg',
      type: 'company' as const
    },

    'careers': {
      title: 'Careers at Tepa Solutions | Join Our Remote-First Team',
      description: 'Join Tepa Solutions and shape the future of digital transformation. Remote opportunities worldwide in development, automation, and digital marketing.',
      keywords: [
        'careers tepa solutions',
        'remote jobs',
        'developer jobs',
        'digital marketing careers',
        'automation engineer jobs',
        'technology careers',
        'work from home',
        'global opportunities'
      ],
      areaServing: SERVICE_AREAS,
      image: '/company/careers-og.jpg',
      type: 'company' as const,
      noSalary: true
    },

    'who-we-serve': {
      title: 'Industries We Serve | Tepa Solutions Client Portfolio',
      description: 'Tepa Solutions serves startups, SMBs, and enterprises across various industries with tailored digital transformation and automation solutions.',
      keywords: [
        'industries served',
        'client portfolio',
        'startup solutions',
        'enterprise clients',
        'SMB digital transformation',
        'industry expertise',
        'sector specialization'
      ],
      areaServing: SERVICE_AREAS,
      image: '/company/clients-og.jpg',
      type: 'company' as const
    }
  },

  // Contact pages
  contact: {
    'contact-us/sales': {
      title: 'Contact Sales | Get Quote | Tepa Solutions',
      description: 'Ready to transform your business? Contact our sales team for a free consultation and custom quote. Available worldwide with 24/7 support.',
      keywords: [
        'contact sales',
        'get quote',
        'free consultation',
        'business inquiry',
        'project quote',
        'sales contact',
        'consultation booking'
      ],
      areaServing: SERVICE_AREAS,
      image: '/contact/sales-og.jpg',
      type: 'company' as const,
      noPrice: true
    },

    'contact-us/support': {
      title: 'Technical Support | Help Center | Tepa Solutions',
      description: 'Get expert technical support for your projects. Our global support team is ready to help with any technical issues or questions.',
      keywords: [
        'technical support',
        'help center',
        'customer support',
        'project support',
        'technical assistance',
        '24/7 support'
      ],
      areaServing: SERVICE_AREAS,
      image: '/contact/support-og.jpg',
      type: 'company' as const
    },

    'contact-us/volunteer': {
      title: 'Volunteer Opportunities | Community Impact | Tepa Solutions',
      description: 'Join our community initiatives and make a difference. Volunteer opportunities in tech education, digital literacy, and community development.',
      keywords: [
        'volunteer opportunities',
        'community service',
        'tech education',
        'digital literacy',
        'social impact',
        'community development'
      ],
      areaServing: SERVICE_AREAS,
      image: '/contact/volunteer-og.jpg',
      type: 'company' as const
    }
  }
};

// Dynamic SEO generator for articles, events, and careers
export function generateDynamicSEO(
  type: 'article' | 'event' | 'career',
  data: {
    title?: string;
    description?: string;
    category?: string;
    tags?: string[];
    publishDate?: string;
    location?: string;
    slug?: string;
  }
): SEOConfig {
  const baseKeywords = [...CORE_KEYWORDS];
  
  switch (type) {
    case 'article':
      return {
        title: data.title ? `${data.title} | Tepa Solutions Blog` : 'Articles & Insights | Tepa Solutions',
        description: data.description || 'Read the latest insights on digital transformation, business automation, and technology trends from Tepa Solutions experts.',
        keywords: [
          ...baseKeywords,
          'technology blog',
          'digital transformation insights',
          'automation trends',
          'tech articles',
          'industry insights',
          ...(data.tags || [])
        ],
        areaServing: SERVICE_AREAS,
        image: '/blog/default-article-og.jpg',
        type: 'article',
        author: 'Tepa Solutions Team',
        publishDate: data.publishDate,
        category: data.category || 'Technology',
        noPrice: true
      };

    case 'event':
      return {
        title: data.title ? `${data.title} | Tepa Solutions Events` : 'Events & Workshops | Tepa Solutions',
        description: data.description || 'Join Tepa Solutions events, workshops, and training sessions on digital transformation and technology innovation.',
        keywords: [
          ...baseKeywords,
          'tech events',
          'workshops',
          'training sessions',
          'webinars',
          'technology conferences',
          'skill development',
          ...(data.tags || [])
        ],
        areaServing: data.location ? [data.location, ...SERVICE_AREAS] : SERVICE_AREAS,
        image: '/events/default-event-og.jpg',
        type: 'website',
        publishDate: data.publishDate,
        category: data.category || 'Events',
        noPrice: true
      };

    case 'career':
      return {
        title: data.title ? `${data.title} | Careers | Tepa Solutions` : 'Career Opportunities | Tepa Solutions',
        description: data.description || 'Explore career opportunities at Tepa Solutions. Join our global team working on cutting-edge digital transformation projects.',
        keywords: [
          ...baseKeywords,
          'job opportunities',
          'remote careers',
          'tech jobs',
          'developer positions',
          'global opportunities',
          'work from home',
          ...(data.tags || [])
        ],
        areaServing: SERVICE_AREAS,
        image: '/careers/default-career-og.jpg',
        type: 'website',
        publishDate: data.publishDate,
        category: data.category || 'Careers',
        noPrice: true,
        noSalary: true
      };

    default:
      return {
        title: 'Tepa Solutions',
        description: 'Digital transformation and business automation solutions',
        keywords: baseKeywords,
        areaServing: SERVICE_AREAS,
        type: 'website'
      };
  }
}

// Get SEO config by path
export function getSEOConfig(path: string, dynamicData?: any): SEOConfig {
  // Remove leading slash and trailing slash
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  
  // Handle home page
  if (!cleanPath || cleanPath === 'index') {
    return SEO_CONFIGS.home;
  }
  
  // Handle dynamic routes
  if (cleanPath.startsWith('articles/')) {
    return generateDynamicSEO('article', dynamicData || { slug: cleanPath });
  }
  
  if (cleanPath.startsWith('events/')) {
    return generateDynamicSEO('event', dynamicData || { slug: cleanPath });
  }
  
  if (cleanPath.startsWith('careers/') && cleanPath !== 'careers') {
    return generateDynamicSEO('career', dynamicData || { slug: cleanPath });
  }
  
  // Handle service pages
  for (const [serviceKey, serviceConfig] of Object.entries(SEO_CONFIGS.services)) {
    if (cleanPath === serviceKey || cleanPath.startsWith(`${serviceKey}/`)) {
      return serviceConfig;
    }
  }
  
  // Handle company pages
  for (const [companyKey, companyConfig] of Object.entries(SEO_CONFIGS.company)) {
    if (cleanPath === companyKey) {
      return companyConfig;
    }
  }
  
  // Handle contact pages
  for (const [contactKey, contactConfig] of Object.entries(SEO_CONFIGS.contact)) {
    if (cleanPath === contactKey) {
      return contactConfig;
    }
  }
  
  // Fallback to home config
  return SEO_CONFIGS.home;
}

// Generate structured data (JSON-LD)
export function generateStructuredData(seoConfig: SEOConfig, path: string): object {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": seoConfig.type === 'article' ? 'Article' : 
              seoConfig.type === 'service' ? 'Service' : 
              'Organization',
    "name": COMPANY_INFO.name,
    "description": seoConfig.description,
    "url": `${COMPANY_INFO.url}${path}`,
    "logo": {
      "@type": "ImageObject",
      "url": `${COMPANY_INFO.url}${COMPANY_INFO.logo}`
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": COMPANY_INFO.phone,
      "contactType": "Customer Service",
      "availableLanguage": ["English"],
      "areaServed": seoConfig.areaServing
    },
    "sameAs": Object.values(COMPANY_INFO.social),
    "foundingDate": COMPANY_INFO.foundedYear,
    "areaServed": seoConfig.areaServing.map(area => ({
      "@type": "Place",
      "name": area
    }))
  };

  // Add article-specific structured data
  if (seoConfig.type === 'article') {
    return {
      ...baseStructuredData,
      "@type": "Article",
      "headline": seoConfig.title,
      "author": {
        "@type": "Organization",
        "name": COMPANY_INFO.name
      },
      "publisher": {
        "@type": "Organization",
        "name": COMPANY_INFO.name,
        "logo": {
          "@type": "ImageObject",
          "url": `${COMPANY_INFO.url}${COMPANY_INFO.logo}`
        }
      },
      "datePublished": seoConfig.publishDate,
      "dateModified": seoConfig.modifiedDate || seoConfig.publishDate
    };
  }

  return baseStructuredData;
}