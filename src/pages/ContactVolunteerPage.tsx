import { ContactForms } from '../components/form1-contact-forms';

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