import { Phone, Mail, MapPin, ExternalLink, Facebook, Linkedin } from 'lucide-react';
import { Button } from '../ui/button';
import { Logo } from './Logo';
import exampleImage from 'figma:asset/730ea04e583f770efc56f1b8808444632b232c5f.png';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigate = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      // Default scroll behavior
      if (section.startsWith('#')) {
        document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 w-full">
          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleNavigate('contact-sales')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Talk to Sales — <span className="text-primary font-medium">63285581237</span>
              </button>
              <button
                onClick={() => handleNavigate('contact-support')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Get Support
              </button>
            </div>
          </div>

          {/* What We Offer */}
          <div>
            <h3 className="font-semibold mb-4">What We Offer</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleNavigate('automation')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Business Automation
              </button>
              <button
                onClick={() => handleNavigate('app-dev')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Mobile App Development
              </button>
              <button
                onClick={() => handleNavigate('web-app')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Web Application Development
              </button>
              <button
                onClick={() => handleNavigate('web-dev')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Website Development
              </button>
              <button
                onClick={() => handleNavigate('seo')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                SEO Solutions
              </button>
            </div>
          </div>

          {/* Who We Serve */}
          <div>
            <h3 className="font-semibold mb-4">Who We Serve</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleNavigate('business-size')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Business Size
              </button>
              <button
                onClick={() => handleNavigate('industry')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Industry
              </button>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleNavigate('articles')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Articles & Insights
              </button>
              <button
                onClick={() => handleNavigate('events')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Events
              </button>
            </div>
          </div>

          {/* About Tepa */}
          <div>
            <h3 className="font-semibold mb-4">About Tepa</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleNavigate('about-company')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Office Locations
              </button>
              <button
                onClick={() => handleNavigate('careers')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Careers
              </button>
              <button
                onClick={() => handleNavigate('investors')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Investors
              </button>
              <button
                onClick={() => handleNavigate('contact-sales')}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo and Social */}
            <div className="flex items-center gap-6">
              <Logo size="md" showText={true} />
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p>© 2025 Tepa Solutions. All rights reserved.</p>
              <p className="mt-1">Empowering businesses through innovative digital solutions</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}