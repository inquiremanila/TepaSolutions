// Script to generate prerendered HTML files for SEO
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { routes } from '../src/router';
import { articles } from '../src/pages/ArticlesPage';
import { events } from '../src/pages/EventsPage';
import { jobPositions } from '../src/pages/CareersPage';

const BASE_URL = 'https://tepasolutions.asia';
const OUTPUT_DIR = 'public/SEO';

interface PageData {
  url: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
}

function createHTMLTemplate(page: PageData): string {
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
  <meta name="generator" content="Tepa Solutions SEO Generator">
  <link rel="sitemap" type="application/xml" href="${BASE_URL}/sitemap.xml">
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tepa Solutions",
    "url": "${BASE_URL}",
    "logo": "${BASE_URL}/images/tepa-logo.png",
    "description": "Leading digital transformation agency in Philippines specializing in web development, mobile apps, and business automation.",
    "sameAs": [
      "https://linkedin.com/company/tepa-solutions",
      "https://twitter.com/tepasolutions"
    ]
  }
  </script>
  
  <!-- CSS (minimal for prerendered) -->
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 40px 20px;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
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
  
  <!-- JavaScript for humans (SPA) -->
  <script>
    // Redirect humans to SPA, bots see static content
    if (!/bot|crawler|spider|crawling/i.test(navigator.userAgent)) {
      window.location.href = '${page.canonical}';
    }
  </script>
</body>
</html>`;
}

function ensureDirectoryExists(filePath: string) {
  const dir = dirname(filePath);
  mkdirSync(dir, { recursive: true });
}

function generateStaticPages() {
  console.log('Generating static page HTML files...');
  
  routes.forEach(route => {
    const path = route.path === '/' ? '/index' : route.path;
    const filePath = join(OUTPUT_DIR, `${path}.html`);
    
    const pageData: PageData = {
      url: route.path,
      title: route.title,
      description: route.description,
      keywords: route.keywords,
      canonical: `${BASE_URL}${route.path}`
    };
    
    const html = createHTMLTemplate(pageData);
    
    ensureDirectoryExists(filePath);
    writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Generated: ${filePath}`);
  });
}

function generateArticlePages() {
  console.log('Generating article HTML files...');
  
  articles.forEach(article => {
    const slug = article.slug || generateSlug(article.title);
    const filePath = join(OUTPUT_DIR, 'articles', `${slug}.html`);
    
    const pageData: PageData = {
      url: `/articles/${slug}`,
      title: `${article.title} | Tech Articles | Tepa Solutions`,
      description: article.excerpt || article.title,
      keywords: article.tags?.join(', ') || 'technology, articles, tepa solutions',
      canonical: `${BASE_URL}/articles/${slug}`
    };
    
    const html = createHTMLTemplate(pageData);
    
    ensureDirectoryExists(filePath);
    writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Generated: ${filePath}`);
  });
}

function generateEventPages() {
  console.log('Generating event HTML files...');
  
  events.forEach(event => {
    const slug = event.slug || generateSlug(event.title);
    const filePath = join(OUTPUT_DIR, 'events', `${slug}.html`);
    
    const pageData: PageData = {
      url: `/events/${slug}`,
      title: `${event.title} | Tech Events | Tepa Solutions`,
      description: event.description || event.title,
      keywords: event.tags?.join(', ') || 'tech events, workshops, tepa solutions',
      canonical: `${BASE_URL}/events/${slug}`
    };
    
    const html = createHTMLTemplate(pageData);
    
    ensureDirectoryExists(filePath);
    writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Generated: ${filePath}`);
  });
}

function generateCareerPages() {
  console.log('Generating career HTML files...');
  
  jobPositions.forEach(job => {
    const slug = job.slug || generateSlug(job.title);
    const filePath = join(OUTPUT_DIR, 'careers', `${slug}.html`);
    
    const pageData: PageData = {
      url: `/careers/${slug}`,
      title: `${job.title} | Career Opportunities | Tepa Solutions`,
      description: job.description || `Join Tepa Solutions as ${job.title}`,
      keywords: `${job.title}, tech careers, ${job.department}, tepa solutions`,
      canonical: `${BASE_URL}/careers/${slug}`
    };
    
    const html = createHTMLTemplate(pageData);
    
    ensureDirectoryExists(filePath);
    writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Generated: ${filePath}`);
  });
}

function generateBusinessAutomationPages() {
  console.log('Generating business automation subpage HTML files...');
  
  const automationPages = [
    {
      path: '/business-automation/sales-process-automation',
      title: 'Sales Process Automation | CRM & Lead Management | Tepa Solutions',
      description: 'Automate your sales processes with AI-powered CRM systems, lead scoring, and pipeline automation that increases conversion rates and revenue.',
      keywords: 'sales automation, CRM automation, lead management, sales pipeline, tepa solutions'
    },
    {
      path: '/business-automation/marketing-automation',
      title: 'Marketing Automation Platform | Email Marketing & Lead Nurturing | Tepa Solutions',
      description: 'Transform your marketing with intelligent automation. Email marketing, lead nurturing, social media automation, and analytics platforms.',
      keywords: 'marketing automation, email marketing, lead nurturing, social media automation, tepa solutions'
    },
    {
      path: '/business-automation/customer-support-automation',
      title: 'Customer Support Automation | AI Chatbots & Help Desk | Tepa Solutions',
      description: 'Enhance customer experience with automated support systems. AI-powered chatbots, ticket management, and 24/7 customer service solutions.',
      keywords: 'customer support automation, AI chatbot, help desk automation, ticket management, tepa solutions'
    },
    {
      path: '/business-automation/hr-automation',
      title: 'HR Automation Solutions | Employee Management & Recruitment | Tepa Solutions',
      description: 'Streamline HR processes with intelligent automation. Recruitment automation, employee onboarding, and performance management systems.',
      keywords: 'HR automation, recruitment automation, employee management, HR processes, tepa solutions'
    },
    {
      path: '/business-automation/finance-automation',
      title: 'Finance Automation Solutions | Accounting & Financial Analytics | Tepa Solutions',
      description: 'Automate financial processes with precision. Invoice automation, expense management, and financial reporting solutions.',
      keywords: 'finance automation, accounting automation, invoice automation, financial analytics, tepa solutions'
    },
    {
      path: '/business-automation/inventory-management-automation',
      title: 'Inventory Management Automation | Supply Chain Solutions | Tepa Solutions',
      description: 'Optimize inventory with smart automation. Real-time tracking, automated reordering, and supply chain optimization systems.',
      keywords: 'inventory automation, supply chain automation, warehouse management, inventory tracking, tepa solutions'
    }
  ];
  
  automationPages.forEach(page => {
    const filePath = join(OUTPUT_DIR, `${page.path}.html`);
    
    const pageData: PageData = {
      url: page.path,
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      canonical: `${BASE_URL}${page.path}`
    };
    
    const html = createHTMLTemplate(pageData);
    
    ensureDirectoryExists(filePath);
    writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Generated: ${filePath}`);
  });
}

// Main execution
function main() {
  console.log('🚀 Starting prerendered HTML generation...\n');
  
  try {
    generateStaticPages();
    console.log('');
    generateBusinessAutomationPages();
    console.log('');
    generateArticlePages();
    console.log('');
    generateEventPages();
    console.log('');
    generateCareerPages();
    
    console.log('\n✅ All prerendered HTML files generated successfully!');
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
    
  } catch (error) {
    console.error('❌ Error generating prerendered HTML:', error);
    process.exit(1);
  }
}

main();