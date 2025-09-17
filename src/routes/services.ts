// routes/services.ts
import { RouteConfig } from '../routes/routes';

export const serviceRoutes: RouteConfig[] = [
  {
    path: '/',
    file: 'index.html',
    title: 'Tepa Solutions | Web, Mobile App & Automation Provider in the Philippines',
    description: 'Web, mobile, and automation solutions in the Philippines. Trusted by businesses to build apps, websites, and digital growth tools.',
    keywords: [
      'software company Philippines',
      'web development Manila',
      'mobile app development Philippines',
      'business automation',
      'IT solutions Philippines'
      
    ],
    changeFreq: 'weekly',
    priority: '1.0',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Tepa Solutions",
      "url": "https://tepasolutions.asia",
      "logo": "https://tepasolutions.asia/tepa.png",
      "description": "Web, mobile, and automation solutions provider in the Philippines.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Philippines",
        "addressRegion": "Metro Manila"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+63-XXX-XXX-XXXX",
        "contactType": "customer service"
      },
      "areaServed": "Philippines"
    }
  },
  {
    path: '/business-automation',
    file: 'business-automation.html',
    title: 'Business Automation Philippines | Tepa Solutions',
    description: 'Cut costs and save time with automation services in the Philippines. Streamline workflows and scale your business faster.',
    keywords: [
      'business automation Philippines',
      'workflow automation',
      'process automation Manila',
      'automation services',
      'business efficiency'
    ],
    changeFreq: 'monthly',
    priority: '0.9',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Business Process Automation",
      "provider": { "@type": "Organization", "name": "Tepa Solutions" },
      "description": "Automation services to streamline operations and boost efficiency.",
      "areaServed": "Philippines"
    }
  },
  {
    path: '/mobile-app-development',
    file: 'mobile-app-development.html',
    title: 'Mobile App Development Philippines | iOS & Android',
    description: 'Custom iOS and Android app development in the Philippines. Build mobile apps that engage users and grow your business.',
    keywords: [
      'mobile app development Philippines',
      'iOS app development',
      'Android app development',
      'app developer Manila',
      'custom apps'
    ],
    changeFreq: 'monthly',
    priority: '0.9',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Mobile App Development",
      "provider": { "@type": "Organization", "name": "Tepa Solutions" },
      "description": "Custom mobile app development for iOS and Android.",
      "areaServed": "Philippines"
    }
  },
  {
    path: '/web-application-development',
    file: 'web-application-development.html',
    title: 'Web App Development Philippines | Custom Solutions',
    description: 'Build secure, scalable web applications in the Philippines. Tailored solutions for startups and enterprises.',
    keywords: [
      'web app development Philippines',
      'custom web apps',
      'web application Manila',
      'enterprise apps',
      'scalable web solutions'
    ],
    changeFreq: 'monthly',
    priority: '0.9',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Application Development",
      "provider": { "@type": "Organization", "name": "Tepa Solutions" },
      "description": "Custom and scalable web application development services.",
      "areaServed": "Philippines"
    }
  },
  {
    path: '/website-development',
    file: 'website-development.html',
    title: 'Website Development Philippines | Web Design Manila',
    description: 'Professional website design and development in the Philippines. Responsive, modern sites that convert visitors into customers.',
    keywords: [
      'website development Philippines',
      'web design Manila',
      'responsive websites',
      'business website',
      'custom website design'
    ],
    changeFreq: 'monthly',
    priority: '0.8',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Website Development",
      "provider": { "@type": "Organization", "name": "Tepa Solutions" },
      "description": "Professional website design and development services.",
      "areaServed": "Philippines"
    }
  },
  {
    path: '/seo-services',
    file: 'seo-services.html',
    title: 'SEO Services Philippines | Improve Google Rankings',
    description: 'Boost search rankings and get more traffic with SEO services in the Philippines. Proven strategies to grow your business online.',
    keywords: [
      'SEO services Philippines',
      'SEO Manila',
      'search engine optimization Philippines',
      'SEO expert Philippines',
      'digital marketing services'
    ],
    changeFreq: 'monthly',
    priority: '0.8',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "SEO Services",
      "provider": { "@type": "Organization", "name": "Tepa Solutions" },
      "description": "SEO services to improve Google rankings and online visibility.",
      "areaServed": "Philippines"
    }
  }
];
