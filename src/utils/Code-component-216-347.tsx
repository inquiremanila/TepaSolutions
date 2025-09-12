import { generateKeywords } from '../components/SEOHead';

// Primary trending keywords for tech services in 2024/2025
export const TRENDING_TECH_KEYWORDS = [
  // AI & Machine Learning
  'AI-powered solutions',
  'machine learning development',
  'artificial intelligence consulting',
  'intelligent automation',
  'AI integration services',
  
  // Cloud & SaaS
  'cloud-native development',
  'SaaS platform development',
  'microservices architecture',
  'serverless applications',
  'cloud migration strategy',
  
  // Modern Development
  'React development services',
  'Node.js development',
  'TypeScript development',
  'JAMstack development',
  'headless CMS solutions',
  
  // Digital Transformation
  'digital transformation consulting',
  'business process digitization',
  'legacy system modernization',
  'digital innovation strategy',
  'enterprise digital solutions',
  
  // Automation & Integration
  'robotic process automation',
  'workflow automation tools',
  'API-first development',
  'system integration services',
  'business intelligence solutions',
  
  // Mobile & Web
  'progressive web applications',
  'cross-platform mobile apps',
  'responsive web design',
  'mobile-first development',
  'web app optimization'
];

// Location-based keywords for Philippines market
export const GEO_KEYWORDS = [
  'Philippines tech company',
  'Manila software development',
  'Filipino developers',
  'Philippine IT services',
  'Southeast Asia tech solutions',
  'ASEAN digital services',
  'offshore development Philippines',
  'nearshore development Asia'
];

// Business size targeting keywords
export const BUSINESS_KEYWORDS = [
  'startup development services',
  'SME digital solutions',
  'enterprise software development',
  'Fortune 500 tech partner',
  'scale-up technology solutions',
  'corporate digital transformation'
];

// Industry-specific keywords
export const INDUSTRY_KEYWORDS = [
  'fintech development',
  'healthtech solutions',
  'edtech applications',
  'retail automation',
  'manufacturing digitization',
  'logistics optimization',
  'real estate technology',
  'hospitality management systems'
];

export const SEO_CONFIG = {
  main: {
    title: 'Tepa Solutions - Leading Digital Transformation Agency Philippines | Web & Mobile App Development',
    description: 'Transform your business with Tepa Solutions, the premier digital innovation agency in Philippines. We specialize in AI-powered web applications, mobile app development, business automation, and cloud solutions for startups to Fortune 500 companies worldwide.',
    keywords: generateKeywords([
      'digital transformation agency Philippines',
      'web application development',
      'mobile app development company',
      'business automation solutions',
      'AI-powered solutions',
      'custom software development',
      'cloud migration services',
      'enterprise digital transformation',
      'React development Philippines',
      'Node.js development services',
      'API integration solutions',
      'progressive web applications',
      'cross-platform mobile apps',
      'SaaS development Philippines',
      'startup technology partner',
      'Fortune 500 tech solutions'
    ], [...TRENDING_TECH_KEYWORDS, ...GEO_KEYWORDS]),
    structuredData: {
      "@context": "https://schema.org",
      "@type": "TechCompany",
      "@id": "https://tepasolutions.com/#company",
      "name": "Tepa Solutions",
      "alternateName": "Tepa Solutions Philippines",
      "url": "https://tepasolutions.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tepasolutions.com/logo.png",
        "width": 500,
        "height": 500
      },
      "description": "Leading digital transformation agency in Philippines specializing in AI-powered web applications, mobile app development, business automation, and enterprise software solutions.",
      "foundingDate": "2024",
      "founder": {
        "@type": "Person",
        "name": "Jerrie Mataya",
        "jobTitle": "Founder & CEO"
      },
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "25"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+63-2-8558-1237",
          "contactType": "sales",
          "availableLanguage": ["English", "Filipino"],
          "areaServed": "Worldwide"
        },
        {
          "@type": "ContactPoint",
          "email": "inquire@tepasolutions.asia",
          "contactType": "customer service",
          "availableLanguage": ["English", "Filipino"]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Philippines",
        "addressRegion": "Philippines"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "serviceArea": "Worldwide",
      "knowsAbout": [
        "Web Application Development",
        "Mobile App Development",
        "Business Process Automation",
        "Artificial Intelligence",
        "Cloud Computing",
        "Digital Transformation",
        "API Development",
        "SaaS Solutions"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Solutions Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Web Application Development",
              "description": "Custom web applications using React, Node.js, and cloud technologies"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Mobile App Development",
              "description": "Cross-platform mobile applications for iOS and Android"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Business Automation",
              "description": "AI-powered workflow automation and process optimization"
            }
          }
        ]
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "Free Technology Consultation",
          "description": "Complimentary 30-minute consultation for digital transformation strategy",
          "price": "0",
          "priceCurrency": "USD"
        }
      ]
    }
  },

  services: {
    'app-dev': {
      title: 'Mobile App Development Philippines | iOS & Android Apps | Tepa Solutions',
      description: 'Create powerful mobile applications with Tepa Solutions. Expert iOS & Android app development using React Native, Flutter, and native technologies. From startups to enterprise - we build scalable, user-centric mobile solutions.',
      keywords: generateKeywords([
        'mobile app development Philippines',
        'iOS app development',
        'Android app development',
        'React Native development',
        'Flutter app development',
        'cross-platform mobile apps',
        'native app development',
        'mobile app design',
        'app store optimization',
        'enterprise mobile apps'
      ])
    },

    'web-app': {
      title: 'Web Application Development | Custom SaaS Solutions | React & Node.js | Tepa Solutions',
      description: 'Build scalable web applications with Tepa Solutions. Expert React, Node.js, and cloud-native development. Custom SaaS platforms, progressive web apps, and enterprise solutions for modern businesses.',
      keywords: generateKeywords([
        'web application development',
        'React development services',
        'Node.js development',
        'SaaS platform development',
        'progressive web applications',
        'custom web development',
        'cloud-native applications',
        'TypeScript development',
        'full-stack development',
        'enterprise web solutions'
      ])
    },

    'web-dev': {
      title: 'Website Development Philippines | Responsive Web Design | SEO-Optimized Sites | Tepa Solutions', 
      description: 'Professional website development services in Philippines. Responsive, SEO-optimized websites built with modern technologies. From corporate websites to e-commerce platforms - fast, secure, and mobile-friendly.',
      keywords: generateKeywords([
        'website development Philippines',
        'responsive web design',
        'SEO website development',
        'corporate website design',
        'e-commerce website development',
        'WordPress development',
        'website optimization',
        'mobile-friendly websites',
        'fast loading websites',
        'conversion-focused design'
      ])
    },

    'seo': {
      title: 'SEO Services Philippines | Digital Marketing | Search Engine Optimization | Tepa Solutions',
      description: 'Boost your online visibility with Tepa Solutions SEO services. Comprehensive search engine optimization, local SEO, technical SEO, and digital marketing strategies that deliver measurable results and ROI.',
      keywords: generateKeywords([
        'SEO services Philippines',
        'search engine optimization',
        'local SEO Philippines',
        'technical SEO',
        'SEO consulting',
        'digital marketing Philippines',
        'Google ranking optimization',
        'keyword optimization',
        'content marketing',
        'link building services'
      ])
    },

    'automation-sales': {
      title: 'Sales Automation Solutions | CRM Integration | Lead Management | Tepa Solutions',
      description: 'Automate your sales processes with Tepa Solutions. AI-powered CRM systems, lead scoring, pipeline automation, and sales analytics that increase conversion rates and revenue.',
      keywords: generateKeywords([
        'sales automation solutions',
        'CRM automation',
        'lead management system',
        'sales pipeline automation',
        'AI sales tools',
        'sales process optimization',
        'revenue automation',
        'customer relationship management'
      ])
    },

    'automation-marketing': {
      title: 'Marketing Automation Platform | Email Marketing | Lead Nurturing | Tepa Solutions',
      description: 'Transform your marketing with intelligent automation. Email marketing, lead nurturing, social media automation, and analytics platforms that drive growth and customer engagement.',
      keywords: generateKeywords([
        'marketing automation platform',
        'email marketing automation',
        'lead nurturing system',
        'social media automation',
        'marketing analytics',
        'customer journey automation',
        'digital marketing tools'
      ])
    },

    'automation-support': {
      title: 'Customer Support Automation | AI Chatbots | Help Desk Solutions | Tepa Solutions',
      description: 'Enhance customer experience with automated support systems. AI-powered chatbots, ticket management, knowledge base automation, and 24/7 customer service solutions.',
      keywords: generateKeywords([
        'customer support automation',
        'AI chatbot development',
        'help desk automation',
        'ticket management system',
        'automated customer service',
        'support ticket automation'
      ])
    },

    'automation-hr': {
      title: 'HR Automation Solutions | Employee Management | Recruitment Automation | Tepa Solutions',
      description: 'Streamline HR processes with intelligent automation. Recruitment automation, employee onboarding, performance management, and HR analytics for modern workforce management.',
      keywords: generateKeywords([
        'HR automation solutions',
        'recruitment automation',
        'employee management system',
        'HR process automation',
        'payroll automation',
        'performance management automation'
      ])
    },

    'automation-finance': {
      title: 'Finance Automation Solutions | Accounting Automation | Financial Analytics | Tepa Solutions',
      description: 'Automate financial processes with precision. Invoice automation, expense management, financial reporting, and accounting integration solutions for accurate and efficient finance operations.',
      keywords: generateKeywords([
        'finance automation solutions',
        'accounting automation',
        'invoice automation',
        'expense management automation',
        'financial reporting automation',
        'accounts payable automation'
      ])
    },

    'automation-inventory': {
      title: 'Inventory Management Automation | Supply Chain Solutions | Warehouse Management | Tepa Solutions',
      description: 'Optimize inventory with smart automation. Real-time inventory tracking, automated reordering, supply chain optimization, and warehouse management systems.',
      keywords: generateKeywords([
        'inventory management automation',
        'supply chain automation',
        'warehouse management system',
        'inventory tracking automation',
        'automated reordering system'
      ])
    }
  },

  pages: {
    'about-company': {
      title: 'About Tepa Solutions | Leading Tech Company Philippines | Our Story & Mission',
      description: 'Discover Tepa Solutions story - from startup to leading digital transformation agency in Philippines. Founded by Jerrie Mataya in 2024, we\'re revolutionizing how businesses embrace technology worldwide.',
      keywords: generateKeywords([
        'about Tepa Solutions',
        'Philippines tech company',
        'Jerrie Mataya founder',
        'digital transformation agency',
        'software development company Philippines',
        'tech startup Philippines',
        'innovation company'
      ])
    },

    'careers': {
      title: 'Careers at Tepa Solutions | Tech Jobs Philippines | Software Developer Positions',
      description: 'Join Tepa Solutions team! Exciting career opportunities in software development, AI, cloud computing, and digital innovation. Remote and on-site positions available for passionate tech professionals.',
      keywords: generateKeywords([
        'tech careers Philippines',
        'software developer jobs',
        'remote developer jobs',
        'React developer careers',
        'AI engineer positions',
        'startup careers Philippines',
        'tech jobs Manila'
      ])
    },

    'events': {
      title: 'Tech Events & Workshops | Coding Bootcamps | Webinars | Tepa Solutions',
      description: 'Attend Tepa Solutions tech events and workshops. Learn latest technologies, networking opportunities, and skill development programs. From beginners to advanced developers.',
      keywords: generateKeywords([
        'tech events Philippines',
        'coding workshops',
        'developer meetups',
        'tech conferences Philippines',
        'programming bootcamps',
        'web development training'
      ])
    },

    'articles': {
      title: 'Tech Blog & Insights | Digital Transformation Articles | Development Guides | Tepa Solutions',
      description: 'Stay updated with latest tech trends, development tutorials, and digital transformation insights. Expert articles on web development, mobile apps, AI, and business automation.',
      keywords: generateKeywords([
        'tech blog Philippines',
        'web development tutorials',
        'digital transformation insights',
        'programming guides',
        'technology articles',
        'software development tips'
      ])
    },

    'investors': {
      title: 'Investor Relations | Tepa Solutions Investment Opportunities | Tech Startup Philippines',
      description: 'Explore investment opportunities with Tepa Solutions. Fast-growing tech company in Philippines with proven track record in digital transformation and software development.',
      keywords: generateKeywords([
        'tech startup investment',
        'Philippines startup funding',
        'software company investment',
        'digital transformation investment',
        'tech IPO Philippines',
        'venture capital opportunities'
      ])
    },

    'who-we-serve': {
      title: 'Industries We Serve | Startup to Enterprise Solutions | Global Tech Services | Tepa Solutions',
      description: 'Tepa Solutions serves diverse industries worldwide - from startups to Fortune 500 companies. Fintech, healthcare, education, retail, manufacturing, and more. Tailored solutions for every business size.',
      keywords: generateKeywords([
        'enterprise software solutions',
        'startup technology services',
        'fintech development',
        'healthcare technology',
        'retail automation',
        'manufacturing digitization',
        'Fortune 500 tech partner'
      ])
    }
  },

  contact: {
    sales: {
      title: 'Contact Sales | Get Quote | Business Solutions Consultation | Tepa Solutions',
      description: 'Ready to transform your business? Contact Tepa Solutions sales team for custom quotes, project consultation, and digital transformation planning. Free initial consultation available.',
      keywords: generateKeywords([
        'contact tech company',
        'software development quote',
        'digital transformation consultation',
        'business solution quote',
        'project estimation',
        'technology consulting'
      ])
    },

    support: {
      title: 'Customer Support | Technical Help | Service Assistance | Tepa Solutions',
      description: 'Get expert technical support from Tepa Solutions team. Customer service, technical assistance, project support, and ongoing maintenance for your digital solutions.',
      keywords: generateKeywords([
        'technical support',
        'customer service Philippines',
        'software support',
        'application maintenance',
        'technical assistance'
      ])
    },

    volunteer: {
      title: 'Volunteer Program | Community Tech Education | Coding Workshops | Tepa Solutions',
      description: 'Join Tepa Solutions volunteer program! Help teach coding and digital literacy in underserved communities. Make a difference through technology education and mentorship.',
      keywords: generateKeywords([
        'tech volunteer Philippines',
        'coding education volunteer',
        'digital literacy program',
        'community tech outreach',
        'programming mentorship'
      ])
    },

    'event-host': {
      title: 'Host Tech Event | Speaking Opportunities | Workshop Proposals | Tepa Solutions',
      description: 'Partner with Tepa Solutions to host tech events, workshops, and conferences. Speaking opportunities, venue partnerships, and collaborative educational programs.',
      keywords: generateKeywords([
        'tech event hosting',
        'speaking opportunities Philippines',
        'workshop partnerships',
        'tech conference collaboration',
        'developer events'
      ])
    },

    investor: {
      title: 'Investor Relations Contact | Investment Inquiries | Funding Opportunities | Tepa Solutions',
      description: 'Connect with Tepa Solutions investor relations team. Investment opportunities, funding rounds, partnership inquiries, and financial information for potential investors.',
      keywords: generateKeywords([
        'startup investment contact',
        'tech company funding',
        'investor relations Philippines',
        'venture capital inquiry',
        'investment opportunities'
      ])
    }
  }
};

export const createBreadcrumbs = (path: string[]): Array<{ name: string; url: string }> => {
  const breadcrumbs = [{ name: 'Home', url: 'https://tepasolutions.com' }];
  
  let currentPath = 'https://tepasolutions.com';
  path.forEach(segment => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      name: formatSegmentName(segment),
      url: currentPath
    });
  });
  
  return breadcrumbs;
};

const formatSegmentName = (segment: string): string => {
  const segmentNames: Record<string, string> = {
    'app-dev': 'Mobile App Development',
    'web-app': 'Web Application Development', 
    'web-dev': 'Website Development',
    'seo': 'SEO Services',
    'automation-sales': 'Sales Automation',
    'automation-marketing': 'Marketing Automation',
    'automation-support': 'Support Automation',
    'automation-hr': 'HR Automation',
    'automation-finance': 'Finance Automation',
    'automation-inventory': 'Inventory Automation',
    'about-company': 'About Us',
    'contact-sales': 'Contact Sales',
    'contact-support': 'Customer Support',
    'contact-volunteer': 'Volunteer Program',
    'contact-event-host': 'Host an Event',
    'contact-investor': 'Investor Relations',
    'who-we-serve': 'Who We Serve',
    'articles': 'Articles & Insights',
    'events': 'Events & Workshops',
    'careers': 'Careers',
    'investors': 'Investors'
  };
  
  return segmentNames[segment] || segment.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};