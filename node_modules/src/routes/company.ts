// routes/company.ts
import { RouteConfig } from '../routes/routes';

export const companyRoutes: RouteConfig[] = [
  {
    path: '/learn-about-tepa',
    file: 'learn-about-tepa.html',
    title: 'About Tepa Solutions | Global Tech & Automation Partner',
    description: 'Discover Tepa Solutions—your trusted partner in digital transformation, automation, and software innovation for businesses worldwide.',
    keywords: ['about Tepa Solutions', 'global tech company', 'business automation experts', 'digital transformation partner', 'software solutions'],
    changeFreq: 'monthly',
    priority: '0.8',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Tepa Solutions",
      "description": "Tepa Solutions delivers automation and digital transformation services for businesses across the globe."
    }
  },
  {
    path: '/careers',
    file: 'careers.html',
    title: 'Careers at Tepa Solutions | Tech & Automation Jobs',
    description: 'Explore global career opportunities at Tepa Solutions. Join our team in software development, automation, and digital innovation.',
    keywords: ['Tepa Solutions careers', 'tech jobs', 'software developer jobs', 'automation jobs', 'global IT careers'],
    changeFreq: 'weekly',
    priority: '0.8',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Careers at Tepa Solutions",
      "description": "Join Tepa Solutions and shape the future of software and automation worldwide."
    }
  },
  {
    path: '/events',
    file: 'events.html',
    title: 'Tech Events & Workshops | Tepa Solutions',
    description: 'Stay updated with Tepa Solutions events, workshops, and webinars on automation, software, and business innovation.',
    keywords: ['tech events', 'automation workshops', 'software seminars', 'digital transformation events', 'business tech community'],
    changeFreq: 'weekly',
    priority: '0.7',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "EventSeries",
      "name": "Tepa Solutions Events",
      "description": "Workshops, webinars, and events on automation and technology trends."
    }
  },
  {
    path: '/investors',
    file: 'investors.html',
    title: 'Investor Relations | Tepa Solutions Global Growth',
    description: 'Explore investment opportunities with Tepa Solutions. Learn about our growth strategy, global market reach, and vision for the future.',
    keywords: ['investor relations', 'tech investment', 'business growth', 'funding opportunities', 'venture capital', 'global startup'],
    changeFreq: 'monthly',
    priority: '0.6',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Investor Relations",
      "description": "Investor relations information, growth strategy, and funding opportunities at Tepa Solutions."
    }
  },
  {
    path: '/who-we-serve',
    file: 'who-we-serve.html',
    title: 'Industries We Serve | Tepa Solutions Global Clients',
    description: 'Tepa Solutions provides tailored automation and digital solutions for industries worldwide—from SMEs to enterprises across multiple sectors.',
    keywords: ['industries served', 'business automation solutions', 'SME automation', 'enterprise software', 'global industry solutions'],
    changeFreq: 'monthly',
    priority: '0.7',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Industries We Serve",
      "description": "Overview of industries served by Tepa Solutions, from SMEs to global enterprises."
    }
  }
];

export const contactRoutes: RouteConfig[] = [
  {
    path: '/contact-us/sales',
    file: 'contact-us/sales.html',
    title: 'Contact Sales | Get a Quote from Tepa Solutions',
    description: 'Connect with our sales team for a personalized consultation and quote on automation and software solutions worldwide.',
    keywords: ['contact sales', 'get a quote', 'business consultation', 'sales inquiry', 'automation solutions contact'],
    changeFreq: 'monthly',
    priority: '0.8',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Sales Contact",
      "description": "Reach out to Tepa Solutions sales team for consultations and quotes."
    }
  },
  {
    path: '/contact-us/support',
    file: 'contact-us/support.html',
    title: 'Technical Support | Tepa Solutions Help Desk',
    description: 'Need assistance? Our global support team is ready to help with troubleshooting, maintenance, and solution guidance.',
    keywords: ['technical support', 'customer support', 'help desk', 'troubleshooting', 'automation support'],
    changeFreq: 'monthly',
    priority: '0.7',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Technical Support",
      "description": "Get technical support and troubleshooting from Tepa Solutions."
    }
  },
  {
    path: '/contact-us/volunteer',
    file: 'contact-us/volunteer.html',
    title: 'Volunteer with Tepa Solutions | Community Programs',
    description: 'Join Tepa Solutions’ volunteer initiatives and community impact programs. Help us share tech knowledge globally.',
    keywords: ['volunteer opportunities', 'tech community programs', 'social impact', 'technology outreach', 'volunteer with Tepa'],
    changeFreq: 'monthly',
    priority: '0.6',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Volunteer Opportunities",
      "description": "Volunteer with Tepa Solutions and contribute to our community impact programs."
    }
  },
  {
    path: '/contact-us/event-hosting',
    file: 'contact-us/event-hosting.html',
    title: 'Event Hosting | Partner with Tepa Solutions',
    description: 'Host impactful tech events, workshops, or seminars with Tepa Solutions as your partner in community engagement.',
    keywords: ['event hosting', 'tech event partnership', 'workshop hosting', 'seminar collaboration', 'community events'],
    changeFreq: 'monthly',
    priority: '0.6',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Event Hosting Partnership",
      "description": "Partner with Tepa Solutions to host workshops, seminars, and technology events."
    }
  },
  {
    path: '/contact-us/investors',
    file: 'contact-us/investors.html',
    title: 'Investor Contact | Tepa Solutions Opportunities',
    description: 'Contact our investor relations team to learn about funding opportunities, partnerships, and global growth plans.',
    keywords: ['investor contact', 'investment inquiry', 'funding opportunities', 'venture capital', 'partnership opportunities'],
    changeFreq: 'monthly',
    priority: '0.6',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Investor Relations Contact",
      "description": "Reach Tepa Solutions investor relations team for partnership and funding opportunities."
    }
  }
];
