import { ContactForms } from '../components/ContactForms';

interface ContactSupportPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function ContactSupportPage({ navigate }: ContactSupportPageProps) {
  const handleBack = () => {
    navigate('/');
  };

  return <ContactForms formType="support" onBack={handleBack} />;
}