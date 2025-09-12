# Tepa Solutions - React + Vite Project

## Overview
This is a React + TypeScript application for Tepa Solutions website, built with Vite as the build tool. It's a multi-page website with custom routing, showcasing the company's digital transformation services.

## Recent Changes (September 12, 2025)
- ✅ Configured for Replit environment
- ✅ Fixed React JSX transform issues by adding explicit React imports
- ✅ Updated Vite config to bind to 0.0.0.0:5000 for Replit proxy compatibility
- ✅ Created TypeScript configuration (tsconfig.json, tsconfig.node.json)
- ✅ Set up development workflow on port 5000
- ✅ Configured deployment settings for production (autoscale with static file serving)
- ✅ All dependencies installed and application running successfully

## Project Architecture
- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Radix UI + Custom components
- **Styling**: CSS with custom styling system
- **Routing**: Custom SPA routing implementation
- **Build System**: Vite (outputs to `build/` directory)
- **Package Manager**: npm

## Development
- **Port**: 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 (allows proxy access)
- **Development Command**: `npm run dev`
- **Build Command**: `npm run build`

## Key Dependencies
- React 18.3.1 + React DOM
- Vite 6.3.5 + React SWC plugin
- Radix UI components
- TypeScript support
- Various utility libraries (clsx, lucide-react, etc.)

## Deployment
- **Target**: Autoscale (for static website)
- **Build**: npm run build
- **Serve**: serve -s build -l 5000 (SPA fallback enabled)
- **Production Command**: npm start
- **Build Output**: `build/` directory

## Notes
- The project uses a custom router implementation instead of React Router
- Multiple page components for different service offerings
- Extensive use of Radix UI components for accessibility
- Configured for production deployment on Replit's infrastructure