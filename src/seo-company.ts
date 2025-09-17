// SEO data for company pages and services
import type { SEOData } from './seo-generator'

// Company pages SEO data
export const companySeoData: Record<string, Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'>> = {
  '/': {
    title: 'Tepa Solutions | Web, Mobile App & Automation Provider in the Philippines',
    description: 'Web, mobile, and automation solutions in the Philippines. Trusted by businesses to build apps, websites, and digital growth tools.',
    keywords: ['digital solutions Philippines', 'business automation', 'web development', 'mobile app development', 'SEO services', 'digital transformation','software company Philippines', 'IT solutions Philippines'],
    ogTitle: 'Tepa Solutions - Your Digital Innovation Partner',
    ogDescription: 'Web, mobile, and automation solutions in the Philippines. Trusted by businesses to build apps, websites, and digital growth tools.',
    twitterTitle: 'Tepa Solutions - Digital Innovation Philippines',
    twitterDescription: 'Leading provider of web development, mobile apps, and business automation in the Philippines.',
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Tepa Solutions',
      'url': 'https://tepasolutions.asia',
      'logo': 'https://tepasolutions.asia/tepa.png',
      'description': 'Leading digital Provider in the Philippines',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'PH',
        'addressRegion': 'Metro Manila'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+63-XXX-XXX-XXXX',
        'contactType': 'customer service'
      },
      'sameAs': [
        'https://facebook.com/tepasolutions',
        'https://linkedin.com/company/tepasolutions'
      ]
    }
  },

  '/learn-about-tepa': {
    title: 'About Tepa Solutions - Digital Innovation Leaders Philippines',
    description: 'Learn about Tepa Solutions, a leading digital transformation company in the Philippines. Our mission, vision, team, and commitment to innovation.',
    keywords: ['about tepa solutions', 'company profile', 'digital transformation Philippines', 'tech company', 'innovation'],
    ogTitle: 'About Tepa Solutions - Our Story & Mission',
    ogDescription: 'Discover how Tepa Solutions is transforming businesses across the Philippines with innovative digital solutions.',
    twitterTitle: 'About Tepa Solutions - Innovation Leaders',
    twitterDescription: 'Meet the team behind Philippines\' leading digital transformation company.',
    robots: 'index, follow'
  },

  '/careers': {
    title: 'Careers at Tepa Solutions - Join Our Digital Innovation Team',
    description: 'Join Tepa Solutions and shape the future of digital transformation in the Philippines. Exciting career opportunities for developers, designers, and innovators.',
    keywords: ['tepa solutions jobs', 'tech careers Philippines', 'software developer jobs', 'digital marketing careers', 'remote work Philippines'],
    ogTitle: 'Work at Tepa Solutions - Build the Future',
    ogDescription: 'Exciting career opportunities at Philippines\' leading digital transformation company.',
    twitterTitle: 'Tepa Solutions Careers - Join Us',
    twitterDescription: 'Shape the future of technology in the Philippines. Join our innovative team.',
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      'hiringOrganization': {
        '@type': 'Organization',
        'name': 'Tepa Solutions',
        'sameAs': 'https://tepasolutions.asia'
      },
      'jobLocation': {
        '@type': 'Place',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'PH'
        }
      }
    }
  },

  '/who-we-serve': {
    title: 'Industries We Serve - Tepa Solutions Digital Transformation',
    description: 'Tepa Solutions serves diverse industries across the Philippines. From startups to enterprises, we deliver tailored digital solutions for every business.',
    keywords: ['industries served', 'business sectors Philippines', 'enterprise solutions', 'startup solutions', 'SME digital transformation'],
    ogTitle: 'Who We Serve - Tepa Solutions',
    ogDescription: 'Discover the industries and businesses we help transform through digital innovation.',
    robots: 'index, follow'
  },

  '/investors': {
    title: 'Investors - Tepa Solutions Growth & Investment Opportunities',
    description: 'Investment opportunities with Tepa Solutions. Join us in transforming the digital landscape of the Philippines and Southeast Asia.',
    keywords: ['tepa solutions investment', 'startup investment Philippines', 'tech investment', 'digital transformation investment'],
    ogTitle: 'Invest in Tepa Solutions - Digital Future',
    ogDescription: 'Investment opportunities in Philippines\' leading digital transformation company.',
    robots: 'index, follow'
  },

  '/volunteer-with-us': {
    title: 'Volunteer with Tepa Solutions - Digital Skills for Communities',
    description: 'Volunteer with Tepa Solutions and help bridge the digital divide in the Philippines. Share your skills and make a meaningful impact.',
    keywords: ['volunteer Philippines', 'digital skills volunteer', 'community service tech', 'social impact technology'],
    ogTitle: 'Volunteer with Tepa Solutions',
    ogDescription: 'Make a difference by sharing your digital skills with communities across the Philippines.',
    robots: 'index, follow'
  },

  '/events': {
    title: 'Tech Events - Tepa Solutions Workshops & Seminars Philippines',
    description: 'Join Tepa Solutions tech events, workshops, and seminars. Learn cutting-edge digital skills and network with industry professionals.',
    keywords: ['tech events Philippines', 'digital workshops', 'technology seminars', 'networking events', 'skill development'],
    ogTitle: 'Tepa Solutions Events - Learn & Network',
    ogDescription: 'Discover upcoming tech events, workshops, and learning opportunities.',
    robots: 'index, follow'
  },

  '/articles': {
    title: 'Tech Insights - Tepa Solutions Blog & Digital Transformation Articles',
    description: 'Expert insights on digital transformation, web development, mobile apps, and business automation. Stay updated with latest tech trends in the Philippines.',
    keywords: ['tech blog Philippines', 'digital transformation insights', 'web development articles', 'business automation tips', 'technology trends'],
    ogTitle: 'Tepa Solutions Blog - Tech Insights',
    ogDescription: 'Expert articles on digital transformation, development, and innovation trends.',
    robots: 'index, follow'
  },

  // Contact Pages
  '/contact-us/sales': {
    title: 'Contact Sales - Get Your Digital Transformation Quote | Tepa Solutions',
    description: 'Ready to transform your business? Contact Tepa Solutions sales team for a free consultation and custom quote for your digital project.',
    keywords: ['contact tepa solutions', 'digital transformation quote', 'business automation consultation', 'web development pricing'],
    ogTitle: 'Contact Tepa Solutions - Free Consultation',
    ogDescription: 'Get a free consultation and quote for your digital transformation project.',
    robots: 'index, follow'
  },

  '/contact-us/support': {
    title: 'Technical Support - Tepa Solutions Customer Service',
    description: 'Need help with your Tepa Solutions project? Contact our technical support team for fast, reliable assistance.',
    keywords: ['tepa solutions support', 'technical help', 'customer service', 'project assistance'],
    ogTitle: 'Tepa Solutions Support - We\'re Here to Help',
    ogDescription: 'Get technical support and assistance from our expert team.',
    robots: 'index, follow'
  },

  '/contact-us/event-hosting': {
    title: 'Host an Event - Partner with Tepa Solutions',
    description: 'Partner with Tepa Solutions to host tech events, workshops, and seminars. Let\'s build the tech community together.',
    keywords: ['host tech event', 'event partnership', 'tech community Philippines', 'workshop hosting'],
    ogTitle: 'Partner with Tepa Solutions - Host Events',
    ogDescription: 'Collaborate with us to host impactful tech events and workshops.',
    robots: 'index, follow'
  },

  '/contact-us/investors': {
    title: 'Investor Relations - Tepa Solutions Investment Contact',
    description: 'Interested in investing in Tepa Solutions? Contact our investor relations team to learn about opportunities.',
    keywords: ['tepa solutions investment contact', 'investor relations', 'startup investment Philippines'],
    ogTitle: 'Tepa Solutions Investor Relations',
    ogDescription: 'Connect with our investor relations team for investment opportunities.',
    robots: 'index, follow'
  }
}

// Services SEO data
export const serviceSeoData: Record<string, Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'>> = {
  '/business-automation': {
    title: 'Business Process Automation Services Philippines | Tepa Solutions',
    description: 'Streamline your operations with expert business process automation. Sales, marketing, HR, finance automation solutions that boost efficiency and reduce costs.',
    keywords: ['business process automation Philippines', 'workflow automation', 'sales automation', 'marketing automation', 'HR automation', 'finance automation'],
    ogTitle: 'Business Automation Services - Tepa Solutions',
    ogDescription: 'Transform your business operations with intelligent automation solutions.',
    twitterTitle: 'Business Process Automation Philippines',
    twitterDescription: 'Expert automation services to streamline your business operations.',
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Business Process Automation',
      'provider': {
        '@type': 'Organization',
        'name': 'Tepa Solutions'
      },
      'description': 'Comprehensive business process automation services',
      'areaServed': 'Philippines'
    }
  },

  '/mobile-app-development': {
    title: 'Mobile App Development Philippines | iOS & Android Apps | Tepa Solutions',
    description: 'Expert mobile app development services in the Philippines. Custom iOS and Android apps that engage users and drive business growth.',
    keywords: ['mobile app development Philippines', 'iOS app development', 'Android app development', 'custom mobile apps', 'app development services'],
    ogTitle: 'Mobile App Development - Tepa Solutions',
    ogDescription: 'Professional iOS and Android app development services in the Philippines.',
    robots: 'index, follow'
  },

  '/web-application-development': {
    title: 'Web Application Development Philippines | Custom Web Apps | Tepa Solutions',
    description: 'Professional web application development services. Custom web apps, progressive web apps, and enterprise solutions built with modern technologies.',
    keywords: ['web application development Philippines', 'custom web apps', 'progressive web apps', 'enterprise web solutions', 'web development services'],
    ogTitle: 'Web Application Development - Tepa Solutions',
    ogDescription: 'Expert web application development services using cutting-edge technologies.',
    robots: 'index, follow'
  },

  '/website-development': {
    title: 'Website Development Philippines | Responsive Web Design | Tepa Solutions',
    description: 'Professional website development services in the Philippines. Responsive, fast, and SEO-optimized websites that convert visitors into customers.',
    keywords: ['website development Philippines', 'responsive web design', 'SEO-optimized websites', 'professional websites', 'web design services'],
    ogTitle: 'Website Development Services - Tepa Solutions',
    ogDescription: 'Professional website development with responsive design and SEO optimization.',
    robots: 'index, follow'
  },

  '/seo-services': {
    title: 'SEO Services Philippines | Search Engine Optimization | Tepa Solutions',
    description: 'Professional SEO services in the Philippines. Increase your online visibility, drive organic traffic, and grow your business with expert SEO strategies.',
    keywords: ['SEO services Philippines', 'search engine optimization', 'digital marketing', 'organic traffic', 'SEO agency Philippines'],
    ogTitle: 'SEO Services Philippines - Tepa Solutions',
    ogDescription: 'Expert SEO services to boost your online visibility and drive organic traffic.',
    robots: 'index, follow'
  },

  // Automation sub-services
  '/business-automation/sales-process-automation': {
    title: 'Sales Process Automation Philippines | CRM Integration | Tepa Solutions',
    description: 'Automate your sales processes with expert CRM integration, lead scoring, and sales pipeline automation. Increase conversions and close more deals.',
    keywords: ['sales automation Philippines', 'CRM automation', 'lead scoring', 'sales pipeline automation', 'sales process optimization'],
    ogTitle: 'Sales Process Automation - Tepa Solutions',
    ogDescription: 'Streamline your sales operations with intelligent automation solutions.',
    robots: 'index, follow'
  },

  '/business-automation/marketing-automation': {
    title: 'Marketing Automation Philippines | Email & Social Media Automation | Tepa Solutions',
    description: 'Boost your marketing ROI with expert automation services. Email marketing, social media automation, and lead nurturing campaigns that convert.',
    keywords: ['marketing automation Philippines', 'email automation', 'social media automation', 'lead nurturing', 'marketing ROI optimization'],
    ogTitle: 'Marketing Automation Services - Tepa Solutions',
    ogDescription: 'Intelligent marketing automation to boost ROI and nurture leads effectively.',
    robots: 'index, follow'
  },

  '/business-automation/customer-support-automation': {
    title: 'Customer Support Automation Philippines | Chatbots & Help Desk | Tepa Solutions',
    description: 'Enhance customer experience with intelligent support automation. Chatbots, ticketing systems, and automated responses that delight customers.',
    keywords: ['customer support automation Philippines', 'chatbot development', 'help desk automation', 'customer service automation'],
    ogTitle: 'Customer Support Automation - Tepa Solutions',
    ogDescription: 'Intelligent customer support automation to enhance user experience.',
    robots: 'index, follow'
  },

  '/business-automation/hr-automation': {
    title: 'HR Automation Philippines | Recruitment & Employee Management | Tepa Solutions',
    description: 'Streamline HR processes with intelligent automation. Recruitment automation, employee onboarding, and performance management systems.',
    keywords: ['HR automation Philippines', 'recruitment automation', 'employee management', 'HR process optimization', 'human resources automation'],
    ogTitle: 'HR Automation Services - Tepa Solutions',
    ogDescription: 'Comprehensive HR automation solutions for modern businesses.',
    robots: 'index, follow'
  },

  '/business-automation/finance-automation': {
    title: 'Finance Automation Philippines | Accounting & Invoice Automation | Tepa Solutions',
    description: 'Automate financial processes with expert solutions. Invoice automation, expense tracking, and financial reporting that saves time and reduces errors.',
    keywords: ['finance automation Philippines', 'accounting automation', 'invoice automation', 'expense tracking', 'financial process automation'],
    ogTitle: 'Finance Automation Services - Tepa Solutions',
    ogDescription: 'Intelligent finance automation to streamline accounting and financial processes.',
    robots: 'index, follow'
  },

  '/business-automation/inventory-management-automation': {
    title: 'Inventory Management Automation Philippines | Stock Control Systems | Tepa Solutions',
    description: 'Optimize inventory with intelligent automation. Real-time stock tracking, automated reordering, and inventory optimization systems.',
    keywords: ['inventory automation Philippines', 'stock management automation', 'inventory tracking', 'supply chain automation'],
    ogTitle: 'Inventory Management Automation - Tepa Solutions',
    ogDescription: 'Smart inventory automation solutions for efficient stock management.',
    robots: 'index, follow'
  }
}