// Router system for multi-page architecture
import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { Toaster } from "./components/ui/sonner";

// Import all page components
import { HomePage } from './pages/HomePage';
import { BusinessAutomationPage } from './pages/BusinessAutomationPage';
import { MobileAppDevelopmentPage } from './pages/MobileAppDevelopmentPage';
import { WebApplicationDevelopmentPage } from './pages/WebApplicationDevelopmentPage';
import { WebsiteDevelopmentPage } from './pages/WebsiteDevelopmentPage';
import { SEOServicesPage } from './pages/SEOServicesPage';
import { SalesAutomationPage } from './pages/SalesAutomationPage';
import { MarketingAutomationPage } from './pages/MarketingAutomationPage';
import { SupportAutomationPage } from './pages/SupportAutomationPage';
import { HRAutomationPage } from './pages/HRAutomationPage';
import { FinanceAutomationPage } from './pages/FinanceAutomationPage';
import { InventoryAutomationPage } from './pages/InventoryAutomationPage';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { EventsPage } from './pages/EventsPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { InvestorsPage } from './pages/InvestorsPage';
import { WhoWeServePage } from './pages/WhoWeServePage';
import { VolunteerPage } from './pages/VolunteerPage';
import { ContactSalesPage } from './pages/ContactSalesPage';
import { ContactSupportPage } from './pages/ContactSupportPage';
import { ContactVolunteerPage } from './pages/ContactVolunteerPage';
import { ContactEventHostPage } from './pages/ContactEventHostPage';
import { ContactInvestorPage } from './pages/ContactInvestorPage';
import { ContactCareersPage } from './pages/ContactCareersPage';
import { ArticlePage } from './pages/ArticlePage';
import { EventPage } from './pages/EventPage';
import { JobPage } from './pages/JobPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Route configuration
export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  title: string;
  description: string;
  keywords: string;
  exact?: boolean;
}

export const routes: RouteConfig[] = [
  // Homepage
  {
    path: '/',
    component: HomePage,
    title: 'Tepa Solutions - Leading Digital Transformation Agency Philippines | Web & Mobile App Development',
    description: 'Transform your business with Tepa Solutions, the premier digital innovation agency in Philippines. We specialize in AI-powered web applications, mobile app development, business automation, and cloud solutions for startups to Fortune 500 companies worldwide.',
    keywords: 'digital transformation agency Philippines, web application development, mobile app development company, business automation solutions, AI-powered solutions, custom software development, cloud migration services, enterprise digital transformation',
    exact: true
  },

  // Main Services
  {
    path: '/business-automation',
    component: BusinessAutomationPage,
    title: 'Business Process Automation Solutions | AI-Powered Workflow Automation | Tepa Solutions',
    description: 'Transform your business with intelligent automation solutions from Tepa Solutions. Sales, marketing, HR, finance, and support automation that increases efficiency and reduces costs.',
    keywords: 'business process automation, workflow automation, AI automation, process optimization, digital transformation, business efficiency, automation solutions Philippines'
  },
  {
    path: '/mobile-app-development',
    component: MobileAppDevelopmentPage,
    title: 'Mobile App Development Philippines | iOS & Android Apps | Tepa Solutions',
    description: 'Create powerful mobile applications with Tepa Solutions. Expert iOS & Android app development using React Native, Flutter, and native technologies. From startups to enterprise - we build scalable, user-centric mobile solutions.',
    keywords: 'mobile app development Philippines, iOS app development, Android app development, React Native development, Flutter app development, cross-platform mobile apps, native app development'
  },
  {
    path: '/web-application-development',
    component: WebApplicationDevelopmentPage,
    title: 'Web Application Development | Custom SaaS Solutions | React & Node.js | Tepa Solutions',
    description: 'Build scalable web applications with Tepa Solutions. Expert React, Node.js, and cloud-native development. Custom SaaS platforms, progressive web apps, and enterprise solutions for modern businesses.',
    keywords: 'web application development, React development services, Node.js development, SaaS platform development, progressive web applications, custom web development, cloud-native applications'
  },
  {
    path: '/website-development',
    component: WebsiteDevelopmentPage,
    title: 'Website Development Philippines | Responsive Web Design | SEO-Optimized Sites | Tepa Solutions',
    description: 'Professional website development services in Philippines. Responsive, SEO-optimized websites built with modern technologies. From corporate websites to e-commerce platforms - fast, secure, and mobile-friendly.',
    keywords: 'website development Philippines, responsive web design, SEO website development, corporate website design, e-commerce website development, WordPress development, website optimization'
  },
  {
    path: '/seo-services',
    component: SEOServicesPage,
    title: 'SEO Services Philippines | Digital Marketing | Search Engine Optimization | Tepa Solutions',
    description: 'Boost your online visibility with Tepa Solutions SEO services. Comprehensive search engine optimization, local SEO, technical SEO, and digital marketing strategies that deliver measurable results and ROI.',
    keywords: 'SEO services Philippines, search engine optimization, local SEO Philippines, technical SEO, SEO consulting, digital marketing Philippines, Google ranking optimization'
  },

  // Automation Sub-services
  {
    path: '/business-automation/sales-process-automation',
    component: SalesAutomationPage,
    title: 'Sales Automation Solutions | CRM Integration | Lead Management | Tepa Solutions',
    description: 'Automate your sales processes with Tepa Solutions. AI-powered CRM systems, lead scoring, pipeline automation, and sales analytics that increase conversion rates and revenue.',
    keywords: 'sales automation solutions, CRM automation, lead management system, sales pipeline automation, AI sales tools, sales process optimization, revenue automation'
  },
  {
    path: '/business-automation/marketing-automation',
    component: MarketingAutomationPage,
    title: 'Marketing Automation Platform | Email Marketing | Lead Nurturing | Tepa Solutions',
    description: 'Transform your marketing with intelligent automation. Email marketing, lead nurturing, social media automation, and analytics platforms that drive growth and customer engagement.',
    keywords: 'marketing automation platform, email marketing automation, lead nurturing system, social media automation, marketing analytics, customer journey automation'
  },
  {
    path: '/business-automation/customer-support-automation',
    component: SupportAutomationPage,
    title: 'Customer Support Automation | AI Chatbots | Help Desk Solutions | Tepa Solutions',
    description: 'Enhance customer experience with automated support systems. AI-powered chatbots, ticket management, knowledge base automation, and 24/7 customer service solutions.',
    keywords: 'customer support automation, AI chatbot development, help desk automation, ticket management system, automated customer service, support ticket automation'
  },
  {
    path: '/business-automation/hr-automation',
    component: HRAutomationPage,
    title: 'HR Automation Solutions | Employee Management | Recruitment Automation | Tepa Solutions',
    description: 'Streamline HR processes with intelligent automation. Recruitment automation, employee onboarding, performance management, and HR analytics for modern workforce management.',
    keywords: 'HR automation solutions, recruitment automation, employee management system, HR process automation, payroll automation, performance management automation'
  },
  {
    path: '/business-automation/finance-automation',
    component: FinanceAutomationPage,
    title: 'Finance Automation Solutions | Accounting Automation | Financial Analytics | Tepa Solutions',
    description: 'Automate financial processes with precision. Invoice automation, expense management, financial reporting, and accounting integration solutions for accurate and efficient finance operations.',
    keywords: 'finance automation solutions, accounting automation, invoice automation, expense management automation, financial reporting automation, accounts payable automation'
  },
  {
    path: '/business-automation/inventory-management-automation',
    component: InventoryAutomationPage,
    title: 'Inventory Management Automation | Supply Chain Solutions | Warehouse Management | Tepa Solutions',
    description: 'Optimize inventory with smart automation. Real-time inventory tracking, automated reordering, supply chain optimization, and warehouse management systems.',
    keywords: 'inventory management automation, supply chain automation, warehouse management system, inventory tracking automation, automated reordering system'
  },

  // Company Pages
  {
    path: '/learn-about-tepa',
    component: AboutPage,
    title: 'About Tepa Solutions | Leading Tech Company Philippines | Our Story & Mission',
    description: 'Discover Tepa Solutions story - from startup to leading digital transformation agency in Philippines. Founded by Jerrie Mataya in 2024, we\'re revolutionizing how businesses embrace technology worldwide.',
    keywords: 'about Tepa Solutions, Philippines tech company, Jerrie Mataya founder, digital transformation agency, software development company Philippines, tech startup Philippines'
  },
  {
    path: '/careers',
    component: CareersPage,
    title: 'Careers at Tepa Solutions | Tech Jobs Philippines | Software Developer Positions',
    description: 'Join Tepa Solutions team! Exciting career opportunities in software development, AI, cloud computing, and digital innovation. Remote and on-site positions available for passionate tech professionals.',
    keywords: 'tech careers Philippines, software developer jobs, remote developer jobs, React developer careers, AI engineer positions, startup careers Philippines'
  },
  {
    path: '/volunteer-with-us',
    component: VolunteerPage,
    title: 'Volunteer Program | Community Tech Education | Digital Literacy | Tepa Solutions',
    description: 'Join Tepa Solutions volunteer program and make a difference! Help teach coding, digital literacy, and tech skills to underserved communities across the Philippines. Mentorship opportunities available.',
    keywords: 'tech volunteer Philippines, coding education volunteer, digital literacy program, community tech outreach, programming mentorship, volunteer opportunities Philippines'
  },
  {
    path: '/events',
    component: EventsPage,
    title: 'Tech Events & Workshops | Coding Bootcamps | Webinars | Tepa Solutions',
    description: 'Attend Tepa Solutions tech events and workshops. Learn latest technologies, networking opportunities, and skill development programs. From beginners to advanced developers.',
    keywords: 'tech events Philippines, coding workshops, developer meetups, tech conferences Philippines, programming bootcamps, web development training'
  },
  {
    path: '/articles',
    component: ArticlesPage,
    title: 'Tech Blog & Insights | Digital Transformation Articles | Development Guides | Tepa Solutions',
    description: 'Stay updated with latest tech trends, development tutorials, and digital transformation insights. Expert articles on web development, mobile apps, AI, and business automation.',
    keywords: 'tech blog Philippines, web development tutorials, digital transformation insights, programming guides, technology articles, software development tips'
  },
  {
    path: '/investors',
    component: InvestorsPage,
    title: 'Investor Relations | Tepa Solutions Investment Opportunities | Tech Startup Philippines',
    description: 'Explore investment opportunities with Tepa Solutions. Fast-growing tech company in Philippines with proven track record in digital transformation and software development.',
    keywords: 'tech startup investment, Philippines startup funding, software company investment, digital transformation investment, tech IPO Philippines, venture capital opportunities'
  },
  {
    path: '/who-we-serve',
    component: WhoWeServePage,
    title: 'Industries We Serve | Startup to Enterprise Solutions | Global Tech Services | Tepa Solutions',
    description: 'Tepa Solutions serves diverse industries worldwide - from startups to Fortune 500 companies. Fintech, healthcare, education, retail, manufacturing, and more. Tailored solutions for every business size.',
    keywords: 'enterprise software solutions, startup technology services, fintech development, healthcare technology, retail automation, manufacturing digitization, Fortune 500 tech partner'
  },

  // Contact Pages
  {
    path: '/contact-us/sales',
    component: ContactSalesPage,
    title: 'Contact Sales | Get Quote | Business Solutions Consultation | Tepa Solutions',
    description: 'Ready to transform your business? Contact Tepa Solutions sales team for custom quotes, project consultation, and digital transformation planning. Free initial consultation available.',
    keywords: 'contact tech company, software development quote, digital transformation consultation, business solution quote, project estimation, technology consulting'
  },
  {
    path: '/contact-us/support',
    component: ContactSupportPage,
    title: 'Customer Support | Technical Help | Service Assistance | Tepa Solutions',
    description: 'Get expert technical support from Tepa Solutions team. Customer service, technical assistance, project support, and ongoing maintenance for your digital solutions.',
    keywords: 'technical support, customer service Philippines, software support, application maintenance, technical assistance'
  },

  {
    path: '/contact-us/event-hosting',
    component: ContactEventHostPage,
    title: 'Host Tech Event | Speaking Opportunities | Workshop Proposals | Tepa Solutions',
    description: 'Partner with Tepa Solutions to host tech events, workshops, and conferences. Speaking opportunities, venue partnerships, and collaborative educational programs.',
    keywords: 'tech event hosting, speaking opportunities Philippines, workshop partnerships, tech conference collaboration, developer events'
  },
  {
    path: '/contact-us/investors',
    component: ContactInvestorPage,
    title: 'Investor Relations Contact | Investment Inquiries | Funding Opportunities | Tepa Solutions',
    description: 'Connect with Tepa Solutions investor relations team. Investment opportunities, funding rounds, partnership inquiries, and financial information for potential investors.',
    keywords: 'startup investment contact, tech company funding, investor relations Philippines, venture capital inquiry, investment opportunities'
  },
  {
    path: '/contact-us/careers',
    component: ContactCareersPage,
    title: 'Apply for Jobs | Career Applications | Job Opportunities | Tepa Solutions',
    description: 'Apply for exciting career opportunities at Tepa Solutions. Submit your job application and join our growing team of passionate tech professionals.',
    keywords: 'job application form, career opportunities Philippines, tech job applications, software developer jobs, apply for tech jobs'
  }
];

// Router component
interface RouterProps {
  initialPath?: string;
}

export function Router({ initialPath }: RouterProps) {
  const [currentPath, setCurrentPath] = useState(initialPath || window.location.pathname);
  const [isLoading, setIsLoading] = useState(false);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigate function
  const navigate = (path: string, replace: boolean = false) => {
    if (path === currentPath) return;
    
    setIsLoading(true);
    
    // Update browser history
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    
    setCurrentPath(path);
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    setTimeout(() => setIsLoading(false), 100);
  };

  // Find matching route
  const findRoute = (path: string): RouteConfig | undefined => {
    // Handle dynamic routes
    if (path.startsWith('/articles/') && path.split('/').length === 3) {
      return routes.find(route => route.path === '/articles');
    }
    if (path.startsWith('/events/') && path.split('/').length === 3) {
      return routes.find(route => route.path === '/events');
    }
    if (path.startsWith('/careers/') && path.split('/').length === 3) {
      return routes.find(route => route.path === '/careers');
    }
    
    return routes.find(route => {
      if (route.exact) {
        return route.path === path;
      }
      return path.startsWith(route.path);
    }) || routes.find(route => route.path === '/404');
  };

  const currentRoute = findRoute(currentPath);
  
  if (!currentRoute) {
    return <NotFoundPage />;
  }

  const Component = currentRoute.component;

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={currentRoute.title}
        description={currentRoute.description}
        keywords={currentRoute.keywords}
        canonical={`https://tepasolutions.asia${currentPath}`}
        ogType="website"
        ogImage="https://tepasolutions.asia/images/og-tepa-solutions.jpg"
        author="Tepa Solutions"
        modifiedTime={new Date().toISOString()}
      />
      
      <Navigation navigate={navigate} currentPath={currentPath} />
      
      <main className="pt-16 flex-1" role="main">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          (() => {
            // Determine which component to render based on path
            if (currentPath.startsWith('/articles/') && currentPath.split('/').length === 3) {
              return <ArticlePage 
                navigate={navigate} 
                currentPath={currentPath}
                articleSlug={currentPath.split('/')[2]}
              />;
            }
            if (currentPath.startsWith('/events/') && currentPath.split('/').length === 3) {
              return <EventPage 
                navigate={navigate} 
                currentPath={currentPath}
                eventSlug={currentPath.split('/')[2]}
              />;
            }
            if (currentPath.startsWith('/careers/') && currentPath.split('/').length === 3) {
              return <JobPage 
                navigate={navigate} 
                currentPath={currentPath}
                jobSlug={currentPath.split('/')[2]}
              />;
            }
            
            return <Component 
              navigate={navigate} 
              currentPath={currentPath}
            />;
          })()
        )}
      </main>
      
      <Footer onNavigate={(section) => {
        if (section.startsWith('#')) {
          document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
        } else if (section.startsWith('/')) {
          navigate(section);
        } else {
          navigate(`/${section}`);
        }
      }} />
      
      <Toaster />
    </div>
  );
}

// Hook for navigation
export function useRouter() {
  const navigate = (path: string, replace: boolean = false) => {
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    
    // Trigger a popstate event to update the router
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return { navigate, currentPath: window.location.pathname };
}