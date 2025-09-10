// Sitemap generator for Tepa Solutions
export interface SitemapUrl {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    url: string;
    caption?: string;
    title?: string;
    license?: string;
  }>;
}

const baseUrl = 'https://tepasolutions.asia';
const currentDate = new Date().toISOString();

// Main website structure
export const sitemapUrls: SitemapUrl[] = [
  // Homepage - highest priority
  {
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 1.0,
    images: [
      {
        url: `${baseUrl}/images/hero-image.jpg`,
        caption: 'Tepa Solutions - Digital Transformation Agency Philippines',
        title: 'Leading Tech Solutions Provider'
      },
      {
        url: `${baseUrl}/images/team-photo.jpg`,
        caption: 'Tepa Solutions Expert Development Team',
        title: 'Professional Software Developers Philippines'
      }
    ]
  },

  // Main service categories - high priority
  {
    url: `${baseUrl}/services`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9
  },
  {
    url: `${baseUrl}/services/mobile-app-development`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
    images: [
      {
        url: `${baseUrl}/images/mobile-app-development.jpg`,
        caption: 'Mobile App Development Services Philippines',
        title: 'iOS and Android App Development'
      }
    ]
  },
  {
    url: `${baseUrl}/services/web-application-development`,
    lastModified: currentDate,
    changeFrequency: 'weekly', 
    priority: 0.9,
    images: [
      {
        url: `${baseUrl}/images/web-app-development.jpg`,
        caption: 'Custom Web Application Development',
        title: 'React and Node.js Development Services'
      }
    ]
  },
  {
    url: `${baseUrl}/services/website-development`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9
  },
  {
    url: `${baseUrl}/services/seo-services`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9
  },
  {
    url: `${baseUrl}/services/business-automation`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9
  },

  // Automation services - specific solutions
  {
    url: `${baseUrl}/services/sales-automation`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/services/marketing-automation`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/services/customer-support-automation`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/services/hr-automation`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/services/finance-automation`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/services/inventory-automation`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8
  },

  // Company pages - important for brand
  {
    url: `${baseUrl}/about`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
    images: [
      {
        url: `${baseUrl}/images/jerrie-mataya-founder.jpg`,
        caption: 'Jerrie Mataya, Founder & CEO of Tepa Solutions',
        title: 'Tech Entrepreneur Philippines'
      },
      {
        url: `${baseUrl}/images/office-philippines.jpg`,
        caption: 'Tepa Solutions Office Philippines',
        title: 'Modern Tech Workspace'
      }
    ]
  },
  {
    url: `${baseUrl}/careers`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/who-we-serve`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7
  },

  // Content pages - for SEO and engagement
  {
    url: `${baseUrl}/articles`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.7
  },
  {
    url: `${baseUrl}/events`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7
  },

  // Investment/Business pages
  {
    url: `${baseUrl}/investors`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6
  },

  // Contact pages - conversion focused
  {
    url: `${baseUrl}/contact`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/contact/sales`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/contact/support`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7
  },
  {
    url: `${baseUrl}/contact/volunteer`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.5
  },
  {
    url: `${baseUrl}/contact/events`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.5
  },
  {
    url: `${baseUrl}/contact/investors`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6
  },

  // Portfolio/Case studies (if available)
  {
    url: `${baseUrl}/portfolio`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7
  },

  // Legal pages (important for trust)
  {
    url: `${baseUrl}/privacy-policy`,
    lastModified: currentDate,
    changeFrequency: 'yearly',
    priority: 0.3
  },
  {
    url: `${baseUrl}/terms-of-service`,
    lastModified: currentDate,
    changeFrequency: 'yearly',
    priority: 0.3
  }
];

// Generate XML sitemap
export const generateSitemap = (): string => {
  const urlElements = sitemapUrls.map(item => {
    let urlXml = `  <url>
    <loc>${item.url}</loc>`;
    
    if (item.lastModified) {
      urlXml += `\n    <lastmod>${item.lastModified}</lastmod>`;
    }
    
    if (item.changeFrequency) {
      urlXml += `\n    <changefreq>${item.changeFrequency}</changefreq>`;
    }
    
    if (item.priority !== undefined) {
      urlXml += `\n    <priority>${item.priority}</priority>`;
    }
    
    // Add image information if available
    if (item.images && item.images.length > 0) {
      item.images.forEach(image => {
        urlXml += `\n    <image:image>
      <image:loc>${image.url}</image:loc>`;
        
        if (image.caption) {
          urlXml += `\n      <image:caption>${escapeXml(image.caption)}</image:caption>`;
        }
        
        if (image.title) {
          urlXml += `\n      <image:title>${escapeXml(image.title)}</image:title>`;
        }
        
        if (image.license) {
          urlXml += `\n      <image:license>${image.license}</image:license>`;
        }
        
        urlXml += `\n    </image:image>`;
      });
    }
    
    urlXml += `\n  </url>`;
    return urlXml;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlElements}
</urlset>`;
};

// Generate sitemap index for multiple sitemaps
export const generateSitemapIndex = (): string => {
  const sitemaps = [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: currentDate
    },
    {
      url: `${baseUrl}/sitemap-services.xml`,
      lastModified: currentDate
    },
    {
      url: `${baseUrl}/sitemap-articles.xml`,
      lastModified: currentDate
    },
    {
      url: `${baseUrl}/sitemap-images.xml`,
      lastModified: currentDate
    }
  ];

  const sitemapElements = sitemaps.map(sitemap => 
    `  <sitemap>
    <loc>${sitemap.url}</loc>
    <lastmod>${sitemap.lastModified}</lastmod>
  </sitemap>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
};

// Helper function to escape XML characters
const escapeXml = (unsafe: string): string => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '<';
      case '>': return '>';
      case '&': return '&';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

// Generate news sitemap for articles/blog posts
export const generateNewsSitemap = (articles: any[] = []): string => {
  const newsElements = articles.map(article => `  <url>
    <loc>${article.url}</loc>
    <news:news>
      <news:publication>
        <news:name>Tepa Solutions Blog</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${article.publishDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      <news:keywords>${article.keywords}</news:keywords>
    </news:news>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsElements}
</urlset>`;
};