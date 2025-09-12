import { ContactForms } from '../components/form1-contact-forms';

interface ContactInvestorPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function ContactInvestorPage({ navigate }: ContactInvestorPageProps) {
  const handleBack = () => {
    navigate('/');
  };

  return <ContactForms formType="investor" onBack={handleBack} />;
}