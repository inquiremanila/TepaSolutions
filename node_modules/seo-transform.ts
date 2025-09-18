import { readFileSync, writeFileSync } from 'fs';
import path from "path";

// Define interfaces for our data structures
interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  description?: string;
  author?: string;
  date?: string;
  tags?: string[];
  department?: string;
  type?: string;
  location?: string;
  category?: string;
}

interface Event {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
}

interface Career {
  slug: string;
  title: string;
  description?: string;
  location?: string;
  type?: string;
}

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  robots: string;
  jsonLd: Record<string, any>;
}

interface BuildRoute {
  path: string;
  file: string;
  slug: string;
}

// Helper function to extract data from TypeScript files
function extractArrayFromTSFile(filePath: string, arrayName: string): Article[] | Event[] | Career[] {
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Find the export statement for the array
    const exportRegex = new RegExp(`export const ${arrayName}\\s*=\\s*\\[([\\s\\S]*?)\\];`, 'g');
    const match = exportRegex.exec(content);
    
    if (!match) {
      console.log(`Array ${arrayName} not found in ${filePath}`);
      return [];
    }
    
    // Extract the array content
    let arrayContent = match[1];
    
    // Parse the objects within the array
    const objects: any[] = [];
    let bracketCount = 0;
    let currentObject = '';
    let inString = false;
    let stringChar = '';
    let escaped = false;
    
    for (let i = 0; i < arrayContent.length; i++) {
      const char = arrayContent[i];
      
      if (escaped) {
        escaped = false;
        currentObject += char;
        continue;
      }
      
      if (char === '\\') {
        escaped = true;
        currentObject += char;
        continue;
      }
      
      if ((char === '"' || char === "'" || char === '`') && !inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar && inString) {
        inString = false;
        stringChar = '';
      }
      
      if (!inString) {
        if (char === '{') {
          bracketCount++;
        } else if (char === '}') {
          bracketCount--;
        }
      }
      
      currentObject += char;
      
      // When we complete an object (bracketCount returns to 0 and we're not in a string)
      if (bracketCount === 0 && currentObject.trim() && !inString) {
        // Clean up the object string
        let objectStr = currentObject.trim().replace(/,$/, '');
        
        if (objectStr.startsWith('{') && objectStr.endsWith('}')) {
          try {
            // Create a safe evaluation of the object
            const objectData = parseObjectString(objectStr);
            if (objectData) {
              objects.push(objectData);
            }
          } catch (e) {
            console.log('Error parsing object:', (e as Error).message);
          }
        }
        
        currentObject = '';
      }
    }
    
    return objects;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, (error as Error).message);
    return [];
  }
}

// Helper function to safely parse object strings
function parseObjectString(objectStr: string): Article | null {
  try {
    // Replace template literals and other TypeScript-specific syntax
    let cleanedStr = objectStr;
    
    // Handle template literals in a basic way
    cleanedStr = cleanedStr.replace(/`([^`]*)`/g, '"$1"');
    
    // Extract key properties using regex
    const extractProperty = (prop: string) => {
      const regex = new RegExp(`${prop}:\\s*([^,}]+)`, 'i');
      const match = regex.exec(cleanedStr);
      if (match) {
        let value = match[1].trim();
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        return value;
      }
      return null;
    };
    
    // Extract arrays
    const extractArray = (prop: string) => {
      const regex = new RegExp(`${prop}:\\s*\\[([^\\]]*?)\\]`, 'i');
      const match = regex.exec(cleanedStr);
      if (match) {
        const arrayContent = match[1];
        return arrayContent.split(',').map(item => 
          item.trim().replace(/['"]/g, '')
        ).filter(item => item.length > 0);
      }
      return [];
    };
    
    return {
      id: parseInt(extractProperty('id') || '0') || 0,
      slug: extractProperty('slug') || '',
      title: extractProperty('title') || '',
      excerpt: extractProperty('excerpt') || extractProperty('description') || '',
      description: extractProperty('description') || '',
      author: extractProperty('author') || '',
      date: extractProperty('date') || '',
      tags: extractArray('tags'),
      department: extractProperty('department') || '',
      type: extractProperty('type') || '',
      location: extractProperty('location') || '',
      category: extractProperty('category') || ''
    };
  } catch (error) {
    console.log('Error in parseObjectString:', (error as Error).message);
    return null;
  }
}

// Generate SEO data for articles
function generateArticlesSEO(articles: Article[]): Record<string, Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'>> {
  const seoData: Record<string, Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'>> = {};
  
  articles.forEach(article => {
    if (!article.slug || !article.title) return;
    
    const excerpt = article.excerpt || article.description || '';
    const description = excerpt.length > 155 ? excerpt.substring(0, 152) + '...' : excerpt;
    
    seoData[article.slug] = {
      title: `${article.title} | Tepa Solutions Blog`,
      description: description,
      keywords: [...(article.tags || []), 'tepa solutions', 'tech insights', 'digital transformation'],
      ogTitle: article.title,
      ogDescription: excerpt,
      twitterTitle: article.title,
      twitterDescription: excerpt,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': article.title,
        'description': excerpt,
        'author': {
          '@type': 'Person',
          'name': article.author || 'Tepa Solutions Team'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Tepa Solutions',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://tepasolutions.asia/logo.png'
          }
        },
        'datePublished': article.date || new Date().toISOString().split('T')[0],
        'dateModified': article.date || new Date().toISOString().split('T')[0],
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://tepasolutions.asia/articles/${article.slug}`
        }
      }
    };
  });
  
  return seoData;
}

// Generate SEO data for events
function generateEventsSEO(events: Event[]): Record<string, Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'>> {
  const seoData: Record<string, Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'>> = {};
  
  events.forEach(event => {
    if (!event.slug || !event.title) return;
    
    const description = event.description || '';
    const shortDesc = description.length > 155 ? description.substring(0, 152) + '...' : description;
    
    seoData[event.slug] = {
      title: `${event.title} | Tepa Solutions Events`,
      description: shortDesc,
      keywords: ['workshop', 'tech events Philippines', 'tepa solutions', 'learning', 'workshop'],
      ogTitle: event.title,
      ogDescription: description,
      twitterTitle: event.title,
      twitterDescription: description,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Event',
        'name': event.title,
        'description': description,
        'startDate': event.date || new Date().toISOString(),
        'organizer': {
          '@type': 'Organization',
          'name': 'Tepa Solutions'
        },
        'location': {
          '@type': 'Place',
          'name': event.location || 'Tepa Solutions Office'
        }
      }
    };
  });
  
  return seoData;
}

// Generate SEO data for careers
function generateCareersSEO(careers: Career[]): Record<string, Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'>> {
  const seoData: Record<string, Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'>> = {};
  
  careers.forEach(job => {
    if (!job.slug || !job.title) return;
    
    const description = job.description || '';
    const shortDesc = description.length > 155 ? description.substring(0, 152) + '...' : description;
    const isRemote = job.location && job.location.toLowerCase().includes('remote');
    
    seoData[job.slug] = {
      title: `${job.title} | Tepa Solutions Careers`,
      description: shortDesc,
      keywords: [job.title.toLowerCase(), 'jobs Philippines', 'tepa solutions careers', 'tech jobs', job.type?.toLowerCase() || 'full time'],
      ogTitle: `${job.title} - Join Tepa Solutions`,
      ogDescription: description,
      twitterTitle: `${job.title} Position Available`,
      twitterDescription: `Join our team at Tepa Solutions. ${description}`,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        'title': job.title,
        'description': description,
        'hiringOrganization': {
          '@type': 'Organization',
          'name': 'Tepa Solutions',
          'sameAs': 'https://tepasolutions.asia'
        },
        'jobLocation': {
          '@type': 'Place',
          'address': {
            '@type': 'PostalAddress',
            'addressCountry': 'PH',
            'addressRegion': isRemote ? 'Remote' : 'Metro Manila'
          }
        },
        'employmentType': job.type === 'Internship' ? 'INTERN' : 'FULL_TIME',
        'workHours': isRemote ? 'Flexible' : '9:00 AM - 6:00 PM',
        'validThrough': new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0]
      }
    };
  });
  
  return seoData;
}

// Generate build routes for dynamic pages
function generateBuildRoutes(articles: Article[], events: Event[], careers: Career[]): BuildRoute[] {
  const routes: BuildRoute[] = [];
  
  // Article routes
  articles.forEach(article => {
    if (article.slug) {
      routes.push({
        path: `/articles/${article.slug}`,
        file: `articles/${article.slug}.html`,
        slug: article.slug
      });
    }
  });
  
  // Event routes
  events.forEach(event => {
    if (event.slug) {
      routes.push({
        path: `/events/${event.slug}`,
        file: `events/${event.slug}.html`,
        slug: event.slug
      });
    }
  });
  
  // Career routes
  careers.forEach(job => {
    if (job.slug) {
      routes.push({
        path: `/careers/${job.slug}`,
        file: `careers/${job.slug}.html`,
        slug: job.slug
      });
    }
  });
  
  return routes;
}

// Helper function to properly format SEO data as TypeScript
function formatSEODataAsTypeScript(data: Record<string, any>): string {
  let result = JSON.stringify(data, null, 2);

  // Replace property names with unquoted keys
  result = result.replace(/"(\w+)":/g, '$1:');

  // Replace all string values with single quotes and escape only single quotes inside
  result = result.replace(/: "((?:[^"\\]|\\.)*)"/g, (match, p1) => {
    // Only escape single quotes, not double quotes
    const escaped = p1.replace(/'/g, "\\'");
    return `: '${escaped}'`;
  });

  // Remove unnecessary escaping of double quotes at the start of the string
  result = result.replace(/'\\?"([^']*)'/g, "'$1'");

  return result;
}

// Generate complete new SEO content file
function generateCompleteSEOContent(
  articleSEO: Record<string, any>, 
  eventSEO: Record<string, any>, 
  careerSEO: Record<string, any>
): string {
  const articleSEOString = formatSEODataAsTypeScript(articleSEO);
  const eventSEOString = formatSEODataAsTypeScript(eventSEO);
  const careerSEOString = formatSEODataAsTypeScript(careerSEO);

  return `// SEO data for dynamic content: articles, events, and career pages
// This file is auto-generated by seo-transform.ts - do not edit manually
import type { SEOData } from './seo-generator'

// Article SEO data (keyed by slug)
export const articleSeoData: Record<string, Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'>> = ${articleSEOString};

// Event SEO data (keyed by slug)
export const eventSeoData: Record<string, Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'>> = ${eventSEOString};

// Career/Job SEO data (keyed by slug)
export const careerSeoData: Record<string, Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'>> = ${careerSEOString};


// Helper function to generate SEO data for any article
export function generateArticleSEO(slug: string, title: string, excerpt: string, author: string, publishDate: string, tags: string[]): Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'> {
  return {
    title: \`\${title} | Tepa Solutions Blog\`,
    description: excerpt.length > 155 ? excerpt.substring(0, 152) + '...' : excerpt,
    keywords: [...tags, 'tepa solutions', 'tech insights', 'digital transformation'],
    ogTitle: title,
    ogDescription: excerpt,
    twitterTitle: title,
    twitterDescription: excerpt,
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': title,
      'description': excerpt,
      'author': {
        '@type': 'Person',
        'name': author
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Tepa Solutions',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://tepasolutions.asia/logo.png'
        }
      },
      'datePublished': publishDate,
      'dateModified': publishDate,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': \`https://tepasolutions.asia/articles/\${slug}\`
      }
    }
  }
}

// Helper function to generate SEO data for any event
export function generateEventSEO(slug: string, title: string, description: string, eventDate: string, location: string, eventType: string = 'workshop'): Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'> {
  return {
    title: \`\${title} | Tepa Solutions Events\`,
    description: description.length > 155 ? description.substring(0, 152) + '...' : description,
    keywords: [eventType, 'tech events Philippines', 'tepa solutions', 'learning', 'workshop'],
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Event',
      'name': title,
      'description': description,
      'startDate': eventDate,
      'organizer': {
        '@type': 'Organization',
        'name': 'Tepa Solutions'
      },
      'location': {
        '@type': 'Place',
        'name': location
      }
    }
  }
}

// Helper function to generate SEO data for any job posting
export function generateJobSEO(slug: string, title: string, description: string, employmentType: string = 'FULL_TIME', remote: boolean = false): Omit<SEOData, 'canonical' | 'ogImage' | 'twitterImage'> {
  const locationText = remote ? 'Remote/Philippines' : 'Philippines'
  
  return {
    title: \`\${title} | Tepa Solutions Careers\`,
    description: description.length > 155 ? description.substring(0, 152) + '...' : description,
    keywords: [title.toLowerCase(), 'jobs Philippines', 'tepa solutions careers', 'tech jobs', employmentType.toLowerCase().replace('_', ' ')],
    ogTitle: \`\${title} - Join Tepa Solutions\`,
    ogDescription: description,
    twitterTitle: \`\${title} Position Available\`,
    twitterDescription: \`Join our team at Tepa Solutions. \${description}\`,
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      'title': title,
      'description': description,
      'hiringOrganization': {
        '@type': 'Organization',
        'name': 'Tepa Solutions',
        'sameAs': 'https://tepasolutions.asia'
      },
      'jobLocation': {
        '@type': 'Place',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'PH',
          'addressRegion': locationText
        }
      },
      'employmentType': employmentType,
      'workHours': remote ? 'Flexible' : '9:00 AM - 6:00 PM'
    }
  }
}`;
}

// Main function to update SEO content
// Replace the updateSEOContent function with this corrected version:

async function updateSEOContent() {
  console.log('🚀 Starting SEO content update...');
  
  try {
    // Read data from TypeScript files
    console.log('📖 Reading data from TypeScript files...');
    const articles = extractArrayFromTSFile('src/DynamicData/ArticlesPage.tsx', 'articles') as Article[];
    const events = extractArrayFromTSFile('src/DynamicData/EventsPage.tsx', 'events') as Event[];
    const careers = extractArrayFromTSFile('src/DynamicData/CareersPage.tsx', 'jobPositions') as Career[];
    
    console.log(`Found ${articles.length} articles, ${events.length} events, ${careers.length} careers`);
    
    // Generate SEO data
    console.log('🔧 Generating SEO data...');
    const articleSEO = generateArticlesSEO(articles);
    const eventSEO = generateEventsSEO(events);
    const careerSEO = generateCareersSEO(careers);
    
    // Generate complete new SEO content instead of trying to replace sections
    console.log('📄 Generating complete new SEO content...');
    const newSEOContent = generateCompleteSEOContent(articleSEO, eventSEO, careerSEO);
    
    // Write the completely new SEO content
    const seoContentPath = path.join("src", "seo-content.ts");
    writeFileSync(seoContentPath, newSEOContent, 'utf-8');
    console.log('✅ Completely regenerated seo-content.ts with fresh data');
    
    // Update build-pages.ts
    console.log('🔧 Updating build-pages.ts...');
    const buildPagesPath = path.join("src", "build-pages.ts");
    
    // Check if build-pages.ts exists
    let buildContent = '';
    try {
      buildContent = readFileSync(buildPagesPath, 'utf-8');
    } catch (error) {
      console.log('📄 build-pages.ts not found, creating new one...');
      buildContent = createDefaultBuildPages();
    }
    
    // Generate dynamic routes
    const dynamicRoutes = generateBuildRoutes(articles, events, careers);
    const dynamicRoutesString = dynamicRoutes.map(route => 
      `  { path: '${route.path}', file: '${route.file}', slug: '${route.slug}' }`
    ).join(',\n');
    
    // Replace the dynamic routes section or add it if it doesn't exist
    if (buildContent.includes('// dynamic pages')) {
      buildContent = buildContent.replace(
        /\/\/ dynamic pages[\s\S]*?\];/,
        `// dynamic pages\n${dynamicRoutesString}\n];`
      );
    } else {
      // If the section doesn't exist, append it
      buildContent += `\n\n// Dynamic routes generated by seo-transform.ts\nexport const dynamicRoutes = [\n${dynamicRoutesString}\n];`;
    }
    
    writeFileSync(buildPagesPath, buildContent, 'utf-8');
    console.log('✅ Updated build-pages.ts');
    
    console.log('🎉 SEO content update completed successfully!');
    console.log(`📊 Updated ${Object.keys(articleSEO).length + Object.keys(eventSEO).length + Object.keys(careerSEO).length} SEO entries`);
    console.log(`🌐 Generated ${dynamicRoutes.length} dynamic routes`);
    
    // Log summary of what was generated
    if (Object.keys(articleSEO).length > 0) {
      console.log(`📝 Articles: ${Object.keys(articleSEO).join(', ')}`);
    }
    if (Object.keys(eventSEO).length > 0) {
      console.log(`🎪 Events: ${Object.keys(eventSEO).join(', ')}`);
    }
    if (Object.keys(careerSEO).length > 0) {
      console.log(`💼 Careers: ${Object.keys(careerSEO).join(', ')}`);
    }
    
  } catch (error) {
    console.error('❌ Error updating SEO content:', (error as Error).message);
    console.error('Stack trace:', (error as Error).stack);
    process.exit(1);
  }
}

// Helper function to create default build-pages.ts if it doesn't exist
function createDefaultBuildPages(): string {
  return `// Build pages configuration
// This file is updated by seo-transform.ts

export const staticRoutes = [
  { path: '/', file: 'index.html' },
  { path: '/about', file: 'about.html' },
  { path: '/services', file: 'services.html' },
  { path: '/articles', file: 'articles.html' },
  { path: '/events', file: 'events.html' },
  { path: '/careers', file: 'careers.html' },
  { path: '/contact', file: 'contact.html' }
];

export const dynamicRoutes = [
  // This section will be populated by seo-transform.ts
];`;
}

// Run the update
updateSEOContent();