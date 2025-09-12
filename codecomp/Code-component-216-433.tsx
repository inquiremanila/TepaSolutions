import { ServicePage } from '../src/components/ServicePages';

interface SEOServicesPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function SEOServicesPage({ navigate }: SEOServicesPageProps) {
  const handleBack = () => {
    navigate('/');
  };

  return <ServicePage service="seo" onBackToMain={handleBack} />;
}