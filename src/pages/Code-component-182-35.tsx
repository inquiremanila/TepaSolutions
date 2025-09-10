import { ServicePage } from '../components/ServicePages';

interface SalesAutomationPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function SalesAutomationPage({ navigate }: SalesAutomationPageProps) {
  const handleBack = () => {
    navigate('/business-automation');
  };

  return <ServicePage service="automation-sales" onBackToMain={handleBack} />;
}