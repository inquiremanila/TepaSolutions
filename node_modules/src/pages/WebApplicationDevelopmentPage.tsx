import { ServicePage } from '../components/OtherComponent/ServicePages';

interface WebApplicationDevelopmentPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function WebApplicationDevelopmentPage({ navigate }: WebApplicationDevelopmentPageProps) {
  const handleBack = () => {
    navigate('/');
  };

  return <ServicePage service="web-app" onBackToMain={handleBack} />;
}