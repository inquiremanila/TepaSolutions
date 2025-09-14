#!/usr/bin/env tsx

/**
 * SEO HTML Generator - Creates static HTML pages for bots
 * Generates SEO-optimized HTML pages in build/SEO/ folder structure
 */

import fs from 'fs';
import path from 'path';

// Import pure data without React dependencies
import { articles } from '../src/data/articles-data';
import { events } from '../src/data/events-data';
import { jobPositions } from '../src/data/careers-data';

interface SEOPageData {
  title: string;
  description: string;
  keywords: string;
  url: string;
  image?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  type: 'article' | 'website' | 'profile';
}

const BASE_URL = 'https://tepasolutions.asia';
const WORKER_URL = 'https://tepasolutions.apicall.workers.dev';

function generateHTMLPage(data: SEOPageData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <meta name="description" content="${data.description}">
    <meta name="keywords" content="${data.keywords}">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="${data.title}">
    <meta property="og:description" content="${data.description}">
    <meta property="og:url" content="${data.url}">
    <meta property="og:type" content="${data.type}">
    ${data.image ? `<meta property="og:image" content="${data.image}">` : ''}
    ${data.publishedTime ? `<meta property="article:published_time" content="${data.publishedTime}">` : ''}
    ${data.modifiedTime ? `<meta property="article:modified_time" content="${data.modifiedTime}">` : ''}
    ${data.author ? `<meta property="article:author" content="${data.author}">` : ''}
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${data.title}">
    <meta name="twitter:description" content="${data.description}">
    ${data.image ? `<meta name="twitter:image" content="${data.image}">` : ''}
    
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "${data.type === 'article' ? 'Article' : 'WebPage'}",
        "headline": "${data.title}",
        "description": "${data.description}",
        "url": "${data.url}"${data.image ? `,
        "image": "${data.image}"` : ''}${data.author ? `,
        "author": {
            "@type": "Person",
            "name": "${data.author}"
        }` : ''}${data.publishedTime ? `,
        "datePublished": "${data.publishedTime}"` : ''}${data.modifiedTime ? `,
        "dateModified": "${data.modifiedTime}"` : ''}
    }
    </script>
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${data.url}">
    
    <!-- Redirect to SPA for humans -->
    <script>
        // Only redirect if this is likely a human (has JavaScript enabled)
        if (navigator.userAgent.indexOf('bot') === -1 && 
            navigator.userAgent.indexOf('crawler') === -1 && 
            navigator.userAgent.indexOf('spider') === -1) {
            window.location.href = '${data.url.replace(BASE_URL, '')}';
        }
    </script>
</head>
<body>
    <h1>${data.title}</h1>
    <p>${data.description}</p>
    
    <!-- Fallback content for bots -->
    <div>
        <p>This page contains optimized content for search engines.</p>
        <p><a href="${data.url.replace(BASE_URL, '')}">Visit the full interactive page</a></p>
    </div>
</body>
</html>`;
}

function createDirectoryIfNotExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function generateBusinessAutomationPages(): void {
  const automationTypes = [
    {
      slug: 'sales-process-automation',
      title: 'Sales Process Automation | Tepa Solutions',
      description: 'Streamline your sales processes with intelligent automation. Increase conversion rates, reduce manual tasks, and accelerate revenue growth.',
      keywords: 'sales automation, CRM automation, lead management, sales process optimization'
    },
    {
      slug: 'marketing-automation',
      title: 'Marketing Automation Solutions | Tepa Solutions',
      description: 'Transform your marketing with AI-powered automation. Email campaigns, lead nurturing, and customer segmentation made easy.',
      keywords: 'marketing automation, email automation, lead nurturing, digital marketing'
    },
    {
      slug: 'hr-automation',
      title: 'HR Process Automation | Tepa Solutions',
      description: 'Automate HR processes including recruitment, onboarding, payroll, and employee management. Improve efficiency and employee experience.',
      keywords: 'HR automation, recruitment automation, payroll automation, employee management'
    },
    {
      slug: 'finance-automation',
      title: 'Finance & Accounting Automation | Tepa Solutions',
      description: 'Automate financial processes, invoicing, expense management, and reporting. Ensure accuracy and compliance with intelligent automation.',
      keywords: 'finance automation, accounting automation, invoice automation, expense management'
    },
    {
      slug: 'operations-automation',
      title: 'Operations Process Automation | Tepa Solutions',
      description: 'Optimize operational workflows with smart automation. Inventory management, supply chain, and process optimization solutions.',
      keywords: 'operations automation, workflow automation, inventory management, supply chain automation'
    },
    {
      slug: 'customer-service-automation',
      title: 'Customer Service Automation | Tepa Solutions',
      description: 'Enhance customer support with AI-powered automation. Chatbots, ticket management, and automated response systems.',
      keywords: 'customer service automation, support automation, chatbot, helpdesk automation'
    }
  ];

  const businessAutomationDir = path.join(process.cwd(), 'build', 'SEO', 'business-automation');
  createDirectoryIfNotExists(businessAutomationDir);

  automationTypes.forEach(automation => {
    const pageData: SEOPageData = {
      title: automation.title,
      description: automation.description,
      keywords: automation.keywords,
      url: `${BASE_URL}/business-automation/${automation.slug}`,
      type: 'website'
    };

    const htmlContent = generateHTMLPage(pageData);
    const filePath = path.join(businessAutomationDir, `${automation.slug}.html`);
    fs.writeFileSync(filePath, htmlContent, 'utf8');
  });

  console.log('✅ Generated business automation SEO pages');
}

function generateServicePages(): void {
  const services = [
    {
      slug: 'mobile-application-development',
      title: 'Mobile App Development Philippines | iOS & Android Apps | Tepa Solutions',
      description: 'Expert mobile app development services in Philippines. Build powerful iOS & Android applications with React Native, Flutter, and native technologies.',
      keywords: 'mobile app development Philippines, iOS development, Android development, React Native, Flutter'
    },
    {
      slug: 'web-application-development',
      title: 'Web Application Development | Custom SaaS Solutions | Tepa Solutions',
      description: 'Build scalable web applications with modern technologies. Custom SaaS platforms, progressive web apps, and enterprise solutions.',
      keywords: 'web application development, SaaS development, progressive web apps, custom software'
    },
    {
      slug: 'web-development',
      title: 'Website Development Philippines | Responsive Web Design | Tepa Solutions',
      description: 'Professional website development services. Responsive, SEO-optimized websites built with modern technologies for businesses.',
      keywords: 'website development Philippines, web design, responsive websites, SEO optimization'
    },
    {
      slug: 'seo-solutions',
      title: 'SEO Services Philippines | Search Engine Optimization | Tepa Solutions',
      description: 'Boost your online visibility with expert SEO services. Technical SEO, content optimization, and digital marketing strategies.',
      keywords: 'SEO services Philippines, search engine optimization, digital marketing, website optimization'
    }
  ];

  const seoDir = path.join(process.cwd(), 'build', 'SEO');

  services.forEach(service => {
    const pageData: SEOPageData = {
      title: service.title,
      description: service.description,
      keywords: service.keywords,
      url: `${BASE_URL}/${service.slug}`,
      type: 'website'
    };

    const htmlContent = generateHTMLPage(pageData);
    const filePath = path.join(seoDir, `${service.slug}.html`);
    fs.writeFileSync(filePath, htmlContent, 'utf8');
  });

  console.log('✅ Generated service SEO pages');
}

function generateArticlePages(): void {
  const articlesDir = path.join(process.cwd(), 'build', 'SEO', 'articles');
  createDirectoryIfNotExists(articlesDir);

  // Generate index page
  const articleIndexData: SEOPageData = {
    title: 'Articles & Insights | Technology News & Business Automation | Tepa Solutions',
    description: 'Stay updated with the latest technology trends, business automation insights, and digital transformation strategies from Tepa Solutions experts.',
    keywords: 'technology articles, business automation insights, digital transformation, tech news',
    url: `${BASE_URL}/articles`,
    type: 'website'
  };

  const indexHtml = generateHTMLPage(articleIndexData);
  fs.writeFileSync(path.join(articlesDir, '../articles.html'), indexHtml, 'utf8');

  // Generate individual article pages
  articles.forEach(article => {
    const pageData: SEOPageData = {
      title: article.title,
      description: article.excerpt,
      keywords: article.tags.join(', '),
      url: `${BASE_URL}/articles/${article.slug}`,
      image: article.featuredImage,
      author: article.author,
      publishedTime: article.date,
      type: 'article'
    };

    const htmlContent = generateHTMLPage(pageData);
    const filePath = path.join(articlesDir, `${article.slug}.html`);
    fs.writeFileSync(filePath, htmlContent, 'utf8');
  });

  console.log('✅ Generated article SEO pages');
}

function generateEventPages(): void {
  const eventsDir = path.join(process.cwd(), 'build', 'SEO', 'events');
  createDirectoryIfNotExists(eventsDir);

  // Generate index page
  const eventIndexData: SEOPageData = {
    title: 'Events & Workshops | Free Tech Training | Tepa Solutions',
    description: 'Join our free technology workshops and training events. Learn web development, mobile app development, and digital skills.',
    keywords: 'tech events, free workshops, programming training, web development courses',
    url: `${BASE_URL}/events`,
    type: 'website'
  };

  const indexHtml = generateHTMLPage(eventIndexData);
  fs.writeFileSync(path.join(eventsDir, '../events.html'), indexHtml, 'utf8');

  // Generate individual event pages
  events.forEach(event => {
    const pageData: SEOPageData = {
      title: `${event.title} | Free Workshop | Tepa Solutions`,
      description: event.description,
      keywords: `${event.title}, free workshop, ${event.category.toLowerCase()}, ${event.instructor}`,
      url: `${BASE_URL}/events/${event.slug}`,
      image: event.image,
      type: 'website'
    };

    const htmlContent = generateHTMLPage(pageData);
    const filePath = path.join(eventsDir, `${event.slug}.html`);
    fs.writeFileSync(filePath, htmlContent, 'utf8');
  });

  console.log('✅ Generated event SEO pages');
}

function generateCareerPages(): void {
  const careersDir = path.join(process.cwd(), 'build', 'SEO', 'careers');
  createDirectoryIfNotExists(careersDir);

  // Generate index page
  const careerIndexData: SEOPageData = {
    title: 'Careers | Join Our Team | Tepa Solutions',
    description: 'Join our growing team of technology professionals. Explore internship and contract opportunities in development, marketing, and business.',
    keywords: 'tech careers, developer jobs, internships, remote work, technology jobs Philippines',
    url: `${BASE_URL}/careers`,
    type: 'website'
  };

  const indexHtml = generateHTMLPage(careerIndexData);
  fs.writeFileSync(path.join(careersDir, '../careers.html'), indexHtml, 'utf8');
  fs.writeFileSync(path.join(careersDir, 'index.html'), indexHtml, 'utf8');

  // Generate individual career pages
  jobPositions.forEach(job => {
    const pageData: SEOPageData = {
      title: `${job.title} | ${job.type} | Tepa Solutions`,
      description: job.description,
      keywords: `${job.title.toLowerCase()}, ${job.type.toLowerCase()}, ${job.department.toLowerCase()}, remote work, tech jobs`,
      url: `${BASE_URL}/careers/${job.slug}`,
      type: 'website'
    };

    const htmlContent = generateHTMLPage(pageData);
    const filePath = path.join(careersDir, `${job.slug}.html`);
    fs.writeFileSync(filePath, htmlContent, 'utf8');
  });

  console.log('✅ Generated career SEO pages');
}

function generateStaticPages(): void {
  const seoDir = path.join(process.cwd(), 'build', 'SEO');

  const staticPages = [
    {
      slug: 'business-automation',
      title: 'Business Process Automation | AI-Powered Solutions | Tepa Solutions',
      description: 'Transform your business with intelligent automation solutions. Sales, marketing, HR, finance, and operations automation that increases efficiency and reduces costs.',
      keywords: 'business process automation, workflow automation, AI automation, process optimization, digital transformation',
      image: '/images/logo.png'
    },
    {
      slug: 'volunteer-with-us',
      title: 'Volunteer With Us | Community Impact | Tepa Solutions',
      description: 'Join our volunteer program and make a positive impact in the technology community. Contribute to educational initiatives and social causes.',
      keywords: 'volunteer opportunities, community service, tech volunteering, social impact'
    },
    {
      slug: 'learn-about-tepa',
      title: 'About Tepa Solutions | Leading Digital Transformation Agency Philippines',
      description: 'Learn about Tepa Solutions, a premier digital transformation agency in Philippines specializing in automation, web development, and mobile apps.',
      keywords: 'about Tepa Solutions, digital transformation agency, company profile, Philippines tech company'
    },
    {
      slug: 'investors',
      title: 'Investor Relations | Investment Opportunities | Tepa Solutions',
      description: 'Explore investment opportunities with Tepa Solutions. Learn about our growth strategy, market position, and investor relations.',
      keywords: 'investment opportunities, investor relations, tech startup investment, business growth'
    },
    {
      slug: 'contact-us',
      title: 'Contact Us | Get In Touch | Tepa Solutions',
      description: 'Contact Tepa Solutions for your digital transformation needs. Get a free consultation for automation, web development, and mobile app projects.',
      keywords: 'contact Tepa Solutions, free consultation, project inquiry, Philippines tech company'
    }
  ];

  staticPages.forEach(page => {
    const pageData: SEOPageData = {
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      url: `${BASE_URL}/${page.slug}`,
      image: (page as any).image || undefined,
      type: 'website'
    };

    const htmlContent = generateHTMLPage(pageData);
    const filePath = path.join(seoDir, `${page.slug}.html`);
    fs.writeFileSync(filePath, htmlContent, 'utf8');
  });

  console.log('✅ Generated static SEO pages');
}

async function generateAllSEOPages(): Promise<void> {
  try {
    console.log('🚀 Starting SEO HTML page generation...');

    // Create main SEO directory
    const seoDir = path.join(process.cwd(), 'build', 'SEO');
    createDirectoryIfNotExists(seoDir);

    // Generate all page types
    generateBusinessAutomationPages();
    generateServicePages();
    generateArticlePages();
    generateEventPages();
    generateCareerPages();
    generateStaticPages();

    console.log('🎉 SEO HTML page generation completed successfully!');
    console.log(`📁 All pages saved to: build/SEO/`);
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Error generating SEO pages:', error.message);
      console.error('Stack trace:', error.stack);
    } else {
      console.error('❌ Unknown error:', error);
    }
    process.exit(1);
  }
}

// Run the SEO page generator
generateAllSEOPages();