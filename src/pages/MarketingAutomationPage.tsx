import { ServicePage } from '../components/OtherComponent/ServicePages';

interface MarketingAutomationPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function MarketingAutomationPage({ navigate }: MarketingAutomationPageProps) {
  const handleBack = () => {
    navigate('/business-automation');
  };

  return <ServicePage service="automation-marketing" onBackToMain={handleBack} />;
}