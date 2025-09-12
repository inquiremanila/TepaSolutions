import { ContactForms } from '../components/form1-contact-forms';

interface ContactSalesPageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function ContactSalesPage({ navigate }: ContactSalesPageProps) {
  const handleBack = () => {
    navigate('/');
  };

  return <ContactForms formType="sales" onBack={handleBack} />;
}