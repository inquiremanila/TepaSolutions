import { ServicePage } from '../components/ServicePages';

interface HRAutomationPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function HRAutomationPage({ navigate }: HRAutomationPageProps) {
  const handleBack = () => {
    navigate('/business-automation');
  };

  return <ServicePage service="automation-hr" onBackToMain={handleBack} />;
}