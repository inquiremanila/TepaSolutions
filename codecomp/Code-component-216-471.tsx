import { ContactForms } from '../src/components/ContactForms';

interface ContactEventHostPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function ContactEventHostPage({ navigate }: ContactEventHostPageProps) {
  const handleBack = () => {
    navigate('/');
  };

  return <ContactForms formType="event-host" onBack={handleBack} />;
}