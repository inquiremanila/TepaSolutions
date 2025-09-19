// Performance and SEO optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private loadTimes: Map<string, number> = new Map();
  private webVitalsData: any = {};

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Track Core Web Vitals
  measureWebVitals(): void {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      this.observeLCP();
      
      // First Input Delay (FID) 
      this.observeFID();
      
      // Cumulative Layout Shift (CLS)
      this.observeCLS();
      
      // First Contentful Paint (FCP)
      this.observeFCP();
      
      // Time to Interactive (TTI)
      this.measureTTI();
    }
  }

  private observeLCP(): void {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.webVitalsData.lcp = lastEntry.startTime;
      
      // Report to analytics if LCP is good (< 2.5s)
      if (lastEntry.startTime < 2500) {
        this.reportMetric('LCP', lastEntry.startTime, 'good');
      } else if (lastEntry.startTime < 4000) {
        this.reportMetric('LCP', lastEntry.startTime, 'needs-improvement');
      } else {
        this.reportMetric('LCP', lastEntry.startTime, 'poor');
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }

  private observeFID(): void {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        this.webVitalsData.fid = entry.processingStart - entry.startTime;
        
        const fid = entry.processingStart - entry.startTime;
        if (fid < 100) {
          this.reportMetric('FID', fid, 'good');
        } else if (fid < 300) {
          this.reportMetric('FID', fid, 'needs-improvement');
        } else {
          this.reportMetric('FID', fid, 'poor');
        }
      });
    }).observe({ entryTypes: ['first-input'] });
  }

  private observeCLS(): void {
    let clsValue = 0;
    let clsEntries: any[] = [];

    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      });
      
      this.webVitalsData.cls = clsValue;
      
      if (clsValue < 0.1) {
        this.reportMetric('CLS', clsValue, 'good');
      } else if (clsValue < 0.25) {
        this.reportMetric('CLS', clsValue, 'needs-improvement');
      } else {
        this.reportMetric('CLS', clsValue, 'poor');
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private observeFCP(): void {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.webVitalsData.fcp = entry.startTime;
        
        if (entry.startTime < 1800) {
          this.reportMetric('FCP', entry.startTime, 'good');
        } else if (entry.startTime < 3000) {
          this.reportMetric('FCP', entry.startTime, 'needs-improvement');
        } else {
          this.reportMetric('FCP', entry.startTime, 'poor');
        }
      });
    }).observe({ entryTypes: ['paint'] });
  }

  private measureTTI(): void {
    if ('getEntriesByType' in performance) {
      // Simple TTI approximation
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0];
        const tti = nav.domContentLoadedEventEnd - nav.fetchStart;
        this.webVitalsData.tti = tti;
        
        if (tti < 3800) {
          this.reportMetric('TTI', tti, 'good');
        } else if (tti < 7300) {
          this.reportMetric('TTI', tti, 'needs-improvement');
        } else {
          this.reportMetric('TTI', tti, 'poor');
        }
      }
    }
  }

  private reportMetric(name: string, value: number, rating: string): void {
    // Report to console in development
    console.log(`${name}: ${value}ms (${rating})`);
    
    // Report to analytics in production
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        metric_name: name,
        metric_value: Math.round(value),
        metric_rating: rating,
        custom_parameter_1: window.location.pathname
      });
    }
  }

  // Preload critical resources
  preloadCriticalResources(): void {
    const criticalResources = [
      '/images/logo.png',
      '/images/hero-background.jpg',
      '/fonts/system-font.woff2'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      if (resource.includes('.woff')) {
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
      } else if (resource.includes('.jpg') || resource.includes('.png')) {
        link.as = 'image';
      }
      
      document.head.appendChild(link);
    });
  }

  // Lazy load non-critical resources
  setupLazyLoading(): void {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-lazy]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.lazy || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  // Optimize images based on device capabilities
  optimizeImages(): void {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add WebP support detection
      if (this.supportsWebP()) {
        const src = img.src;
        if (!src.includes('.webp')) {
          img.src = src.replace(/\.(jpg|jpeg|png)/, '.webp');
        }
      }
      
      // Add responsive images based on viewport
      if (window.innerWidth < 768) {
        img.loading = 'lazy';
        img.decoding = 'async';
      }
    });
  }

  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // Monitor and report page load metrics
  trackPageLoad(pageName: string): void {
    const startTime = performance.now();
    
    window.addEventListener('load', () => {
      const loadTime = performance.now() - startTime;
      this.loadTimes.set(pageName, loadTime);
      
      // Report page load time
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_complete', {
          page_name: pageName,
          load_time: Math.round(loadTime),
          custom_parameter_1: window.location.pathname
        });
      }
      
      // Check if page load is optimal (< 3s)
      if (loadTime > 3000) {
        console.warn(`Page ${pageName} loaded slowly: ${loadTime}ms`);
      }
    });
  }

  // Setup Service Worker for caching
  setupServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // Generate performance report
  generatePerformanceReport(): any {
    return {
      webVitals: this.webVitalsData,
      loadTimes: Object.fromEntries(this.loadTimes),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      connectionType: (navigator as any).connection?.effectiveType || 'unknown',
      deviceMemory: (navigator as any).deviceMemory || 'unknown'
    };
  }
}

// Initialize performance monitoring
export const initializePerformanceMonitoring = (): void => {
  const optimizer = PerformanceOptimizer.getInstance();
  
  // Start measuring web vitals
  optimizer.measureWebVitals();
  
  // Preload critical resources
  optimizer.preloadCriticalResources();
  
  // Setup lazy loading
  optimizer.setupLazyLoading();
  
  // Optimize images
  optimizer.optimizeImages();
  
  // Setup service worker
  optimizer.setupServiceWorker();
  
  // Track current page
  const pageName = window.location.pathname.replace('/', '') || 'home';
  optimizer.trackPageLoad(pageName);
};

// SEO utilities
export const SEOUtils = {
  // Add structured data to page
  addStructuredData: (data: any) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  },

  // Update page title and meta description
  updatePageMeta: (title: string, description: string, keywords?: string) => {
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDescription) {
      metaDescription.content = description;
    }
    
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      if (metaKeywords) {
        metaKeywords.content = keywords;
      }
    }
  },

  // Generate breadcrumb JSON-LD
  generateBreadcrumbLD: (breadcrumbs: Array<{ name: string; url: string }>) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  },

  // Check if page is indexable
  isIndexable: (): boolean => {
    const robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    return !robots || !robots.content.includes('noindex');
  },

  // Get page performance score estimate
  getPerformanceScore: async (): Promise<number> => {
    const optimizer = PerformanceOptimizer.getInstance();
    const report = optimizer.generatePerformanceReport();
    
    let score = 100;
    
    // Deduct points for poor metrics
    if (report.webVitals.lcp > 4000) score -= 20;
    if (report.webVitals.fid > 300) score -= 15;
    if (report.webVitals.cls > 0.25) score -= 15;
    if (report.webVitals.fcp > 3000) score -= 10;
    if (report.webVitals.tti > 7300) score -= 10;
    
    return Math.max(score, 0);
  }
};