import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { AutomationPage } from './components/AutomationPage';
import { ServicePage } from './components/ServicePages';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { ContactForms } from './components/ContactForms';
import { Footer } from './components/Footer';
import { ArticlesPage } from './components/pages/ArticlesPage';
import { EventsPage } from './components/pages/EventsPage';
import { AboutPage } from './components/pages/AboutPage';
import { CareersPage } from './components/pages/CareersPage';
import { InvestorsPage } from './components/pages/InvestorsPage';
import { WhoWeServePage } from './components/pages/WhoWeServePage';
import { SEOHead } from './components/SEOHead';
import { SEO_CONFIG, createBreadcrumbs } from './utils/seo-config';
import { createArticleStructuredData, createServiceStructuredData } from './components/SEOHead';
import { Toaster } from "./components/ui/sonner";

type PageType = 'main' | 'automation' | 'service' | 'contact-sales' | 'contact-support' | 'contact-volunteer' | 'contact-event-host' | 'contact-investor' | 'articles' | 'events' | 'about-company' | 'careers' | 'investors' | 'business-size' | 'industry' | 'who-we-serve';
type ServiceType = 'app-dev' | 'web-app' | 'web-dev' | 'seo' | 'automation-sales' | 'automation-support' | 'automation-marketing' | 'automation-finance' | 'automation-hr' | 'automation-inventory';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('main');
  const [currentService, setCurrentService] = useState<ServiceType>('app-dev');
  const [pageHistory, setPageHistory] = useState<PageType[]>(['main']);

  // SEO optimization: Set page loading time for performance tracking
  useEffect(() => {
    // Track page load performance
    const startTime = performance.now();
    
    const handleLoad = () => {
      const loadTime = performance.now() - startTime;
      console.log(`Page loaded in ${loadTime}ms`);
      
      // Report to analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
          value: Math.round(loadTime),
          custom_parameter: currentPage
        });
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [currentPage]);

  // Handle navigation events
  useEffect(() => {
    const handleNavigateToAutomation = (event?: CustomEvent) => {
      if (event?.detail && typeof event.detail === 'string' && event.detail.startsWith('automation-')) {
        // Navigate to specific automation service
        setPageHistory(prev => [...prev, 'service']);
        setCurrentService(event.detail as ServiceType);
        setCurrentPage('service');
      } else {
        // Navigate to general automation page
        setPageHistory(prev => [...prev, 'automation']);
        setCurrentPage('automation');
      }
      window.scrollTo(0, 0);
    };

    const handleNavigateToService = (event: CustomEvent) => {
      const target = event.detail as string;
      
      // Handle home navigation
      if (target === 'home') {
        setCurrentPage('main');
        setPageHistory(['main']);
        window.scrollTo(0, 0);
        return;
      }
      
      // Handle contact forms
      if (target === 'contact-sales') {
        setPageHistory(prev => [...prev, 'contact-sales']);
        setCurrentPage('contact-sales');
        window.scrollTo(0, 0);
        return;
      }
      if (target === 'contact-support') {
        setPageHistory(prev => [...prev, 'contact-support']);
        setCurrentPage('contact-support');
        window.scrollTo(0, 0);
        return;
      }
      if (target === 'contact-volunteer') {
        setPageHistory(prev => [...prev, 'contact-volunteer']);
        setCurrentPage('contact-volunteer');
        window.scrollTo(0, 0);
        return;
      }
      if (target === 'contact-event-host') {
        setPageHistory(prev => [...prev, 'contact-event-host']);
        setCurrentPage('contact-event-host');
        window.scrollTo(0, 0);
        return;
      }
      if (target === 'contact-investor') {
        setPageHistory(prev => [...prev, 'contact-investor']);
        setCurrentPage('contact-investor');
        window.scrollTo(0, 0);
        return;
      }
      
      // Handle other pages
      if (['articles', 'events', 'about-company', 'careers', 'investors', 'business-size', 'industry', 'who-we-serve'].includes(target)) {
        setPageHistory(prev => [...prev, target as PageType]);
        setCurrentPage(target as PageType);
        window.scrollTo(0, 0);
        return;
      }
      
      // Handle service pages
      setPageHistory(prev => [...prev, 'service']);
      setCurrentService(target as ServiceType);
      setCurrentPage('service');
      window.scrollTo(0, 0);
    };

    window.addEventListener('navigateToAutomation', handleNavigateToAutomation as EventListener);
    window.addEventListener('navigateToService', handleNavigateToService as EventListener);
    
    return () => {
      window.removeEventListener('navigateToAutomation', handleNavigateToAutomation as EventListener);
      window.removeEventListener('navigateToService', handleNavigateToService as EventListener);
    };
  }, []);

  // Handle back navigation
  const handleBack = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      setPageHistory(newHistory);
      setCurrentPage(previousPage);
      window.scrollTo(0, 0);
    } else {
      setCurrentPage('main');
      setPageHistory(['main']);
      window.scrollTo(0, 0);
    }
  };

  // Get SEO config for current page
  const getSEOConfig = () => {
    if (currentPage === 'main') {
      return {
        ...SEO_CONFIG.main,
        canonical: 'https://tepasolutions.asia',
        breadcrumbs: createBreadcrumbs([])
      };
    }
    
    if (currentPage === 'service') {
      const serviceConfig = SEO_CONFIG.services[currentService];
      return {
        ...serviceConfig,
        canonical: `https://tepasolutions.asia/services/${currentService.replace('automation-', '').replace('-', '/')}`,
        breadcrumbs: createBreadcrumbs(['services', currentService])
      };
    }

    if (currentPage === 'automation') {
      return {
        title: 'Business Process Automation Solutions | AI-Powered Workflow Automation | Tepa Solutions',
        description: 'Transform your business with intelligent automation solutions from Tepa Solutions. Sales, marketing, HR, finance, and support automation that increases efficiency and reduces costs.',
        keywords: SEO_CONFIG.services['automation-sales'].keywords,
        canonical: 'https://tepasolutions.asia/automation',
        breadcrumbs: createBreadcrumbs(['automation'])
      };
    }

    // Contact forms
    const contactConfigs = {
      'contact-sales': SEO_CONFIG.contact.sales,
      'contact-support': SEO_CONFIG.contact.support,
      'contact-volunteer': SEO_CONFIG.contact.volunteer,
      'contact-event-host': SEO_CONFIG.contact['event-host'],
      'contact-investor': SEO_CONFIG.contact.investor
    };

    if (currentPage in contactConfigs) {
      const contactConfig = contactConfigs[currentPage as keyof typeof contactConfigs];
      return {
        ...contactConfig,
        canonical: `https://tepasolutions.asia/contact/${currentPage.replace('contact-', '')}`,
        breadcrumbs: createBreadcrumbs(['contact', currentPage.replace('contact-', '')])
      };
    }

    // Other pages
    const pageConfigs = {
      'about-company': SEO_CONFIG.pages['about-company'],
      'careers': SEO_CONFIG.pages.careers,
      'events': SEO_CONFIG.pages.events,
      'articles': SEO_CONFIG.pages.articles,
      'investors': SEO_CONFIG.pages.investors,
      'who-we-serve': SEO_CONFIG.pages['who-we-serve']
    };

    if (currentPage in pageConfigs || ['business-size', 'industry'].includes(currentPage)) {
      const pageKey = ['business-size', 'industry'].includes(currentPage) ? 'who-we-serve' : currentPage;
      const pageConfig = pageConfigs[pageKey as keyof typeof pageConfigs];
      return {
        ...pageConfig,
        canonical: `https://tepasolutions.asia/${pageKey.replace('-company', '').replace('-', '/')}`,
        breadcrumbs: createBreadcrumbs([pageKey.replace('-company', '')])
      };
    }

    // Fallback
    return {
      title: 'Tepa Solutions - Digital Innovation Agency Philippines',
      description: 'Leading digital transformation agency in Philippines.',
      keywords: 'digital transformation, Philippines, tech solutions',
      canonical: 'https://tepasolutions.asia'
    };
  };

  // Handle all pages with Navigation, SEO, and Footer
  const renderPageWithLayout = (content: React.ReactNode, seoOverride?: any) => {
    const seoConfig = seoOverride || getSEOConfig();
    
    return (
      <div className="min-h-screen flex flex-col">
        <SEOHead
          title={seoConfig.title}
          description={seoConfig.description}
          keywords={seoConfig.keywords}
          canonical={seoConfig.canonical}
          structuredData={seoConfig.structuredData}
          breadcrumbs={seoConfig.breadcrumbs}
          ogType="website"
          ogImage="https://tepasolutions.asia/images/og-tepa-solutions.jpg"
          author="Tepa Solutions"
          modifiedTime={new Date().toISOString()}
        />
        <Navigation />
        <main className="pt-16 flex-1" role="main">
          {content}
        </main>
        <Footer onNavigate={(section) => {
          if (section.startsWith('#')) {
            document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.dispatchEvent(new CustomEvent('navigateToService', { detail: section }));
          }
        }} />
        <Toaster />
      </div>
    );
  };

  // Handle contact forms with SEO
  if (currentPage === 'contact-sales') {
    return renderPageWithLayout(
      <ContactForms formType="sales" onBack={handleBack} />
    );
  }

  if (currentPage === 'contact-support') {
    return renderPageWithLayout(
      <ContactForms formType="support" onBack={handleBack} />
    );
  }

  if (currentPage === 'contact-volunteer') {
    return renderPageWithLayout(
      <ContactForms formType="volunteer" onBack={handleBack} />
    );
  }

  if (currentPage === 'contact-event-host') {
    return renderPageWithLayout(
      <ContactForms formType="event-host" onBack={handleBack} />
    );
  }

  if (currentPage === 'contact-investor') {
    return renderPageWithLayout(
      <ContactForms formType="investor" onBack={handleBack} />
    );
  }

  // Handle dedicated pages with SEO
  if (currentPage === 'articles') {
    return renderPageWithLayout(
      <ArticlesPage onNavigate={(target) => window.dispatchEvent(new CustomEvent('navigateToService', { detail: target }))} />
    );
  }

  if (currentPage === 'events') {
    return renderPageWithLayout(
      <EventsPage onNavigate={(target) => window.dispatchEvent(new CustomEvent('navigateToService', { detail: target }))} />
    );
  }

  if (currentPage === 'about-company') {
    return renderPageWithLayout(
      <AboutPage onNavigate={(target) => window.dispatchEvent(new CustomEvent('navigateToService', { detail: target }))} />
    );
  }

  if (currentPage === 'careers') {
    return renderPageWithLayout(
      <CareersPage onNavigate={(target) => window.dispatchEvent(new CustomEvent('navigateToService', { detail: target }))} />
    );
  }

  if (currentPage === 'investors') {
    return renderPageWithLayout(
      <InvestorsPage onNavigate={(target) => window.dispatchEvent(new CustomEvent('navigateToService', { detail: target }))} />
    );
  }

  if (['who-we-serve', 'business-size', 'industry'].includes(currentPage)) {
    return renderPageWithLayout(
      <WhoWeServePage 
        initialSection={currentPage === 'business-size' ? 'business-size' : currentPage === 'industry' ? 'industry' : 'overview'}
        onNavigate={(target) => window.dispatchEvent(new CustomEvent('navigateToService', { detail: target }))} 
      />
    );
  }

  if (currentPage === 'automation') {
    return renderPageWithLayout(
      <AutomationPage onBackToMain={handleBack} />
    );
  }

  if (currentPage === 'service') {
    return renderPageWithLayout(
      <ServicePage 
        service={currentService} 
        onBackToMain={handleBack} 
      />
    );
  }

  // Homepage with comprehensive SEO
  return renderPageWithLayout(
    <div>
      <Hero />
      <Services />
      <Portfolio />
      <Skills />
      <Contact />
    </div>
  );
}