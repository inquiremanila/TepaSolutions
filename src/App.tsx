import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { AutomationPage } from './components/AutomationPage';
import { ServicePage } from './components/ServicePages';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';

type PageType = 'main' | 'automation' | 'service';
type ServiceType = 'app-dev' | 'web-app' | 'web-dev' | 'seo' | 'automation-sales' | 'automation-support' | 'automation-marketing' | 'automation-finance' | 'automation-hr' | 'automation-inventory';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('main');
  const [currentService, setCurrentService] = useState<ServiceType>('app-dev');

  // Handle navigation events
  useEffect(() => {
    const handleNavigateToAutomation = (event?: CustomEvent) => {
      if (event?.detail && typeof event.detail === 'string' && event.detail.startsWith('automation-')) {
        // Navigate to specific automation service
        setCurrentService(event.detail as ServiceType);
        setCurrentPage('service');
      } else {
        // Navigate to general automation page
        setCurrentPage('automation');
      }
      window.scrollTo(0, 0);
    };

    const handleNavigateToService = (event: CustomEvent) => {
      setCurrentService(event.detail as ServiceType);
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

  if (currentPage === 'automation') {
    return (
      <div className="size-full">
        <AutomationPage onBackToMain={() => setCurrentPage('main')} />
      </div>
    );
  }

  if (currentPage === 'service') {
    return (
      <div className="size-full">
        <ServicePage 
          service={currentService} 
          onBackToMain={() => setCurrentPage('main')} 
        />
      </div>
    );
  }

  return (
    <div className="size-full">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Skills />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">© 2025 Tepa Solutions. All rights reserved.</p>
          <p className="text-sm opacity-80">
            Empowering businesses through innovative digital solutions
          </p>
        </div>
      </footer>
    </div>
  );
}