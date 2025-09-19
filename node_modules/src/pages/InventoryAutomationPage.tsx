import { ServicePage } from '../components/OtherComponent/ServicePages';

interface InventoryAutomationPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function InventoryAutomationPage({ navigate }: InventoryAutomationPageProps) {
  const handleBack = () => {
    navigate('/business-automation');
  };

  return <ServicePage service="automation-inventory" onBackToMain={handleBack} />;
}