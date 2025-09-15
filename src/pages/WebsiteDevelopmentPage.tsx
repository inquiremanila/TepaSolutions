import { ServicePage } from '../components/OtherComponent/ServicePages';

interface WebsiteDevelopmentPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function WebsiteDevelopmentPage({ navigate }: WebsiteDevelopmentPageProps) {
  const handleBack = () => {
    navigate('/');
  };

  return <ServicePage service="web-dev" onBackToMain={handleBack} />;
}