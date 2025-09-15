import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import { navItems } from './data/navigation-data';

interface MobileNavigationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string, target: string) => void;
}

type NavigationLevel = 'main' | 'what-we-offer' | 'automation' | 'resources' | 'about' | 'contact';

export function MobileNavigationSheet({ isOpen, onClose, onAction }: MobileNavigationSheetProps) {
  const [currentLevel, setCurrentLevel] = useState<NavigationLevel>('main');

  const handleClose = () => {
    setCurrentLevel('main');
    onClose();
  };

  const handleServiceAction = (action: string, target: string) => {
    onAction(action, target);
    handleClose();
  };

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    handleClose();
  };

  const renderMainLevel = () => (
    <div className="space-y-2">
      {navItems.map((item) => (
        <div key={item.label}>
          {item.hasDropdown ? (
            <button
              onClick={() => {
                if (item.label === 'What we offer') setCurrentLevel('what-we-offer');
                else if (item.label === 'Resources') setCurrentLevel('resources');
                else if (item.label === 'About Tepa') setCurrentLevel('about');
              }}
              className="w-full flex items-center justify-between p-4 hover:bg-accent rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ) : (
            <button
              onClick={() => scrollToSection(item.href)}
              className="w-full flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">{item.label}</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const renderWhatWeOfferLevel = () => {
    const whatWeOfferItem = navItems.find(item => item.label === 'What we offer');
    if (!whatWeOfferItem?.dropdownItems) return null;

    return (
      <div className="space-y-2">
        {whatWeOfferItem.dropdownItems.map((item) => (
          <div key={item.label}>
            {item.action === 'expand' && item.subItems ? (
              <button
                onClick={() => setCurrentLevel('automation')}
                className="w-full flex items-center justify-between p-4 hover:bg-accent rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ) : (
              <button
                onClick={() => handleServiceAction(item.action, item.target)}
                className="w-full flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderResourcesLevel = () => {
    const resourcesItem = navItems.find(item => item.label === 'Resources');
    if (!resourcesItem?.dropdownItems) return null;

    return (
      <div className="space-y-2">
        {resourcesItem.dropdownItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleServiceAction(item.action, item.target)}
            className="w-full flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium">{item.label}</div>
              <div className="text-sm text-muted-foreground">{item.description}</div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderAboutLevel = () => {
    const aboutItem = navItems.find(item => item.label === 'About Tepa');
    if (!aboutItem?.dropdownItems) return null;

    return (
      <div className="space-y-2">
        {aboutItem.dropdownItems.map((item) => (
          <div key={item.label}>
            {item.action === 'expand' && item.subItems ? (
              <button
                onClick={() => setCurrentLevel('contact')}
                className="w-full flex items-center justify-between p-4 hover:bg-accent rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ) : (
              <button
                onClick={() => handleServiceAction(item.action, item.target)}
                className="w-full flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderContactLevel = () => {
    const aboutItem = navItems.find(item => item.label === 'About Tepa');
    const contactItem = aboutItem?.dropdownItems?.find(item => item.target === 'contact');
    if (!contactItem?.subItems) return null;

    return (
      <div className="space-y-2">
        {contactItem.subItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleServiceAction(item.action, item.target)}
            className="w-full flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium">{item.label}</div>
              <div className="text-sm text-muted-foreground">{item.description}</div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderAutomationLevel = () => {
    const whatWeOfferItem = navItems.find(item => item.label === 'What we offer');
    const automationItem = whatWeOfferItem?.dropdownItems?.find(item => item.target === 'automation');
    if (!automationItem?.subItems) return null;

    return (
      <div className="space-y-2">
        {automationItem.subItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleServiceAction(item.action, item.target)}
            className="w-full flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium">{item.label}</div>
              <div className="text-sm text-muted-foreground">{item.description}</div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const getTitle = () => {
    switch (currentLevel) {
      case 'what-we-offer': return 'What we offer';
      case 'automation': return 'Business Automation';
      case 'resources': return 'Resources';
      case 'about': return 'About Tepa';
      case 'contact': return 'Contact Us';
      default: return 'Menu';
    }
  };

  const canGoBack = currentLevel !== 'main';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l shadow-xl z-50 md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  {canGoBack && (
                    <button
                      onClick={() => {
                        if (currentLevel === 'automation') setCurrentLevel('what-we-offer');
                        else if (currentLevel === 'contact') setCurrentLevel('about');
                        else if (currentLevel === 'what-we-offer' || currentLevel === 'resources' || currentLevel === 'about') setCurrentLevel('main');
                      }}
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <h2 className="font-semibold">{getTitle()}</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentLevel}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {currentLevel === 'main' && renderMainLevel()}
                    {currentLevel === 'what-we-offer' && renderWhatWeOfferLevel()}
                    {currentLevel === 'automation' && renderAutomationLevel()}
                    {currentLevel === 'resources' && renderResourcesLevel()}
                    {currentLevel === 'about' && renderAboutLevel()}
                    {currentLevel === 'contact' && renderContactLevel()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-4 border-t">
                <div className="flex flex-col items-center gap-2">
                  <Logo size="sm" showText={true} />
                  <p className="text-sm text-muted-foreground">Digital Innovation Partner</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}