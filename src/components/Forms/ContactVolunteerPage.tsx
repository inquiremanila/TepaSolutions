import { ContactForms } from './ContactForms';

interface ContactVolunteerPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function ContactVolunteerPage({ navigate }: ContactVolunteerPageProps) {
  const handleBack = () => {
    navigate('/');
  };

  return <ContactForms formType="volunteer" onBack={handleBack} />;
}