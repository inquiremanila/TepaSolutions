import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Portfolio } from '../components/Portfolio';
import { Skills } from '../components/Skills';
import { Contact } from '../components/Contact';

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