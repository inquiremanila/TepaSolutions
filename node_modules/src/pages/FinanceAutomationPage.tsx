import { ServicePage } from '../components/OtherComponent/ServicePages';

interface FinanceAutomationPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function FinanceAutomationPage({ navigate }: FinanceAutomationPageProps) {
  const handleBack = () => {
    navigate('/business-automation');
  };

  return <ServicePage service="automation-finance" onBackToMain={handleBack} />;
}