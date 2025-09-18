// routes/dynamic.ts
import { RouteConfig } from '../routes/routes';

export const dynamicArticleRoutes = (articles: any[]): RouteConfig[] => {
  return articles.map(article => ({
    path: `/articles/${article.slug}`,
    file: `articles/${article.slug}.html`,
    title: `${article.title} | Tepa Solutions`,
    description: article.description || `Read ${article.title} - an insightful technology article by Tepa Solutions.`,
    keywords: article.topics || ['tech article', 'blog', article.category.toLowerCase(), 'Philippines', 'technology'],
    changeFreq: 'monthly' as const,
    priority: '0.7',
    ogImage: article.image || '/images/articles/default-article.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.description,
      "datePublished": article.publishDate,
      "dateModified": article.updateDate || article.publishDate,
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
      "image": article.image || `https://tepasolutions.asia/images/articles/default-article.jpg`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://tepasolutions.asia/articles/${article.slug}`
      }
    }
  }));
};

export const dynamicEventRoutes = (events: any[]): RouteConfig[] => {
  return events.map(event => ({
    path: `/events/${event.slug}`,
    file: `events/${event.slug}.html`,
    title: `${event.title} | Tepa Solutions`,
    description: event.description || `Join us for ${event.title} - an exciting technology event by Tepa Solutions.`,
    keywords: event.topics || ['tech event', 'workshop', event.category.toLowerCase(), 'Philippines', 'technology'],
    changeFreq: 'monthly' as const,
    priority: '0.7',
    ogImage: event.image || '/images/events/default-event.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": event.title,
      "description": event.description,
      "startDate": `${event.date}T${event.time.split(' - ')[0]}:00+08:00`,
      "endDate": `${event.date}T${event.time.split(' - ')[1]}:00+08:00`,
      "location": {
        "@type": "Place",
        "name": event.location,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "Philippines"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Tepa Solutions",
        "url": "https://tepasolutions.asia"
      },
      "image": event.image || `https://tepasolutions.asia/images/events/default-event.jpg`,
      "offers": event.price === "Free" ? {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "PHP",
        "availability": "https://schema.org/InStock"
      } : event.price !== "TBA" ? {
        "@type": "Offer",
        "price": event.price,
        "priceCurrency": "PHP",
        "availability": "https://schema.org/InStock"
      } : undefined
    }
  }));
};

export const dynamicJobRoutes = (jobs: any[]): RouteConfig[] => {
  return jobs.map(job => ({
    path: `/careers/${job.slug}`,
    file: `careers/${job.slug}.html`,
    title: `${job.title} | Careers at Tepa Solutions`,
    description: job.description || `Join our team as a ${job.title}. Exciting opportunity to work with cutting-edge technology at Tepa Solutions.`,
    keywords: job.requirements?.slice(0, 5) || ['career', 'job', 'technology', 'Philippines', job.department.toLowerCase()],
    changeFreq: 'weekly' as const,
    priority: '0.7',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": job.title,
      "description": job.description,
      "identifier": {
        "@type": "PropertyValue",
        "name": "Tepa Solutions",
        "value": job.id.toString()
      },
      "datePosted": job.postedDate,
      "validThrough": job.applicationDeadline,
      "employmentType": job.type.toUpperCase(),
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Tepa Solutions",
        "sameAs": "https://tepasolutions.asia",
        "logo": "https://tepasolutions.asia/logo.png"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": job.location,
          "addressCountry": "Philippines"
        }
      },
      "qualifications": job.requirements?.join(', '),
      "skills": job.niceToHave?.join(', ')
    }
  }));
};