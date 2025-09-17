// routes/articles.ts
import { RouteConfig } from '../routes/routes';
import { articles } from '../DynamicData/ArticlesPage'; 


export const articleRoutes: RouteConfig[] = [
  {
    path: '/articles',
    file: 'articles.html',
    title: 'Tech Articles & Industry Insights | Tepa Solutions',
    description: 'Stay updated with the latest technology trends, business automation insights, and industry best practices from Tepa Solutions experts.',
    keywords: ['technology articles', 'business automation', 'AI insights', 'digital transformation', 'tech trends', 'Philippines'],
    changeFreq: 'weekly',
    priority: '0.8',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Tepa Solutions Tech Blog",
      "description": "Latest insights on technology and business automation",
      "url": "https://tepasolutions.asia/articles",
      "publisher": {
        "@type": "Organization",
        "name": "Tepa Solutions"
      }
    }
  },
  {
    path: '/articles/iphone-17-review-philippines-pricing-release',
    file: 'articles/iphone-17-review-philippines-pricing-release.html',
    title: 'iPhone 17 Review: Philippines Pricing and Release Date Revealed | Tepa Solutions',
    description: 'Everything you need to know about Apple\'s latest iPhone 17, including comprehensive reviews, Philippines pricing, availability, and release timeline. Is it worth the upgrade?',
    keywords: ['iPhone 17', 'Apple', 'Philippines', 'Review', 'Mobile Technology', 'iPhone release', 'Philippines tech'],
    changeFreq: 'monthly',
    priority: '0.7',
    ogImage: 'https://ruhsxjeiegdeshcnbuxy.supabase.co/storage/v1/object/public/tepa-images/iphone-17-5-new-features.webp',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "iPhone 17 Review: Philippines Pricing and Release Date Revealed",
      "description": "Everything you need to know about Apple's latest iPhone 17, including comprehensive reviews, Philippines pricing, availability, and release timeline.",
      "author": {
        "@type": "Person",
        "name": "Jake Martinez"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Tepa Solutions",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tepasolutions.asia/logo.png"
        }
      },
      "datePublished": "2025-01-20T08:00:00+08:00",
      "dateModified": "2025-01-20T08:00:00+08:00",
      "image": "https://ruhsxjeiegdeshcnbuxy.supabase.co/storage/v1/object/public/tepa-images/iphone-17-5-new-features.webp"
    }
  },
  {
    path: '/articles/quantum-chip-technology-breakthrough-2025',
    file: 'articles/quantum-chip-technology-breakthrough-2025.html',
    title: 'Quantum Chip Revolution: The Future of Computing is Here | Tepa Solutions',
    description: 'Explore the groundbreaking developments in quantum chip technology that are set to revolutionize computing, artificial intelligence, and scientific research in 2025 and beyond.',
    keywords: ['Quantum Computing', 'Technology', 'Innovation', 'Future Tech', 'Quantum chips', 'Computing breakthrough'],
    changeFreq: 'monthly',
    priority: '0.7',
    ogImage: 'https://ruhsxjeiegdeshcnbuxy.supabase.co/storage/v1/object/public/tepa-images/quantumcomputor1.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Quantum Chip Revolution: The Future of Computing is Here",
      "description": "Explore the groundbreaking developments in quantum chip technology that are set to revolutionize computing, artificial intelligence, and scientific research in 2025 and beyond.",
      "author": {
        "@type": "Person",
        "name": "Dr. Maria Santos"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Tepa Solutions",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tepasolutions.asia/logo.png"
        }
      },
      "datePublished": "2025-01-18T08:00:00+08:00",
      "dateModified": "2025-01-18T08:00:00+08:00",
      "image": "https://ruhsxjeiegdeshcnbuxy.supabase.co/storage/v1/object/public/tepa-images/quantumcomputor1.jpg"
    }
  },
  {
    path: '/articles/big-tech-news-2025-major-developments',
    file: 'articles/big-tech-news-2025-major-developments.html',
    title: 'Big Tech News 2025: Major Developments Shaping the Industry | Tepa Solutions',
    description: 'Stay updated with the latest major developments in the tech industry, from AI breakthroughs to regulatory changes, mergers, and innovations that are reshaping the digital landscape.',
    keywords: ['Big Tech', 'Industry News', 'AI', 'Regulation', 'Innovation', 'Tech developments 2025'],
    changeFreq: 'monthly',
    priority: '0.7',
    ogImage: 'https://ruhsxjeiegdeshcnbuxy.supabase.co/storage/v1/object/public/tepa-images/September%202025/article/futute-of-tech.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Big Tech News 2025: Major Developments Shaping the Industry",
      "description": "Stay updated with the latest major developments in the tech industry, from AI breakthroughs to regulatory changes, mergers, and innovations that are reshaping the digital landscape.",
      "author": {
        "@type": "Person",
        "name": "Manuel Rodriguez"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Tepa Solutions",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tepasolutions.asia/logo.png"
        }
      },
      "datePublished": "2025-01-16T08:00:00+08:00",
      "dateModified": "2025-01-16T08:00:00+08:00",
      "image": "https://ruhsxjeiegdeshcnbuxy.supabase.co/storage/v1/object/public/tepa-images/September%202025/article/futute-of-tech.jpg"
    }
  },
  {
    path: '/articles/top-10-ai-video-generation-tools-comparison-2025',
    file: 'articles/top-10-ai-video-generation-tools-comparison-2025.html',
    title: 'Top 10 AI Video Generation Tools: Complete Comparison Guide 2025 | Tepa Solutions',
    description: 'Comprehensive comparison of the best AI video generation tools available in 2025. From features and pricing to use cases and limitations, find the perfect AI video tool for your needs.',
    keywords: ['AI Video', 'Content Creation', 'Tools Comparison', 'Video Generation', 'AI tools 2025'],
    changeFreq: 'monthly',
    priority: '0.7',
    ogImage: 'https://ruhsxjeiegdeshcnbuxy.supabase.co/storage/v1/object/public/tepa-images/September%202025/article/Top-10-video-ai-generator.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Top 10 AI Video Generation Tools: Complete Comparison Guide 2025",
      "description": "Comprehensive comparison of the best AI video generation tools available in 2025. From features and pricing to use cases and limitations, find the perfect AI video tool for your needs.",
      "author": {
        "@type": "Person",
        "name": "Sarah Chen"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Tepa Solutions",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tepasolutions.asia/logo.png"
        }
      },
      "datePublished": "2025-01-14T08:00:00+08:00",
      "dateModified": "2025-01-14T08:00:00+08:00",
      "image": "https://ruhsxjeiegdeshcnbuxy.supabase.co/storage/v1/object/public/tepa-images/September%202025/article/Top-10-video-ai-generator.jpg"
    }
  }
];

// You can add more article routes here as needed
export const dynamicArticleRoutes = (articles: any[]): RouteConfig[] => {
  return articles.map(article => ({
    path: `/articles/${article.slug}`,
    file: `articles/${article.slug}.html`,
    title: `${article.title} | Tepa Solutions`,
    description: article.excerpt || article.description,
    keywords: article.tags || ['technology', 'business', 'automation'],
    changeFreq: 'monthly' as const,
    priority: '0.7',
    ogImage: article.featuredImage || '/images/articles/default-article.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.excerpt || article.description,
      "author": {
        "@type": "Person",
        "name": article.author || "Tepa Solutions Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Tepa Solutions",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tepasolutions.asia/logo.png"
        }
      },
      "datePublished": article.publishedAt,
      "dateModified": article.updatedAt || article.publishedAt,
      "image": `https://tepasolutions.asia${article.featuredImage || '/images/articles/default-article.jpg'}`
    }
  }));
};