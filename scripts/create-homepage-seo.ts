#!/usr/bin/env tsx

/**
 * Create Homepage SEO - Generates SEO page for the homepage
 */

import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://tepasolutions.asia';

function generateHomepageSEO(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tepa Solutions | Digital Transformation & Business Automation Philippines</title>
    <meta name="description" content="Leading digital transformation agency in Philippines. We specialize in business automation, web development, mobile apps, and AI solutions to accelerate your business growth.">
    <meta name="keywords" content="digital transformation Philippines, business automation, web development, mobile app development, AI solutions, process automation, digital agency">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="Tepa Solutions | Digital Transformation & Business Automation Philippines">
    <meta property="og:description" content="Leading digital transformation agency in Philippines. We specialize in business automation, web development, mobile apps, and AI solutions to accelerate your business growth.">
    <meta property="og:url" content="${BASE_URL}/">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${BASE_URL}/images/logo.png">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Tepa Solutions | Digital Transformation & Business Automation Philippines">
    <meta name="twitter:description" content="Leading digital transformation agency in Philippines. We specialize in business automation, web development, mobile apps, and AI solutions to accelerate your business growth.">
    <meta name="twitter:image" content="${BASE_URL}/images/logo.png">
    
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Tepa Solutions",
        "url": "${BASE_URL}",
        "logo": "${BASE_URL}/images/logo.png",
        "description": "Leading digital transformation agency in Philippines specializing in business automation, web development, mobile apps, and AI solutions.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "PH",
            "addressRegion": "Philippines"
        },
        "sameAs": [
            "https://www.linkedin.com/company/tepasolutions",
            "https://twitter.com/tepasolutions"
        ],
        "offers": [
            {
                "@type": "Service",
                "name": "Business Process Automation",
                "description": "AI-powered automation solutions for sales, marketing, HR, and operations"
            },
            {
                "@type": "Service", 
                "name": "Web Application Development",
                "description": "Custom web applications and SaaS platforms built with modern technologies"
            },
            {
                "@type": "Service",
                "name": "Mobile App Development", 
                "description": "Native and cross-platform mobile applications for iOS and Android"
            }
        ]
    }
    </script>
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${BASE_URL}/">
    
    <!-- Redirect to SPA for humans - FIXED: Don't redirect if already on /bot/ path -->
    <script>
        // Only redirect if this is likely a human (has JavaScript enabled) and not already on a /bot/ path
        if (!window.location.pathname.includes('/bot/') &&
            navigator.userAgent.indexOf('bot') === -1 && 
            navigator.userAgent.indexOf('crawler') === -1 && 
            navigator.userAgent.indexOf('spider') === -1) {
            window.location.href = '/';
        }
    </script>
</head>
<body>
    <h1>Tepa Solutions | Digital Transformation & Business Automation Philippines</h1>
    <p>Leading digital transformation agency in Philippines. We specialize in business automation, web development, mobile apps, and AI solutions to accelerate your business growth.</p>
    
    <!-- Key Services for SEO -->
    <div>
        <h2>Our Services</h2>
        <ul>
            <li><a href="/business-automation">Business Process Automation</a> - AI-powered workflow automation</li>
            <li><a href="/web-application-development">Web Application Development</a> - Custom SaaS and web platforms</li>
            <li><a href="/mobile-app-development">Mobile App Development</a> - iOS and Android applications</li>
            <li><a href="/website-development">Website Development</a> - Professional business websites</li>
            <li><a href="/seo-services">SEO Services</a> - Search engine optimization</li>
        </ul>
        
        <h2>Business Automation Solutions</h2>
        <ul>
            <li><a href="/business-automation/sales-process-automation">Sales Process Automation</a></li>
            <li><a href="/business-automation/marketing-automation">Marketing Automation</a></li>
            <li><a href="/business-automation/hr-automation">HR Automation</a></li>
            <li><a href="/business-automation/finance-automation">Finance Automation</a></li>
            <li><a href="/business-automation/customer-service-automation">Customer Service Automation</a></li>
            <li><a href="/business-automation/operations-automation">Operations Automation</a></li>
        </ul>
        
        <h2>Company</h2>
        <ul>
            <li><a href="/learn-about-tepa">About Tepa Solutions</a></li>
            <li><a href="/careers">Careers & Jobs</a></li>
            <li><a href="/articles">Technology Articles & Insights</a></li>
            <li><a href="/events">Free Workshops & Events</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
        </ul>
    </div>
    
    <!-- Fallback content for bots -->
    <div>
        <p>This page contains optimized content for search engines.</p>
        <p><a href="/">Visit the full interactive website</a></p>
    </div>
</body>
</html>`;
}

async function createHomepageSEO(): Promise<void> {
  try {
    console.log('🏠 Creating homepage SEO file...');
    
    const buildDir = path.join(process.cwd(), 'build');
    const htmlContent = generateHomepageSEO();
    const filePath = path.join(buildDir, 'index.html');
    
    fs.writeFileSync(filePath, htmlContent, 'utf8');
    console.log('✅ Created build/index.html');
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Error creating homepage SEO:', error.message);
    } else {
      console.error('❌ Unknown error:', error);
    }
    process.exit(1);
  }
}

// Run the homepage SEO generator
createHomepageSEO();