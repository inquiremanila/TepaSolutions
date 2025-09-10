import { ServicePage } from '../components/ServicePages';

interface SupportAutomationPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function SupportAutomationPage({ navigate }: SupportAutomationPageProps) {
  const handleBack = () => {
    navigate('/business-automation');
  };

  return <ServicePage service="automation-support" onBackToMain={handleBack} />;
}