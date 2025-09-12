@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 14px;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --card: #ffffff;
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: #030213;
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0.0058 264.53);
  --secondary-foreground: #030213;
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --accent-foreground: #030213;
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  --input: transparent;
  --input-background: #f3f3f5;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: #030213;
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', system-ui, sans-serif;
    line-height: 1.6;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/**
 * Base typography. This is not applied to elements which have an ancestor with a Tailwind text class.
 */
@layer base {
  :where(:not(:has([class*=" text-"]), :not(:has([class^="text-"])))) {
    h1 {
      font-size: var(--text-2xl);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h2 {
      font-size: var(--text-xl);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h3 {
      font-size: var(--text-lg);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h4 {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    p {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }

    label {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    button {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    input {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }
  }
}

html {
  font-size: var(--font-size);
}

/* Navigation Dropdown Utilities */
@layer utilities {
  /* Text truncation for long content */
  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  
  /* Responsive min/max widths for viewport constraints */
  .min-w-72 {
    min-width: 18rem;
  }
  
  .max-w-80 {
    max-width: 20rem;
  }
  
  .max-w-96 {
    max-width: 24rem;
  }
}

/* SEO and Performance Optimizations */
@layer base {
  /* Improve Core Web Vitals */
  html {
    scroll-behavior: smooth;
  }
  
  /* Optimize font loading for better CLS and FCP */
  @font-face {
    font-display: swap;
    font-family: system;
  }
  
  /* Critical CSS - Improve First Contentful Paint */
  body {
    @apply bg-background text-foreground;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', system-ui, sans-serif;
    line-height: 1.6;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Improve image loading and LCP */
  img {
    loading: lazy;
    decoding: async;
    height: auto;
    max-width: 100%;
  }
  
  /* Critical images should load eager */
  img[data-priority="high"] {
    loading: eager;
    fetchpriority: high;
  }
  
  /* Accessibility improvements for SEO */
  *:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  /* Skip to content link for accessibility */
  .skip-to-content {
    @apply absolute -top-10 left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded;
    @apply transform -translate-y-16 transition-transform duration-300;
  }
  
  .skip-to-content:focus {
    @apply translate-y-0;
  }
  
  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    :root {
      --color-border: #000000;
      --color-ring: #0066cc;
    }
    
    .dark {
      --color-border: #ffffff;
      --color-ring: #66b3ff;
    }
  }
  
  /* Print styles for better document SEO */
  @media print {
    body {
      background: white !important;
      color: black !important;
    }
    
    .no-print {
      display: none !important;
    }
    
    a::after {
      content: " (" attr(href) ")";
      font-size: 0.8em;
      color: #666;
    }
    
    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid;
      page-break-inside: avoid;
    }
  }
}

/* Responsive Navigation Dropdown Best Practices */
@layer components {
  /* Base dropdown responsive behavior */
  .navigation-dropdown {
    /* Ensure proper spacing and overflow handling */
    max-width: 100%;
    overflow: hidden;
  }
  
  /* Desktop dropdown constraints */
  @media (min-width: 768px) {
    .navigation-dropdown {
      /* Prevent dropdown from extending beyond viewport */
      max-width: min(calc(100vw - 4rem), 800px);
    }
  }
  
  /* Mobile dropdown full-width behavior */
  @media (max-width: 767px) {
    .navigation-dropdown {
      width: 100%;
      max-width: none;
    }
  }
  
  /* Touch-friendly interactions for mobile */
  @media (pointer: coarse) {
    .navigation-dropdown button {
      min-height: 44px; /* WCAG AA minimum touch target */
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .navigation-dropdown button {
      border: 1px solid transparent;
    }
    
    .navigation-dropdown button:hover,
    .navigation-dropdown button:focus {
      border-color: currentColor;
    }
  }
  
  /* Reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .navigation-dropdown * {
      transition-duration: 0.1s !important;
      animation-duration: 0.1s !important;
    }
  }
  
  /* Focus management for accessibility */
  .navigation-dropdown button:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  /* Submenu positioning constraints */
  .navigation-submenu {
    /* Ensure submenu doesn't overflow viewport */
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    
    /* Custom scrollbar for webkit browsers */
    scrollbar-width: thin;
    scrollbar-color: var(--color-border) transparent;
  }
  
  .navigation-submenu::-webkit-scrollbar {
    width: 4px;
  }
  
  .navigation-submenu::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .navigation-submenu::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 2px;
  }
}