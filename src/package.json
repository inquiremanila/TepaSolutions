{
  "name": "tepa-solutions-website",
  "version": "1.0.0",
  "type": "module",
  "description": "Tepa Solutions - Leading Digital Transformation Agency Philippines",
  "keywords": [
    "digital transformation",
    "web development",
    "mobile app development", 
    "business automation",
    "Philippines tech company",
    "software development",
    "AI solutions",
    "cloud services"
  ],
  "author": "Tepa Solutions <info@tepasolutions.asia>",
  "license": "MIT",
  "homepage": "https://tepasolutions.asia",
  "repository": {
    "type": "git",
    "url": "https://github.com/tepasolutions/website.git"
  },
  "scripts": {
    "dev": "vite",
    "build": "npm run build:pages && vite build",
    "build:pages": "tsx build-pages.ts",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist",
    "deploy": "npm run build && npm run deploy:cloudflare",
    "deploy:cloudflare": "wrangler pages publish dist",
    "sitemap": "tsx utils/sitemap-generator.ts",
    "seo-audit": "lighthouse --only-categories=seo --output=json --output-path=./seo-audit.json https://tepasolutions.asia",
    "performance-audit": "lighthouse --only-categories=performance --output=json --output-path=./performance-audit.json https://tepasolutions.asia"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "motion": "^10.16.4",
    "lucide-react": "^0.344.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "sonner": "^1.4.0",
    "react-hook-form": "^7.55.0",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",
    "recharts": "^2.10.3",
    "react-slick": "^0.30.2",
    "react-responsive-masonry": "^2.1.7",
    "react-dnd": "^16.0.1",
    "react-dnd-html5-backend": "^16.0.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.0",
    "typescript": "^5.2.2",
    "tsx": "^4.7.1",
    "eslint": "^8.56.0",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "wrangler": "^3.28.0",
    "lighthouse": "^11.4.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "not ie 11"
  ]
}