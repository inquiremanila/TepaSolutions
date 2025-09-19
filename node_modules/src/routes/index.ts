// routes/index.ts - Central export for all route configurations
export type { RouteConfig } from '../routes/routes';

// Static route exports
export { serviceRoutes } from './services';
export { automationRoutes } from './automation';
export { companyRoutes, contactRoutes } from './company';
export { dynamicEventRoutes, dynamicJobRoutes } from './dynamic';

// Utility function to get all static routes
import { serviceRoutes } from './services';
import { automationRoutes } from './automation';
import { companyRoutes, contactRoutes } from './company';
import { RouteConfig } from './routes';

export const getAllStaticRoutes = (): RouteConfig[] => {
  return [
    ...serviceRoutes,
    ...automationRoutes,
    ...companyRoutes,
    ...contactRoutes,
  ];
};

// Route configuration summary for documentation
export const routeStats = {
  services: serviceRoutes.length,
  automation: automationRoutes.length,
  company: companyRoutes.length,
  contact: contactRoutes.length,
  total: getAllStaticRoutes().length
};