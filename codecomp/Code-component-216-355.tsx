import { Hero } from '../src/components/Hero';
import { Services } from '../src/components/Services';
import { Portfolio } from '../src/components/Portfolio';
import { Skills } from '../src/components/Skills';
import { Contact } from '../src/components/Contact';

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