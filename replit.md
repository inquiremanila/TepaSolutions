# Tepa Solutions - React Vite Application

## Overview
This is a React application for Tepa Solutions, built with Vite, TypeScript, and Tailwind CSS. The application includes:
- Modern React 18 with functional components and hooks
- Vite build system for fast development and optimized production builds
- Tailwind CSS for utility-first styling
- Radix UI components for accessible UI primitives
- Supabase integration for backend services

## Recent Changes
- **Sept 10, 2025**: Configured for Replit environment
  - Updated Vite config to serve on port 5000 with host 0.0.0.0
  - Fixed React imports for JSX compatibility
  - Added Tailwind CSS and PostCSS configuration
  - Set up development workflow and deployment configuration
  - Added "type": "module" to package.json for ES modules

## Project Architecture
- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Radix UI + custom components
- **Build Tool**: Vite with SWC for fast compilation
- **Deployment**: Configured for autoscale deployment on Replit

## Development
- Run `npm run dev` to start development server on port 5000
- Run `npm run build` to create production build
- Frontend serves on 0.0.0.0:5000 for Replit compatibility

## Key Features
- Responsive design with modern UI components
- Contact forms and business automation demos
- Service pages for different business solutions
- SEO optimized with structured data
- Performance tracking and analytics integration

## Dependencies
- Core: React, React DOM, Vite
- UI: Radix UI components, Lucide React icons
- Styling: Tailwind CSS, class-variance-authority
- Backend: Supabase, Hono framework
- Forms: React Hook Form
- Charts: Recharts
- Notifications: Sonner