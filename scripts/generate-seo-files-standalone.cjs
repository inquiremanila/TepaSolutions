// Standalone script to generate SEO files without React dependencies
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://tepasolutions.asia';
const OUTPUT_DIR = 'build/SEO';

// Static routes data
const staticRoutes = [
  { path: '/', title: 'Tepa Solutions - Leading Digital Transformation Agency Philippines', description: 'Transform your business with Tepa Solutions, the premier digital innovation agency in Philippines.', keywords: 'digital transformation agency Philippines, web development, mobile app development' },
  { path: '/business-automation', title: 'Business Process Automation Solutions | Tepa Solutions', description: 'Transform your business with intelligent automation solutions.', keywords: 'business process automation, workflow automation, AI automation' },
  { path: '/mobile-app-development', title: 'Mobile App Development Philippines | Tepa Solutions', description: 'Create powerful mobile applications with expert iOS & Android development.', keywords: 'mobile app development Philippines, iOS app development, Android app development' },
  { path: '/web-application-development', title: 'Web Application Development | Custom SaaS Solutions | Tepa Solutions', description: 'Build scalable web applications with expert React, Node.js development.', keywords: 'web application development, React development, Node.js development' },
  { path: '/website-development', title: 'Website Development Philippines | Responsive Web Design | Tepa Solutions', description: 'Professional website development services with responsive, SEO-optimized websites.', keywords: 'website development Philippines, responsive web design, SEO website development' },
  { path: '/seo-services', title: 'SEO Services Philippines | Digital Marketing | Tepa Solutions', description: 'Boost your online visibility with comprehensive SEO services and digital marketing.', keywords: 'SEO services Philippines, search engine optimization, digital marketing' },
  { path: '/learn-about-tepa', title: 'About Tepa Solutions | Leading Tech Company Philippines', description: 'Discover Tepa Solutions story - leading digital transformation agency in Philippines.', keywords: 'about Tepa Solutions, Philippines tech company, digital transformation agency' },
  { path: '/careers', title: 'Careers at Tepa Solutions | Tech Jobs Philippines', description: 'Join Tepa Solutions team! Exciting career opportunities in software development.', keywords: 'tech careers Philippines, software developer jobs, remote developer jobs' },
  { path: '/events', title: 'Tech Events & Workshops | Coding Bootcamps | Tepa Solutions', description: 'Attend Tepa Solutions tech events and workshops. Learn latest technologies.', keywords: 'tech events Philippines, coding workshops, developer meetups' },
  { path: '/articles', title: 'Tech Blog & Insights | Digital Transformation Articles | Tepa Solutions', description: 'Stay updated with latest tech trends and development tutorials.', keywords: 'tech blog Philippines, web development tutorials, digital transformation insights' },
  { path: '/investors', title: 'Investor Relations | Tepa Solutions Investment Opportunities', description: 'Explore investment opportunities with fast-growing tech company in Philippines.', keywords: 'tech startup investment, Philippines startup funding, software company investment' },
  { path: '/volunteer-with-us', title: 'Volunteer Program | Community Tech Education | Tepa Solutions', description: 'Join volunteer program and teach coding, digital literacy to underserved communities.', keywords: 'tech volunteer Philippines, coding education volunteer, digital literacy program' }
];

// Business automation subpages
const automationSubpages = [
  { path: '/business-automation/sales-process-automation', title: 'Sales Process Automation | CRM & Lead Management | Tepa Solutions', description: 'Automate sales processes with AI-powered CRM systems and lead scoring.', keywords: 'sales automation, CRM automation, lead management' },
  { path: '/business-automation/marketing-automation', title: 'Marketing Automation Platform | Email Marketing | Tepa Solutions', description: 'Transform marketing with intelligent automation and email marketing.', keywords: 'marketing automation, email marketing, lead nurturing' },
  { path: '/business-automation/customer-support-automation', title: 'Customer Support Automation | AI Chatbots | Tepa Solutions', description: 'Enhance customer experience with automated support and AI chatbots.', keywords: 'customer support automation, AI chatbot, help desk automation' },
  { path: '/business-automation/hr-automation', title: 'HR Automation Solutions | Employee Management | Tepa Solutions', description: 'Streamline HR processes with recruitment and employee management automation.', keywords: 'HR automation, recruitment automation, employee management' },
  { path: '/business-automation/finance-automation', title: 'Finance Automation Solutions | Accounting Automation | Tepa Solutions', description: 'Automate financial processes with invoice and expense management.', keywords: 'finance automation, accounting automation, invoice automation' },
  { path: '/business-automation/inventory-management-automation', title: 'Inventory Management Automation | Supply Chain | Tepa Solutions', description: 'Optimize inventory with real-time tracking and automated reordering.', keywords: 'inventory automation, supply chain automation, warehouse management' }
];

// Sample dynamic content
const articles = [
  { slug: 'iphone-17-review-philippines-pricing-release', title: 'iPhone 17 Review: Philippines Pricing and Release Date Revealed', excerpt: 'Everything you need to know about Apple latest iPhone 17, pricing, and availability.', date: '2025-01-15' },
  { slug: 'quantum-chip-breakthrough-ai-computing', title: 'Quantum Chip Breakthrough Revolutionizes AI Computing', excerpt: 'New quantum computing breakthrough promises unprecedented AI processing speeds.', date: '2025-01-12' },
  { slug: 'big-tech-news-2025-predictions', title: 'Big Tech News: 2025 Technology Predictions and Trends', excerpt: 'Expert predictions for technology trends and innovations coming in 2025.', date: '2025-01-10' }
];

const events = [
  { slug: 'free-introduction-roblox-game-development', title: 'Free Introduction of Roblox Game Development', description: 'Learn Roblox game development using Roblox Studio and Lua scripting.', date: '2025-02-15' },
  { slug: 'introduction-to-html-and-css-workshop', title: 'Introduction to HTML and CSS Workshop', description: 'Beginner-friendly workshop covering HTML and CSS fundamentals.', date: '2025-02-20' },
  { slug: 'introduction-to-website-development', title: 'Introduction to Website Development', description: 'Complete introduction to modern website development techniques.', date: '2025-02-25' }
];

const careers = [
  { slug: 'intern-frontend-developer', title: 'Frontend Developer Intern', description: 'Join our development team as a frontend developer intern learning React and TypeScript.', department: 'Engineering', postedDate: '2025-01-15' },
  { slug: 'intern-backend-developer', title: 'Backend Developer Intern', description: 'Learn backend development with Node.js, databases, and API design.', department: 'Engineering', postedDate: '2025-01-15' },
  { slug: 'contract-mobile-app-developer', title: 'Contract Mobile App Developer', description: 'Contract position for experienced mobile app developer with React Native.', department: 'Engineering', postedDate: '2025-01-12' }
];

function createHTMLTemplate(page) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="keywords" content="${page.keywords}">
  <link rel="canonical" href="${page.canonical}" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${page.canonical}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${BASE_URL}/images/og-tepa-solutions.jpg">
  <meta property="og:site_name" content="Tepa Solutions">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="${BASE_URL}/images/og-tepa-solutions.jpg">
  
  <!-- Additional SEO -->
  <meta name="robots" content="index, follow">
  <meta name="author" content="Tepa Solutions">
  <link rel="sitemap" type="application/xml" href="${BASE_URL}/sitemap.xml">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tepa Solutions",
    "url": "${BASE_URL}",
    "logo": "${BASE_URL}/images/tepa-logo.png",
    "description": "Leading digital transformation agency in Philippines.",
    "sameAs": [
      "https://linkedin.com/company/tepa-solutions",
      "https://twitter.com/tepasolutions"
    ]
  }
  </script>
  
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 40px 20px; background-color: #f9f9f9; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; margin-bottom: 20px; }
    .meta { color: #666; font-size: 14px; margin-bottom: 30px; }
    .loading { text-align: center; color: #666; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Tepa Solutions</h1>
    <div class="meta">Digital Transformation • Web Development • Mobile Apps • Business Automation</div>
    
    <h2>${page.title.split(' | ')[0]}</h2>
    <p>${page.description}</p>
    
    <div class="loading">
      <p>Loading interactive content...</p>
      <p><a href="${BASE_URL}">← Return to Main Site</a></p>
    </div>
  </div>
  
  <script>
    if (!/bot|crawler|spider|crawling/i.test(navigator.userAgent)) {
      window.location.href = '${page.canonical}';
    }
  </script>
</body>
</html>`;
}

function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function generateStaticPages() {
  console.log('Generating static pages...');
  
  const allRoutes = [...staticRoutes, ...automationSubpages];
  
  allRoutes.forEach(route => {
    const pathForFile = route.path === '/' ? '/index' : route.path;
    const filePath = path.join(OUTPUT_DIR, `${pathForFile}.html`);
    
    const pageData = {
      url: route.path,
      title: route.title,
      description: route.description,
      keywords: route.keywords,
      canonical: `${BASE_URL}${route.path}`
    };
    
    const html = createHTMLTemplate(pageData);
    
    ensureDirectoryExists(filePath);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Generated: ${filePath}`);
  });
}

function generateDynamicPages() {
  console.log('\\nGenerating dynamic pages...');
  
  // Articles
  articles.forEach(article => {
    const filePath = path.join(OUTPUT_DIR, 'articles', `${article.slug}.html`);
    const pageData = {
      url: `/articles/${article.slug}`,
      title: `${article.title} | Tech Articles | Tepa Solutions`,
      description: article.excerpt,
      keywords: 'technology, articles, tepa solutions',
      canonical: `${BASE_URL}/articles/${article.slug}`
    };
    
    const html = createHTMLTemplate(pageData);
    ensureDirectoryExists(filePath);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Generated: ${filePath}`);
  });
  
  // Events
  events.forEach(event => {
    const filePath = path.join(OUTPUT_DIR, 'events', `${event.slug}.html`);
    const pageData = {
      url: `/events/${event.slug}`,
      title: `${event.title} | Tech Events | Tepa Solutions`,
      description: event.description,
      keywords: 'tech events, workshops, tepa solutions',
      canonical: `${BASE_URL}/events/${event.slug}`
    };
    
    const html = createHTMLTemplate(pageData);
    ensureDirectoryExists(filePath);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Generated: ${filePath}`);
  });
  
  // Careers
  careers.forEach(job => {
    const filePath = path.join(OUTPUT_DIR, 'careers', `${job.slug}.html`);
    const pageData = {
      url: `/careers/${job.slug}`,
      title: `${job.title} | Career Opportunities | Tepa Solutions`,
      description: job.description,
      keywords: `${job.title}, tech careers, ${job.department}, tepa solutions`,
      canonical: `${BASE_URL}/careers/${job.slug}`
    };
    
    const html = createHTMLTemplate(pageData);
    ensureDirectoryExists(filePath);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Generated: ${filePath}`);
  });
}

function generateSitemap() {
  console.log('\\nGenerating sitemap.xml...');
  
  const today = new Date().toISOString().split('T')[0];
  const entries = [];
  
  // Static routes
  const allRoutes = [...staticRoutes, ...automationSubpages];
  allRoutes.forEach(route => {
    entries.push({
      url: `${BASE_URL}${route.path}`,
      lastmod: today,
      changefreq: route.path === '/' ? 'weekly' : 'monthly',
      priority: route.path === '/' ? '1.0' : '0.8'
    });
  });
  
  // Dynamic content
  articles.forEach(article => {
    entries.push({
      url: `${BASE_URL}/articles/${article.slug}`,
      lastmod: article.date || today,
      changefreq: 'monthly',
      priority: '0.6'
    });
  });
  
  events.forEach(event => {
    entries.push({
      url: `${BASE_URL}/events/${event.slug}`,
      lastmod: event.date || today,
      changefreq: 'weekly',
      priority: '0.5'
    });
  });
  
  careers.forEach(job => {
    entries.push({
      url: `${BASE_URL}/careers/${job.slug}`,
      lastmod: job.postedDate || today,
      changefreq: 'weekly',
      priority: '0.6'
    });
  });
  
  // Generate XML
  const header = '<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urls = entries
    .sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority))
    .map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');
  const footer = '\\n</urlset>';
  
  const sitemapXML = `${header}${urls}${footer}`;
  
  fs.writeFileSync('build/sitemap.xml', sitemapXML, 'utf8');
  console.log(`✓ Generated sitemap with ${entries.length} URLs`);
}

// Run all generators
console.log('🚀 Starting SEO file generation...\\n');

try {
  generateStaticPages();
  generateDynamicPages();
  generateSitemap();
  
  console.log('\\n✅ All SEO files generated successfully!');
  console.log(`📁 HTML files: ${OUTPUT_DIR}`);
  console.log('📄 Sitemap: build/sitemap.xml');
  
} catch (error) {
  console.error('❌ Error generating SEO files:', error);
  process.exit(1);
}