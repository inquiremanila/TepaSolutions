import { Hero } from '../components/OtherComponent/Hero';
import { Services } from '../components/OtherComponent/Services';
import { Portfolio } from '../components/OtherComponent/Portfolio';
import { Skills } from '../components/OtherComponent/Skills';
import { Contact } from '../components/Forms/Contact';

interface HomePageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function HomePage({ navigate }: HomePageProps) {
  return (
    <div>
      <Hero />
      <Services />
      <Portfolio />
      <Skills />
      <Contact />
    </div>
  );
}