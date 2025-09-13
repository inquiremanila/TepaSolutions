/**
 * SEO1: Data Sources - Central location for all content data
 * This file imports and re-exports all content data for SEO and sitemap generation
 */

// Import articles data from the correct location (pages/ not components/pages/)
import { articles } from '../pages/ArticlesPage';

// Import events data  
import { events } from '../pages/EventsPage';

// Import careers data
import { jobPositions } from '../pages/CareersPage';

// Utility function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Add slug to articles since they don't have them
export const articlesWithSlugs = articles.map(article => ({
  ...article,
  slug: generateSlug(article.title)
}));

// Re-export events and careers (they already have slugs)
export { events, jobPositions };

// Export all data for easy access
export const allContent = {
  articles: articlesWithSlugs,
  events,
  careers: jobPositions
};

export default allContent;