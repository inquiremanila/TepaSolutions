import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';

export interface DropdownItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  action: string;
  target: string;
  subItems?: DropdownItem[];
}

interface NavigationDropdownProps {
  items: DropdownItem[];
  onAction: (action: string, target: string) => void;
  isMobile: boolean;
}

interface NavigationDropdownProps {
  items: DropdownItem[];
  onAction: (action: string, target: string) => void;
  isMobile: boolean;
  mobileSubMenu?: string | null;
  onMobileSubMenuToggle?: (target: string | null) => void;
}

export function NavigationDropdown({
  items,
  onAction,
  isMobile,
  mobileSubMenu = null,
  onMobileSubMenuToggle
}: NavigationDropdownProps) {
  // Desktop hover state only
  const [desktopHoveredItem, setDesktopHoveredItem] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Desktop hover handlers
  const handleDesktopItemHover = useCallback((item: DropdownItem) => {
    if (item.subItems && item.action === "expand") {
      setDesktopHoveredItem(item.target);
    }
  }, []);

  const handleDesktopItemLeave = useCallback(() => {
    setDesktopHoveredItem(null);
  }, []);

  const handleItemClick = useCallback((item: DropdownItem) => {
    if (item.action === "expand" && item.subItems) {
      if (isMobile && onMobileSubMenuToggle) {
        // Mobile: toggle submenu via parent component
        const newTarget = mobileSubMenu === item.target ? null : item.target;
        onMobileSubMenuToggle(newTarget);
      }
      // Desktop: no click action for expandable items (hover handled)
    } else {
      // Regular navigation action
      onAction(item.action, item.target);
    }
  }, [isMobile, onAction, mobileSubMenu, onMobileSubMenuToggle]);

  // Mobile Component - Nested submenu under parent
  if (isMobile) {
    return (
      <div className="p-2 space-y-1">
        {items.map((item, index) => (
          <div key={item.label}>
            {item.subItems ? (
              <>
                {/* Mobile Parent Item with submenu */}
                <motion.button
                  onClick={() => handleItemClick(item)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-accent rounded-lg transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">
                        {item.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: mobileSubMenu === item.target ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </motion.button>

                {/* Mobile Nested Submenu - appears under parent */}
                <AnimatePresence>
                  {mobileSubMenu === item.target && (
                    <motion.div
                      className="ml-6 border-l-2 border-border/30 pl-3 space-y-1 mt-1"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <motion.button
                          key={subItem.label}
                          onClick={() => onAction(subItem.action, subItem.target)}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors text-left"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (subIndex * 0.05) }}
                        >
                          <div className="w-6 h-6 rounded bg-primary/5 flex items-center justify-center flex-shrink-0">
                            <subItem.icon className="w-3 h-3 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground text-xs">
                              {subItem.label}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-1">
                              {subItem.description}
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              /* Mobile Regular Item */
              <motion.button
                onClick={() => handleItemClick(item)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">
                    {item.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              </motion.button>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Desktop Component - Wider dropdown with submenu at same level
  return (
    <div 
      className="flex" 
      ref={containerRef}
      style={{ 
        minWidth: '800px', 
        maxWidth: 'min(90vw, 1000px)',
        width: '800px'
      }}
    >
      {/* Main Services Panel */}
      <div className="p-4 flex-1 min-w-96">
        {items.map((item, index) => (
          <div key={item.label} className="relative">
            {item.subItems ? (
              /* Desktop Parent Item with hover submenu */
              <motion.div
                onMouseEnter={() => handleDesktopItemHover(item)}
                onMouseLeave={handleDesktopItemLeave}
              >
                <motion.button
                  onClick={() => handleItemClick(item)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground flex items-center justify-between">
                      <span>{item.label}</span>
                      <ChevronRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                      {item.description}
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            ) : (
              /* Desktop Regular Item */
              <motion.button
                onClick={() => handleItemClick(item)}
                className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {item.label}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                    {item.description}
                  </div>
                </div>
              </motion.button>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Submenu Panel - Same level as main menu */}
      <AnimatePresence>
        {desktopHoveredItem && (
          <motion.div
            className="border-l border-border/50 flex-1 min-w-96 bg-popover/50 backdrop-blur-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={() => setDesktopHoveredItem(desktopHoveredItem)}
            onMouseLeave={handleDesktopItemLeave}
          >
            {items.map((item) => {
              if (item.target === desktopHoveredItem && item.subItems) {
                return (
                  <div key={item.target} className="p-4">
                    {item.subItems.map((subItem, subIndex) => (
                      <motion.button
                        key={subItem.label}
                        onClick={() => onAction(subItem.action, subItem.target)}
                        className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: subIndex * 0.03 }}
                        whileHover={{ x: 4 }}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <subItem.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground truncate">
                            {subItem.label}
                          </div>
                          <div className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                            {subItem.description}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}