import { AutomationPage } from '../components/AutomationPage';

interface BusinessAutomationPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function BusinessAutomationPage({ navigate }: BusinessAutomationPageProps) {
  const handleBackToMain = () => {
    navigate('/');
  };

  return <AutomationPage onBackToMain={handleBackToMain} navigate={navigate} />;
}