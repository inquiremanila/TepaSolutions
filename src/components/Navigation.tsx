import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Code, 
  Menu, 
  X, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { navItems } from './data/navigation-data';
import { NavigationDropdown } from './NavigationDropdown';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleServiceAction = (action: string, target: string) => {
    if (action === "navigate") {
      if (target === "automation") {
        window.dispatchEvent(new CustomEvent('navigateToAutomation'));
      } else if (target.startsWith('automation-')) {
        window.dispatchEvent(new CustomEvent('navigateToAutomation', { detail: target }));
      } else {
        window.dispatchEvent(new CustomEvent('navigateToService', { detail: target }));
      }
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-lg border-b shadow-sm' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection("#")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <Code className="size-5" />
              </div>
              <span className="text-xl">Tepa Solutions</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8" ref={dropdownRef}>
              {navItems.map((item, index) => (
                <div key={item.label} className="relative">
                  {item.hasDropdown ? (
                    <>
                      <motion.button
                        onClick={() => toggleDropdown(item.label)}
                        className="text-muted-foreground hover:text-foreground transition-colors relative group flex items-center gap-1"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -2 }}
                      >
                        {item.label}
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                          }`} 
                        />
                        <motion.div
                          className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            className="absolute top-full left-0 mt-2 w-96 bg-background border rounded-lg shadow-lg z-50"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <NavigationDropdown 
                              items={item.dropdownItems || []} 
                              onAction={handleServiceAction} 
                              isMobile={false}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.button
                      onClick={() => scrollToSection(item.href)}
                      className="text-muted-foreground hover:text-foreground transition-colors relative group"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      {item.label}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Badge variant="secondary" className="animate-pulse">
                Available
              </Badge>
              <Button 
                onClick={() => scrollToSection("#contact")}
                className="group"
              >
                <ArrowRight className="size-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Start Project
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-40 md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        <motion.div
          className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: isMobileMenuOpen ? 0 : -20, 
            opacity: isMobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-6 py-6">
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                    <>
                      <motion.button
                        onClick={() => toggleDropdown(`mobile-${item.label}`)}
                        className="flex items-center justify-between w-full p-3 text-left hover:bg-accent rounded-lg transition-colors"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ 
                          x: isMobileMenuOpen ? 0 : -20, 
                          opacity: isMobileMenuOpen ? 1 : 0 
                        }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="size-5 text-muted-foreground" />
                          {item.label}
                        </div>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === `mobile-${item.label}` ? 'rotate-180' : ''
                          }`} 
                        />
                      </motion.button>

                      {/* Mobile Dropdown Items */}
                      <AnimatePresence>
                        {activeDropdown === `mobile-${item.label}` && (
                          <motion.div
                            className="ml-8 mt-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <NavigationDropdown 
                              items={item.dropdownItems || []} 
                              onAction={handleServiceAction} 
                              isMobile={true}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.button
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center gap-3 w-full p-3 text-left hover:bg-accent rounded-lg transition-colors"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ 
                        x: isMobileMenuOpen ? 0 : -20, 
                        opacity: isMobileMenuOpen ? 1 : 0 
                      }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <item.icon className="size-5 text-muted-foreground" />
                      {item.label}
                    </motion.button>
                  )}
                </div>
              ))}
              
              <motion.div
                className="pt-4 border-t"
                initial={{ x: -20, opacity: 0 }}
                animate={{ 
                  x: isMobileMenuOpen ? 0 : -20, 
                  opacity: isMobileMenuOpen ? 1 : 0 
                }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <Button 
                  className="w-full group"
                  onClick={() => scrollToSection("#contact")}
                >
                  <ArrowRight className="size-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Start Project
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}