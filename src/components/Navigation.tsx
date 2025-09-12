import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { navItems } from './data/navigation-data';
import { MobileNavigationSheet } from './MobileNavigationSheet';
import { NavigationDropdown } from './NavigationDropdown';

interface NavigationProps {
  navigate?: (path: string) => void;
  currentPath?: string;
}

export function Navigation({ navigate, currentPath }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDesktopDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceAction = (action: string, target: string) => {
    if (action === "navigate") {
      if (navigate) {
        // Use the new routing system
        const pathMap: Record<string, string> = {
          'home': '/',
          'automation': '/business-automation',
          'app-dev': '/mobile-app-development',
          'web-app': '/web-application-development',
          'web-dev': '/website-development',
          'seo': '/seo-services',
          'automation-sales': '/business-automation/sales-process-automation',
          'automation-marketing': '/business-automation/marketing-automation',
          'automation-support': '/business-automation/customer-support-automation',
          'automation-hr': '/business-automation/hr-automation',
          'automation-finance': '/business-automation/finance-automation',
          'automation-inventory': '/business-automation/inventory-management-automation',
          'about-company': '/learn-about-tepa',
          'careers': '/careers',
          'events': '/events',
          'articles': '/articles',
          'investors': '/investors',
          'who-we-serve': '/who-we-serve',
          'contact-sales': '/contact-us/sales',
          'contact-support': '/contact-us/support',
          'contact-volunteer': '/volunteer-with-us',
          'contact-event-host': '/contact-us/event-hosting',
          'contact-investor': '/contact-us/investors'
        };
        
        const path = pathMap[target] || `/${target}`;
        navigate(path);
      } else {
        // Fallback to old event system for backward compatibility
        if (target === "automation") {
          window.dispatchEvent(new CustomEvent('navigateToAutomation'));
        } else if (target.startsWith('automation-')) {
          window.dispatchEvent(new CustomEvent('navigateToAutomation', { detail: target }));
        } else {
          window.dispatchEvent(new CustomEvent('navigateToService', { detail: target }));
        }
      }
    }
    setActiveDesktopDropdown(null);
  };

  const handleLogoClick = () => {
    if (navigate) {
      navigate('/');
    } else {
      window.dispatchEvent(new CustomEvent('navigateToService', { detail: 'home' }));
    }
  };

  const handleContactClick = () => {
    if (currentPath === '/') {
      scrollToSection("#contact");
    } else if (navigate) {
      navigate('/contact-us/sales');
    } else {
      scrollToSection("#contact");
    }
  };

  // Desktop dropdown handlers with hover delay
  const handleDesktopDropdownEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDesktopDropdown(label);
  };

  const handleDesktopDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDesktopDropdown(null);
    }, 150); // Small delay to allow moving to dropdown
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    setActiveDesktopDropdown(null);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-lg border-b shadow-sm' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo 
              size="md" 
              showText={true} 
              onClick={handleLogoClick}
            />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.hasDropdown ? (
                    <div
                      ref={activeDesktopDropdown === item.label ? dropdownRef : null}
                      onMouseEnter={() => handleDesktopDropdownEnter(item.label)}
                      onMouseLeave={handleDesktopDropdownLeave}
                    >
                      <button
                        className="flex items-center gap-1 px-4 py-2 hover:text-primary transition-colors"
                      >
                        {item.label}
                        <ChevronDown className="w-3 h-3" />
                      </button>

                      {/* Desktop Dropdown - Positioned absolutely below nav */}
                      <AnimatePresence>
                        {activeDesktopDropdown === item.label && (
                          <div 
                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
                            onMouseEnter={handleDropdownMouseEnter}
                            onMouseLeave={handleDropdownMouseLeave}
                          >
                            <motion.div
                              className="bg-background/95 backdrop-blur-lg border rounded-xl shadow-2xl overflow-hidden"
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                            >
                              <NavigationDropdown
                                items={item.dropdownItems || []}
                                onAction={handleServiceAction}
                                isMobile={false}
                              />
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center gap-2 px-4 py-2 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={handleContactClick}
              >
                Contact Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Sheet */}
      <MobileNavigationSheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onAction={handleServiceAction}
      />
    </>
  );
}