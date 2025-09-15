import type { RouteRecord } from 'vite-react-ssg'
import { useNavigate, useLocation } from 'react-router-dom'
import App from './App'

// Import all page components  
import { HomePage } from './pages/HomePage'
import { BusinessAutomationPage } from './pages/BusinessAutomationPage'
import { MobileAppDevelopmentPage } from './pages/MobileAppDevelopmentPage'
import { WebApplicationDevelopmentPage } from './pages/WebApplicationDevelopmentPage'
import { WebsiteDevelopmentPage } from './pages/WebsiteDevelopmentPage'
import { SEOServicesPage } from './pages/SEOServicesPage'
import { SalesAutomationPage } from './pages/SalesAutomationPage'
import { MarketingAutomationPage } from './pages/MarketingAutomationPage'
import { SupportAutomationPage } from './pages/SupportAutomationPage'
import { HRAutomationPage } from './pages/HRAutomationPage'
import { FinanceAutomationPage } from './pages/FinanceAutomationPage'
import { InventoryAutomationPage } from './pages/InventoryAutomationPage'
import { AboutPage } from './pages/AboutPage'
import { CareersPage } from './pages/CareersPage'
import { EventsPage } from './pages/EventsPage'
import { ArticlesPage } from './pages/ArticlesPage'
import { InvestorsPage } from './pages/InvestorsPage'
import { WhoWeServePage } from './pages/WhoWeServePage'
import { VolunteerPage } from './pages/VolunteerPage'
import { ContactSalesPage } from './pages/ContactSalesPage'
import { ContactSupportPage } from './pages/ContactSupportPage'
import { ContactEventHostPage } from './pages/ContactEventHostPage'
import { ContactInvestorPage } from './pages/ContactInvestorPage'
import { ContactCareersPage } from './pages/ContactCareersPage'
import { ArticlePage } from './pages/ArticlePage'
import { EventPage } from './pages/EventPage'
import { JobPage } from './pages/JobPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Import article/event/job data for static path generation
import { articles } from './data/articles-data'
import { events } from './data/events-data'
import { jobPositions } from './data/careers-data'

// Navigation adapter for components that require navigate/currentPath props
const withNav = (Comp: any) => () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return <Comp navigate={navigate} currentPath={pathname} />
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    children: [
      // Homepage
      {
        index: true,
        Component: withNav(HomePage),
      },
      
      // Main Services
      {
        path: 'business-automation',
        Component: withNav(BusinessAutomationPage),
      },
      {
        path: 'mobile-app-development',
        Component: withNav(MobileAppDevelopmentPage),
      },
      {
        path: 'web-application-development',
        Component: withNav(WebApplicationDevelopmentPage),
      },
      {
        path: 'website-development',
        Component: withNav(WebsiteDevelopmentPage),
      },
      {
        path: 'seo-services',
        Component: withNav(SEOServicesPage),
      },
      
      // Automation Sub-services
      {
        path: 'business-automation/sales-process-automation',
        Component: withNav(SalesAutomationPage),
      },
      {
        path: 'business-automation/marketing-automation',
        Component: withNav(MarketingAutomationPage),
      },
      {
        path: 'business-automation/customer-support-automation',
        Component: withNav(SupportAutomationPage),
      },
      {
        path: 'business-automation/hr-automation',
        Component: withNav(HRAutomationPage),
      },
      {
        path: 'business-automation/finance-automation',
        Component: withNav(FinanceAutomationPage),
      },
      {
        path: 'business-automation/inventory-management-automation',
        Component: withNav(InventoryAutomationPage),
      },
      
      // Company Pages
      {
        path: 'learn-about-tepa',
        Component: withNav(AboutPage),
      },
      {
        path: 'careers',
        Component: withNav(CareersPage),
      },
      {
        path: 'volunteer-with-us',
        Component: withNav(VolunteerPage),
      },
      {
        path: 'events',
        Component: withNav(EventsPage),
      },
      {
        path: 'articles',
        Component: withNav(ArticlesPage),
      },
      {
        path: 'investors',
        Component: withNav(InvestorsPage),
      },
      {
        path: 'who-we-serve',
        Component: withNav(WhoWeServePage),
      },
      
      // Contact Pages
      {
        path: 'contact-us/sales',
        Component: withNav(ContactSalesPage),
      },
      {
        path: 'contact-us/support',
        Component: withNav(ContactSupportPage),
      },
      {
        path: 'contact-us/event-hosting',
        Component: withNav(ContactEventHostPage),
      },
      {
        path: 'contact-us/investors',
        Component: withNav(ContactInvestorPage),
      },
      {
        path: 'contact-us/careers',
        Component: withNav(ContactCareersPage),
      },
      
      // Dynamic Routes with SSG
      {
        path: 'articles/:slug',
        Component: withNav(ArticlePage),
        getStaticPaths: () => {
          return articles.map(article => `articles/${article.slug}`)
        },
      },
      {
        path: 'events/:slug',
        Component: withNav(EventPage),
        getStaticPaths: () => {
          return events.map(event => `events/${event.slug}`)
        },
      },
      {
        path: 'careers/:slug',
        Component: withNav(JobPage),
        getStaticPaths: () => {
          return jobPositions.map((job: any) => `careers/${job.slug}`)
        },
      },
      
      // 404 Page
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]