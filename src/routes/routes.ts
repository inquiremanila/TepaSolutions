// types/routes.ts
export interface RouteConfig {
  path: string;
  file: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: Record<string, any>;
}