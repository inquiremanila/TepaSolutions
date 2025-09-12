// Static Site Generator for Tepa Solutions - FIXED VERSION
import { writeFileSync, mkdirSync, existsSync, readFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';

// SEO Configuration for each route
interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  canonical: string;
  structuredData?: object;
  priority: string;
  changefreq: string;
}

// Dynamic content data (this would typically come from a CMS or database)
const careersData = [
  {
    id: 'frontend-developer-1',
    title: 'Senior Frontend Developer - React & TypeScript',
    location: 'Remote / Philippines',
    type: 'Full-time',
    department: 'Engineering',
    postedDate: '2024-12-10',
    description: 'Join our growing team as a Senior Frontend Developer specializing in React and TypeScript. Build scalable web applications and mentor junior developers.',
    requirements: ['5+ years React experience', 'TypeScript expertise', 'Remote work experience'],
    salary: 'Competitive + Benefits'
  },
  {
    id: 'backend-developer-1',
    title: 'Backend Developer - Node.js & Cloud',
    location: 'Manila, Philippines',
    type: 'Full-time',
    department: 'Engineering',
    postedDate: '2024-12-08',
    description: 'Build scalable backend systems for our clients using Node.js and cloud technologies.',
    requirements: ['3+ years Node.js', 'AWS/Azure experience', 'Database design'],
  },
  {
    id: 'ui-ux-designer-1',
    title: 'UI/UX Designer - Digital Products',
    location: 'Hybrid - Cebu',
    type: 'Full-time',
    department: 'Design',
    postedDate: '2024-12-05',
    description: 'Design beautiful and functional user experiences for web and mobile applications.',
    requirements: ['Figma expertise', 'User research experience', 'Portfolio required'],
  }
];

const articlesData = [
  {
    id: 'how-ai-is-transforming-workforce-in-2025',
    title: 'How AI is Transforming the Workforce in 2025',
    excerpt: 'Discover the latest trends in AI automation and how businesses are adapting their workforce strategies.',
    content: 'Full article content here...',
    author: 'Jerrie Mataya',
    publishedDate: '2024-12-10',
    category: 'AI & Automation',
    tags: ['AI', 'Workforce', 'Business Transformation', '2025 Trends'],
    readTime: '8 min read',
    featured: true
  },
  {
    id: 'react-performance-optimization-guide',
    title: 'React Performance Optimization: Complete Guide 2025',
    excerpt: 'Learn advanced techniques to optimize React applications for better performance and user experience.',
    content: 'Comprehensive guide content...',
    author: 'Tech Team',
    publishedDate: '2024-12-08',
    category: 'Web Development',
    tags: ['React', 'Performance', 'JavaScript', 'Frontend'],
    readTime: '12 min read',
    featured: false
  },
  {
    id: 'philippines-tech-startup-ecosystem-2025',
    title: 'Philippines Tech Startup Ecosystem: Growth and Opportunities',
    excerpt: 'An analysis of the growing tech startup scene in the Philippines and opportunities for entrepreneurs.',
    content: 'In-depth analysis...',
    author: 'Jerrie Mataya',
    publishedDate: '2024-12-06',
    category: 'Startup Ecosystem',
    tags: ['Philippines', 'Startups', 'Tech Industry', 'Entrepreneurship'],
    readTime: '10 min read',
    featured: true
  }
];

const eventsData = [
  {
    id: 'introduction-to-how-to-make-a-roblox-game',
    title: 'Introduction to How to Make a Roblox Game',
    description: 'Learn the basics of Roblox game development with Lua scripting and Roblox Studio.',
    date: '2025-01-15',
    time: '2:00 PM - 4:00 PM PHT',
    location: 'Online Webinar',
    type: 'Workshop',
    instructor: 'Game Development Team',
    capacity: 100,
    price: 'Free',
    category: 'Game Development',
    tags: ['Roblox', 'Game Development', 'Lua', 'Beginners'],
    featured: true
  },
  {
    id: 'react-masterclass-advanced-patterns',
    title: 'React Masterclass: Advanced Patterns & Best Practices',
    description: 'Deep dive into advanced React patterns, hooks, and performance optimization techniques.',
    date: '2025-01-20',
    time: '10:00 AM - 1:00 PM PHT',
    location: 'Manila Tech Hub',
    type: 'Masterclass',
    instructor: 'Jerrie Mataya',
    capacity: 50,
    category: 'Web Development',
    tags: ['React', 'JavaScript', 'Advanced', 'Web Development'],
    featured: true
  },
  {
    id: 'ai-automation-business-workshop',
    title: 'AI Automation for Business: Practical Implementation',
    description: 'Learn how to implement AI automation solutions in your business processes.',
    date: '2025-01-25',
    time: '1:00 PM - 5:00 PM PHT',
    location: 'Cebu Business District',
    type: 'Workshop',
    instructor: 'AI Solutions Team',
    capacity: 75,
    category: 'Business Automation',
    tags: ['AI', 'Automation', 'Business', 'Implementation'],
    featured: false
  }
];

// Helper function to escape HTML entities for XML
function escapeXml(unsafe: string): string {
  if (typeof unsafe !== 'string') {
    return String(unsafe);
  }
  
  return unsafe
    .replace(/&/g, '&amp;')    // Must be first to avoid double-escaping
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Define all routes with their SEO configurations
const routes: Array<{ path: string; file: string; seo: SEOConfig }> = [
  // Homepage
  {
    path: '/',
    file: 'index.html',
    seo: {
      title: 'Tepa Solutions - Leading Digital Transformation Agency Philippines | Web & Mobile App Development',
      description: 'We specialize in AI-powered web applications, mobile app development, business automation, and cloud solutions for startups to Fortune 500 companies worldwide.',
      keywords: 'Tech company in the Philippines, web application development, mobile app development company, business automation solutions, AI-powered solutions, custom software development, cloud migration services, enterprise digital transformation',
      canonical: 'https://tepasolutions.asia/',
      priority: '1.0',
      changefreq: 'weekly'
    }
  },

  // Main Services
  {
    path: '/business-automation',
    file: 'business-automation/index.html',
    seo: {
      title: 'Business Process Automation Solutions | AI-Powered Workflow Automation | Tepa Solutions',
      description: 'Transform your business with intelligent automation solutions from Tepa Solutions. Sales, marketing, HR, finance, and support automation that increases efficiency and reduces costs.',
      keywords: 'business process automation, workflow automation, AI automation, process optimization, digital transformation, business efficiency, automation solutions Philippines',
      canonical: 'https://tepasolutions.asia/business-automation',
      priority: '0.9',
      changefreq: 'monthly'
    }
  },
  {
    path: '/mobile-app-development',
    file: 'mobile-app-development/index.html',
    seo: {
      title: 'Mobile App Development Philippines | iOS & Android Apps | Tepa Solutions',
      description: 'Create powerful mobile applications with Tepa Solutions. Expert iOS & Android app development using React Native, Flutter, and native technologies. From startups to enterprise - we build scalable, user-centric mobile solutions.',
      keywords: 'mobile app development Philippines, iOS app development, Android app development, React Native development, Flutter app development, cross-platform mobile apps, native app development, mobile app make philippines',
      canonical: 'https://tepasolutions.asia/mobile-app-development',
      priority: '0.9',
      changefreq: 'monthly'
    }
  },
  {
    path: '/web-application-development',
    file: 'web-application-development/index.html',
    seo: {
      title: 'Web Application Development | Custom SaaS Solutions | React & Node.js | Tepa Solutions',
      description: 'Build scalable web applications with Tepa Solutions. Expert React, Node.js, and cloud-native development. Custom SaaS platforms, progressive web apps, and enterprise solutions for modern businesses.',
      keywords: 'web application development, React development services, Node.js development, SaaS platform development, progressive web applications, custom web development, cloud-native applications',
      canonical: 'https://tepasolutions.asia/web-application-development',
      priority: '0.9',
      changefreq: 'monthly'
    }
  },
  {
    path: '/website-development',
    file: 'website-development/index.html',
    seo: {
      title: 'Website Development Philippines | Responsive Web Design | SEO-Optimized Sites | Tepa Solutions',
      description: 'Professional website development services in Philippines. Responsive, SEO-optimized websites built with modern technologies. From corporate websites to e-commerce platforms - fast, secure, and mobile-friendly.',
      keywords: 'website development Philippines, responsive web design, SEO website development, corporate website design, e-commerce website development, WordPress development, website optimization',
      canonical: 'https://tepasolutions.asia/website-development',
      priority: '0.9',
      changefreq: 'monthly'
    }
  },
  {
    path: '/seo-services',
    file: 'seo-services/index.html',
    seo: {
      title: 'SEO Services Philippines | Digital Marketing | Search Engine Optimization | Tepa Solutions',
      description: 'Boost your online visibility with Tepa Solutions SEO services. Comprehensive search engine optimization, local SEO, technical SEO, and digital marketing strategies that deliver measurable results and ROI.',
      keywords: 'SEO services Philippines, search engine optimization, local SEO Philippines, technical SEO, SEO consulting, digital marketing Philippines, Google ranking optimization',
      canonical: 'https://tepasolutions.asia/seo-services',
      priority: '0.8',
      changefreq: 'monthly'
    }
  },

  // Automation Sub-services
  {
    path: '/business-automation/sales-process-automation',
    file: 'business-automation/sales-process-automation/index.html',
    seo: {
      title: 'Sales Automation Solutions | CRM Integration | Lead Management | Tepa Solutions',
      description: 'Automate your sales processes with Tepa Solutions. AI-powered CRM systems, lead scoring, pipeline automation, and sales analytics that increase conversion rates and revenue.',
      keywords: 'sales automation solutions, CRM automation, lead management system, sales pipeline automation, AI sales tools, sales process optimization, revenue automation',
      canonical: 'https://tepasolutions.asia/business-automation/sales-process-automation',
      priority: '0.8',
      changefreq: 'monthly'
    }
  },
  {
    path: '/business-automation/marketing-automation',
    file: 'business-automation/marketing-automation/index.html',
    seo: {
      title: 'Marketing Automation Platform | Email Marketing | Lead Nurturing | Tepa Solutions',
      description: 'Transform your marketing with intelligent automation. Email marketing, lead nurturing, social media automation, and analytics platforms that drive growth and customer engagement.',
      keywords: 'marketing automation platform, email marketing automation, lead nurturing system, social media automation, marketing analytics, customer journey automation',
      canonical: 'https://tepasolutions.asia/business-automation/marketing-automation',
      priority: '0.8',
      changefreq: 'monthly'
    }
  },
  {
    path: '/business-automation/customer-support-automation',
    file: 'business-automation/customer-support-automation/index.html',
    seo: {
      title: 'Customer Support Automation | AI Chatbots | Help Desk Solutions | Tepa Solutions',
      description: 'Enhance customer experience with automated support systems. AI-powered chatbots, ticket management, knowledge base automation, and 24/7 customer service solutions.',
      keywords: 'customer support automation, AI chatbot development, help desk automation, ticket management system, automated customer service, support ticket automation',
      canonical: 'https://tepasolutions.asia/business-automation/customer-support-automation',
      priority: '0.8',
      changefreq: 'monthly'
    }
  },
  {
    path: '/business-automation/hr-automation',
    file: 'business-automation/hr-automation/index.html',
    seo: {
      title: 'HR Automation Solutions | Employee Management | Recruitment Automation | Tepa Solutions',
      description: 'Streamline HR processes with intelligent automation. Recruitment automation, employee onboarding, performance management, and HR analytics for modern workforce management.',
      keywords: 'HR automation solutions, recruitment automation, employee management system, HR process automation, payroll automation, performance management automation',
      canonical: 'https://tepasolutions.asia/business-automation/hr-automation',
      priority: '0.8',
      changefreq: 'monthly'
    }
  },
  {
    path: '/business-automation/finance-automation',
    file: 'business-automation/finance-automation/index.html',
    seo: {
      title: 'Finance Automation Solutions | Accounting Automation | Financial Analytics | Tepa Solutions',
      description: 'Automate financial processes with precision. Invoice automation, expense management, financial reporting, and accounting integration solutions for accurate and efficient finance operations.',
      keywords: 'finance automation solutions, accounting automation, invoice automation, expense management automation, financial reporting automation, accounts payable automation',
      canonical: 'https://tepasolutions.asia/business-automation/finance-automation',
      priority: '0.8',
      changefreq: 'monthly'
    }
  },
  {
    path: '/business-automation/inventory-management-automation',
    file: 'business-automation/inventory-management-automation/index.html',
    seo: {
      title: 'Inventory Management Automation | Supply Chain Solutions | Warehouse Management | Tepa Solutions',
      description: 'Optimize inventory with smart automation. Real-time inventory tracking, automated reordering, supply chain optimization, and warehouse management systems.',
      keywords: 'inventory management automation, supply chain automation, warehouse management system, inventory tracking automation, automated reordering system',
      canonical: 'https://tepasolutions.asia/business-automation/inventory-management-automation',
      priority: '0.7',
      changefreq: 'monthly'
    }
  },

  // Company Pages
  {
    path: '/learn-about-tepa',
    file: 'learn-about-tepa/index.html',
    seo: {
      title: 'About Tepa Solutions | Leading Tech Company Philippines | Our Story & Mission',
      description: 'Discover Tepa Solutions story - from startup to leading digital transformation agency in Philippines. Founded by Jerrie Mataya in 2024, we\'re revolutionizing how businesses embrace technology worldwide.',
      keywords: 'about Tepa Solutions, Philippines tech company, Jerrie Mataya founder, digital transformation agency, software development company Philippines, tech startup Philippines',
      canonical: 'https://tepasolutions.asia/learn-about-tepa',
      priority: '0.8',
      changefreq: 'monthly'
    }
  },
  {
    path: '/careers',
    file: 'careers/index.html',
    seo: {
      title: 'Careers at Tepa Solutions | Tech Jobs Philippines | Software Developer Positions',
      description: 'Join Tepa Solutions team! Exciting career opportunities in software development, AI, cloud computing, and digital innovation. Remote and on-site positions available for passionate tech professionals.',
      keywords: 'tech careers Philippines, software developer jobs, remote developer jobs, React developer careers, AI engineer positions, startup careers Philippines',
      canonical: 'https://tepasolutions.asia/careers',
      priority: '0.8',
      changefreq: 'weekly'
    }
  },
  {
    path: '/events',
    file: 'events/index.html',
    seo: {
      title: 'Tech Events & Workshops | Coding Bootcamps | Webinars | Tepa Solutions',
      description: 'Attend Tepa Solutions tech events and workshops. Learn latest technologies, networking opportunities, and skill development programs. From beginners to advanced developers.',
      keywords: 'tech events Philippines, coding workshops, developer meetups, tech conferences Philippines, programming bootcamps, web development training',
      canonical: 'https://tepasolutions.asia/events',
      priority: '0.7',
      changefreq: 'weekly'
    }
  },
  {
    path: '/articles',
    file: 'articles/index.html',
    seo: {
      title: 'Tech Blog & Insights | Digital Transformation Articles | Development Guides | Tepa Solutions',
      description: 'Stay updated with latest tech trends, development tutorials, and digital transformation insights. Expert articles on web development, mobile apps, AI, and business automation.',
      keywords: 'tech blog Philippines, web development tutorials, digital transformation insights, programming guides, technology articles, software development tips',
      canonical: 'https://tepasolutions.asia/articles',
      priority: '0.7',
      changefreq: 'daily'
    }
  },
  {
    path: '/investors',
    file: 'investors/index.html',
    seo: {
      title: 'Investor Relations | Tepa Solutions Investment Opportunities | Tech Startup Philippines',
      description: 'Explore investment opportunities with Tepa Solutions. Fast-growing tech company in Philippines with proven track record in digital transformation and software development.',
      keywords: 'tech startup investment, Philippines startup funding, software company investment, digital transformation investment, tech IPO Philippines, venture capital opportunities',
      canonical: 'https://tepasolutions.asia/investors',
      priority: '0.7',
      changefreq: 'monthly'
    }
  },
  {
    path: '/who-we-serve',
    file: 'who-we-serve/index.html',
    seo: {
      title: 'Industries We Serve | Startup to Enterprise Solutions | Global Tech Services | Tepa Solutions',
      description: 'Tepa Solutions serves diverse industries worldwide - Fintech, healthcare, education, retail, manufacturing, and more. Tailored solutions for every business size.',
      keywords: 'enterprise software solutions, startup technology services, fintech development, healthcare technology, retail automation, manufacturing digitization, Fortune 500 tech partner',
      canonical: 'https://tepasolutions.asia/who-we-serve',
      priority: '0.7',
      changefreq: 'monthly'
    }
  },

  // Contact Pages
  {
    path: '/contact-us/sales',
    file: 'contact-us/sales/index.html',
    seo: {
      title: 'Contact Sales | Get Quote | Business Solutions Consultation | Tepa Solutions',
      description: 'From business websites to Automation. Contact Tepa Solutions sales team for custom quotes, project consultation, and digital transformation planning. Free initial consultation available.',
      keywords: 'contact tech company, affordable workforce philippines, customer service philippines, cheap website, website funneling,software development quote, mobile app maker, website maker philippines, workflow automation, customer service ai, delivery app, business solution quote, project estimation, technology consulting',
      canonical: 'https://tepasolutions.asia/contact-us/sales',
      priority: '0.8',
      changefreq: 'monthly'
    }
  },
  {
    path: '/contact-us/support',
    file: 'contact-us/support/index.html',
    seo: {
      title: 'Customer Support | Technical Help | Service Assistance | Tepa Solutions',
      description: 'Get expert technical support from Tepa Solutions team. Customer service, technical assistance, project support, and ongoing maintenance for your digital solutions.',
      keywords: 'technical support philippines, affordable customer service, contractual customer support philippines, AI customer service, customer service Philippines, software support philippines, application maintenance, technical assistance',
      canonical: 'https://tepasolutions.asia/contact-us/support',
      priority: '0.7',
      changefreq: 'monthly'
    }
  },
  {
    path: '/contact-us/volunteer',
    file: 'contact-us/volunteer/index.html',
    seo: {
      title: 'Volunteer Program | Community Tech Education | Coding Workshops | Tepa Solutions',
      description: 'Join Tepa Solutions volunteer program! Help teach coding and digital literacy in underserved communities. Make a difference through technology education and mentorship.',
      keywords: 'tech volunteer Philippines, coding education volunteer, digital literacy program, community tech outreach, programming mentorship',
      canonical: 'https://tepasolutions.asia/contact-us/volunteer',
      priority: '0.6',
      changefreq: 'monthly'
    }
  },
  {
    path: '/contact-us/event-hosting',
    file: 'contact-us/event-hosting/index.html',
    seo: {
      title: 'Host Tech Event | Speaking Opportunities | Workshop Proposals | Tepa Solutions',
      description: 'Partner with Tepa Solutions to host tech events, workshops, and conferences. Speaking opportunities, venue partnerships, and collaborative educational programs.',
      keywords: 'tech event hosting, Public Speaking opportunities Philippines, workshop partnerships, tech conference collaboration, developer events, educational programs, host an event, Public Speaking workhop, Free coding bootcamp, Free game development workshop, Website funneling workshop',
      canonical: 'https://tepasolutions.asia/contact-us/event-hosting',
      priority: '0.6',
      changefreq: 'monthly'
    }
  },
  {
    path: '/contact-us/investors',
    file: 'contact-us/investors/index.html',
    seo: {
      title: 'Investor Relations Contact | Investment Inquiries | Funding Opportunities | Tepa Solutions',
      description: 'Explore investment opportunities, funding rounds, partnership inquiries, and financial information.Connect with Tepa Solutions investor relations team.',
      keywords: 'startup investment contact, tech company funding, investor relations Philippines, venture capital inquiry, investment opportunities, invest in Philippines, small investment',
      canonical: 'https://tepasolutions.asia/contact-us/investors',
      priority: '0.6',
      changefreq: 'monthly'
    }
  }
];

// Generate dynamic routes for careers, articles, and events
function generateDynamicRoutes(): Array<{ path: string; file: string; seo: SEOConfig }> {
  const dynamicRoutes: Array<{ path: string; file: string; seo: SEOConfig }> = [];

  // Career pages
  careersData.forEach(career => {
    dynamicRoutes.push({
      path: `/careers/${career.id}`,
      file: `careers/${career.id}/index.html`,
      seo: {
        title: `${career.title} | Careers at Tepa Solutions`,
        description: `Join our team as ${career.title}. ${career.description.substring(0, 150)}... Apply now for this ${career.type} position in ${career.location}.`,
        keywords: `${career.title}, ${career.department} jobs Philippines, ${career.location} jobs, ${career.type} developer position, tech careers Philippines`,
        canonical: `https://tepasolutions.asia/careers/${career.id}`,
        priority: '0.7',
        changefreq: 'weekly',
        structuredData: {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": career.title,
          "description": career.description,
          "datePosted": career.postedDate,
          "employmentType": career.type.toUpperCase(),
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Tepa Solutions",
            "sameAs": "https://tepasolutions.asia",
            "logo": "https://tepasolutions.asia/images/tepa.png"
          },
          "jobLocation": {
            "@type": "Place",
            "address": career.location
          },
          "baseSalary": career.salary
        }
      }
    });
  });

  // Article pages
  articlesData.forEach(article => {
    dynamicRoutes.push({
      path: `/articles/${article.id}`,
      file: `articles/${article.id}/index.html`,
      seo: {
        title: `${article.title} | Tepa Solutions Tech Blog`,
        description: article.excerpt,
        keywords: `${article.tags.join(', ')}, tech blog Philippines, ${article.category}`,
        canonical: `https://tepasolutions.asia/articles/${article.id}`,
        priority: '0.7',
        changefreq: 'monthly',
        structuredData: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": article.title,
          "description": article.excerpt,
          "author": {
            "@type": "Person",
            "name": article.author
          },
          "datePublished": article.publishedDate,
          "publisher": {
            "@type": "Organization",
            "name": "Tepa Solutions",
            "logo": "https://tepasolutions.asia/images/tepa.png"
          },
          "mainEntityOfPage": `https://tepasolutions.asia/articles/${article.id}`,
          "image": `https://tepasolutions.asia/images/articles/${article.id}-og.jpg`
        }
      }
    });
  });

// Event pages
eventsData.forEach(event => {
  // Handle potential undefined price
  const priceInfo = event.price ? {
    "@type": "Offer",
    "price": event.price === 'Free' ? '0' : event.price.replace('₱', ''),
    "priceCurrency": "PHP"
  } : undefined;

  dynamicRoutes.push({
    path: `/events/${event.id}`,
    file: `events/${event.id}/index.html`,
    seo: {
      title: `${event.title} | Tepa Solutions Workshop`,
      description: `${event.description} Join us on ${event.date} at ${event.time}. ${event.location}. ${event.price || 'Free'}.`,
      keywords: `${event.tags.join(', ')}, tech events Philippines, ${event.category}, ${event.type}`,
      canonical: `https://tepasolutions.asia/events/${event.id}`,
      priority: '0.7',
      changefreq: 'weekly',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": event.title,
        "description": event.description,
        "startDate": `${event.date}T${event.time.split(' - ')[0]}`,
        "endDate": `${event.date}T${event.time.split(' - ')[1]}`,
        "location": {
          "@type": "Place",
          "name": event.location
        },
        "organizer": {
          "@type": "Organization",
          "name": "Tepa Solutions",
          "url": "https://tepasolutions.asia"
        },
        // Only include offers if priceInfo exists
        ...(priceInfo && { offers: priceInfo })
      }
    }
  });
});

  return dynamicRoutes;
}

function generateHTMLTemplate(route: { path: string; file: string; seo: SEOConfig }): string {
  const structuredDataScript = route.seo.structuredData 
    ? `<script type="application/ld+json">${JSON.stringify(route.seo.structuredData, null, 2)}</script>`
    : '';

  // Escape HTML entities in meta content - but NOT for HTML attributes in script tags
  const title = escapeXml(route.seo.title);
  const description = escapeXml(route.seo.description);
  const keywords = escapeXml(route.seo.keywords);
  const canonicalUrl = escapeXml(route.seo.canonical);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="keywords" content="${keywords}" />
  <meta name="author" content="Tepa Solutions" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${canonicalUrl}" />
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:site_name" content="Tepa Solutions" />
  <meta property="og:image" content="https://tepasolutions.asia/images/og-tepa-solutions.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="en_US" />
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="https://tepasolutions.asia/images/og-tepa-solutions.jpg" />
  <meta name="twitter:site" content="@tepasolutions" />
  <meta name="twitter:creator" content="@jerriemataya" />
  
  <!-- Geographic Meta Tags -->
  <meta name="geo.region" content="PH" />
  <meta name="geo.country" content="Philippines" />
  <meta name="geo.placename" content="Philippines" />
  
  <!-- Language and Locale -->
  <meta http-equiv="content-language" content="en" />
  <meta name="language" content="English" />
  
  <!-- Favicons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/images/android-chrome-192x192.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="/images/android-chrome-512x512.png" />
  
  <!-- PWA Manifest -->
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#030213" />
  
  <!-- Apple PWA Meta Tags -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Tepa Solutions" />
  
  <!-- Microsoft PWA Meta Tags -->
  <meta name="msapplication-TileColor" content="#030213" />
  <meta name="msapplication-config" content="/browserconfig.xml" />
  
  <!-- Preconnect to External Domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://www.google-analytics.com" />
  
  <!-- DNS Prefetch -->
  <link rel="dns-prefetch" href="//tepasolutions.asia" />
  <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  <link rel="dns-prefetch" href="//www.google-analytics.com" />
  
  <!-- Structured Data -->
  ${structuredDataScript}
  
  <!-- Organization Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tepa Solutions",
    "url": "https://tepasolutions.asia",
    "logo": "https://tepasolutions.asia/images/tepa.png",
    "description": "Website, Mobile App, and Business Automation Developer in the Philippines",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PH",
      "addressRegion": "Philippines"
    },
    "founder": {
      "@type": "Person",
      "name": "Jerrie Mataya"
    },
    "foundingDate": "2024",
    "sameAs": [
      "https://linkedin.com/company/tepa-solutions",
      "https://github.com/tepasolutions",
      "https://twitter.com/tepasolutions"
    ]
  }
  </script>
  
  <!-- Initial Route for React -->
  <script>
    window.__INITIAL_ROUTE__ = '${route.path.replace(/'/g, "\\'")}';
  </script>
  
  <!-- Critical CSS -->
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', system-ui, sans-serif;
      line-height: 1.6;
      background-color: #ffffff;
      color: #1a1a1a;
    }
    
    .loading-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f3f4f6;
      border-top: 3px solid #030213;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .app-loaded .loading-container {
      display: none;
    }
    
    /* Skip to content for accessibility */
    .skip-to-content {
      position: absolute;
      top: -40px;
      left: 6px;
      background: #030213;
      color: white;
      padding: 8px;
      text-decoration: none;
      transition: top 0.3s;
      z-index: 10000;
    }
    
    .skip-to-content:focus {
      top: 6px;
    }
  </style>
</head>
<body>
  <!-- Skip to content link for accessibility -->
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
  
  <div id="root">
    <!-- Loading state -->
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  </div>
  
  <!-- React App Entry Point -->
  <script type="module" src="/src/main.tsx"></script>
  
  <!-- Service Worker Registration -->
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  </script>
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: '${title.replace(/'/g, "\\'")}',
      page_location: '${canonicalUrl}'
    });
  </script>
</body>
</html>`;
}


// Debug function to validate XML before writing
function validateXMLContent(content: string, filename: string): boolean {
  try {
    // Basic validation - check for unescaped entities
    const problematicChars = content.match(/&(?!(amp|lt|gt|quot|apos);)/g);
    if (problematicChars) {
      console.error(`❌ XML Validation Error in ${filename}:`);
      console.error(`Found unescaped ampersands: ${problematicChars.join(', ')}`);
      return false;
    }
    
    // Check for other common XML issues
    if (content.includes('<>') || content.includes('><')) {
      console.warn(`⚠️  Potential XML structure issue in ${filename}`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ XML Validation Error in ${filename}:`, error);
    return false;
  }
}

// Generate sitemap.xml - FIXED VERSION with proper XML escaping
function generateSitemap(allRoutes: Array<{ path: string; file: string; seo: SEOConfig }>): string {
  const baseUrl = 'https://tepasolutions.asia';
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  const urlEntries = allRoutes.map(route => {
    // Ensure proper URL construction and escaping
    const fullUrl = route.path === '/' ? baseUrl : `${baseUrl}${route.path}`;
    const loc = escapeXml(fullUrl);
    
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${escapeXml(route.seo.changefreq)}</changefreq>
    <priority>${escapeXml(route.seo.priority)}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Generate robots.txt
function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Main pages
Allow: /
Allow: /business-automation/
Allow: /mobile-app-development/
Allow: /web-application-development/
Allow: /website-development/
Allow: /seo-services/
Allow: /learn-about-tepa/
Allow: /careers/
Allow: /events/
Allow: /articles/
Allow: /investors/
Allow: /who-we-serve/
Allow: /contact-us/

# Block admin and temporary files
Disallow: /admin/
Disallow: /temp/
Disallow: *.tmp$
Disallow: /private/
Disallow: /api/
Disallow: /src/
Disallow: /components/
Disallow: /utils/

# Allow important resources
Allow: /images/
Allow: /assets/
Allow: /*.css$
Allow: /*.js$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.gif$
Allow: /*.svg$
Allow: /*.webp$
Allow: /*.ico$
Allow: /manifest.json
Allow: /browserconfig.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Sitemap location
Sitemap: https://tepasolutions.asia/sitemap.xml

# Special bot instructions
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: facebookexternalhit
Allow: /`;
}

// Generate additional SEO files
function generateAdditionalSEOFiles(): void {
  // Generate manifest.json for PWA
  const manifest = {
    name: "Tepa Solutions",
    short_name: "Tepa",
    description: "Website, Mobile App, and Business Automation Developer in the Philippines",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#030213",
    icons: [
      {
        src: "/images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/images/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  
  writeFileSync('manifest.json', JSON.stringify(manifest, null, 2), 'utf8');
  console.log('✅ Generated: manifest.json');

  // Generate browserconfig.xml for Microsoft
  const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/images/mstile-150x150.png"/>
      <TileColor>#030213</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
  
  writeFileSync('browserconfig.xml', browserConfig, 'utf8');
  console.log('✅ Generated: browserconfig.xml');

  // Generate security.txt
  const securityTxt = `Contact: security@tepasolutions.asia
Expires: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()}
Encryption: https://tepasolutions.asia/.well-known/pgp-key.txt
Preferred-Languages: en, tl
Canonical: https://tepasolutions.asia/.well-known/security.txt
Policy: https://tepasolutions.asia/security-policy`;

  // Create .well-known directory
  if (!existsSync('.well-known')) {
    mkdirSync('.well-known', { recursive: true });
  }
  
  writeFileSync('.well-known/security.txt', securityTxt, 'utf8');
  console.log('✅ Generated: .well-known/security.txt');
}

// Main build function
export function buildStaticSite(): void {
  console.log('🚀 Building static site with SEO optimization...');
  
  // Combine static and dynamic routes
  const dynamicRoutes = generateDynamicRoutes();
  const allRoutes = [...routes, ...dynamicRoutes];
  
  console.log(`📄 Generating ${allRoutes.length} HTML pages...`);
  
  // Generate HTML files
  allRoutes.forEach(route => {
    const htmlContent = generateHTMLTemplate(route);
    const filePath = route.file;
    const fileDir = dirname(filePath);
    
    // Create directory if it doesn't exist
    if (fileDir !== '.' && !existsSync(fileDir)) {
      mkdirSync(fileDir, { recursive: true });
    }
    
    // Write HTML file
    writeFileSync(filePath, htmlContent, 'utf8');
    console.log(`✅ Generated: ${route.file} (${route.seo.priority} priority)`);
  });
  
  // Generate sitemap.xml
  const sitemapContent = generateSitemap(allRoutes);
  writeFileSync('sitemap.xml', sitemapContent, 'utf8');
  console.log('✅ Generated: sitemap.xml');
  
  // Generate robots.txt
  const robotsContent = generateRobotsTxt();
  writeFileSync('robots.txt', robotsContent, 'utf8');
  console.log('✅ Generated: robots.txt');
  
  // Generate additional SEO files
  generateAdditionalSEOFiles();
  
  console.log('\n🎉 Static site generation complete!');
  console.log(`📊 SEO Summary:`);
  console.log(`   • ${allRoutes.length} crawlable pages`);
  console.log(`   • ${allRoutes.filter(r => r.seo.structuredData).length} pages with structured data`);
  console.log(`   • Individual SEO optimization for each page`);
  console.log(`   • Proper XML sitemap with valid URLs`);
  console.log(`   • PWA manifest and browser config`);
  console.log(`   • Security.txt for responsible disclosure`);
  console.log('\n📝 Next steps:');
  console.log('   1. Run "npm run build" to build the React app');
  console.log('   2. Deploy to Cloudflare Pages');
  console.log('   3. Verify sitemap in Google Search Console');
  console.log('   4. Test robots.txt at /robots.txt');
}

// Export data for use in components
export { careersData, articlesData, eventsData };

// Run if called directly
if (require.main === module) {
  buildStaticSite();
}