import { ServicePage } from '../src/components/ServicePages';

interface MobileAppDevelopmentPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function MobileAppDevelopmentPage({ navigate }: MobileAppDevelopmentPageProps) {
  const handleBack = () => {
    navigate('/');
  };

  return <ServicePage service="app-dev" onBackToMain={handleBack} />;
}