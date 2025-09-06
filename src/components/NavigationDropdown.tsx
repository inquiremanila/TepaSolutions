import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface SubItem {
  label: string;
  description: string;
  icon: any;
  action: string;
  target: string;
}

interface DropdownItem {
  label: string;
  description: string;
  icon: any;
  action: string;
  target: string;
  subItems?: SubItem[];
}

interface NavigationDropdownProps {
  items: DropdownItem[];
  onAction: (action: string, target: string) => void;
  isMobile?: boolean;
}

export function NavigationDropdown({ items, onAction, isMobile = false }: NavigationDropdownProps) {
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [subDropdownPosition, setSubDropdownPosition] = useState({ top: 0, left: 0 });
  const [showSubView, setShowSubView] = useState(false);
  const [currentSubItems, setCurrentSubItems] = useState<SubItem[]>([]);
  const [currentSubTitle, setCurrentSubTitle] = useState('');
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleItemClick = (item: DropdownItem) => {
    if (item.action === "expand" && item.subItems) {
      if (isMobile) {
        // Mobile: transition to subview
        setCurrentSubItems(item.subItems);
        setCurrentSubTitle(item.label);
        setShowSubView(true);
      } else {
        // Desktop: don't toggle on click, let hover handle it
        return;
      }
    } else {
      onAction(item.action, item.target);
    }
  };

  const handleBackToMain = () => {
    setShowSubView(false);
    setCurrentSubItems([]);
    setCurrentSubTitle('');
  };

  const handleItemHover = (item: DropdownItem) => {
    if (!isMobile && item.action === "expand" && item.subItems) {
      const itemElement = itemRefs.current[item.target];
      const parentContainer = itemElement?.closest('.p-2'); // Find the parent dropdown container
      if (itemElement && parentContainer) {
        const rect = itemElement.getBoundingClientRect();
        const parentRect = parentContainer.getBoundingClientRect();
        
        // Position subgroup to start at the same level as the first service item
        setSubDropdownPosition({
          top: 0, // Start at the very top of the parent dropdown container
          left: parentRect.width
        });
      }
      setHoveredItem(item.target);
      setActiveSubDropdown(item.target);
    }
  };

  const handleItemLeave = () => {
    if (!isMobile) {
      setHoveredItem(null);
      // Don't immediately close, let the submenu handle its own hover
    }
  };

  // Mobile: Show subview if active
  if (isMobile && showSubView) {
    return (
      <motion.div 
        className="p-2"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Back button */}
        <motion.button
          onClick={handleBackToMain}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left mb-2 border-b border-border/50"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Back</span>
        </motion.button>

        {/* Sub-items */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground mb-3 px-3">
            {currentSubTitle}
          </div>
          {currentSubItems.map((subItem, subIndex) => (
            <motion.button
              key={subItem.label}
              onClick={() => onAction(subItem.action, subItem.target)}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: subIndex * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <subItem.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">
                  {subItem.label}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {subItem.description}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-2 relative">
      {items.map((dropdownItem, dropdownIndex) => (
        <div key={dropdownItem.label} className="relative">
          {dropdownItem.subItems ? (
            <>
              <motion.div
                ref={el => itemRefs.current[dropdownItem.target] = el}
                className="relative"
                onMouseEnter={() => handleItemHover(dropdownItem)}
                onMouseLeave={handleItemLeave}
              >
                <motion.button
                  onClick={() => handleItemClick(dropdownItem)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: dropdownIndex * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <dropdownItem.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground flex items-center justify-between">
                      {dropdownItem.label}
                      <ChevronRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">
                      {dropdownItem.description}
                    </div>
                  </div>
                </motion.button>
              </motion.div>

              {/* Desktop Sub-dropdown (positioned to the right) */}
              {!isMobile && (
                <AnimatePresence>
                  {activeSubDropdown === dropdownItem.target && (
                    <motion.div
                      className="absolute z-50 w-80 bg-background border rounded-lg shadow-lg"
                      style={{
                        top: subDropdownPosition.top,
                        left: subDropdownPosition.left,
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setActiveSubDropdown(dropdownItem.target)}
                      onMouseLeave={() => setActiveSubDropdown(null)}
                    >
                      <div className="p-2">
                        {dropdownItem.subItems.map((subItem, subIndex) => (
                          <motion.button
                            key={subItem.label}
                            onClick={() => onAction(subItem.action, subItem.target)}
                            className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.03 }}
                            whileHover={{ x: 4 }}
                          >
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <subItem.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-foreground">
                                {subItem.label}
                              </div>
                              <div className="text-sm text-muted-foreground mt-0.5">
                                {subItem.description}
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </>
          ) : (
            <motion.button
              onClick={() => onAction(dropdownItem.action, dropdownItem.target)}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: dropdownIndex * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <dropdownItem.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">
                  {dropdownItem.label}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {dropdownItem.description}
                </div>
              </div>
            </motion.button>
          )}
        </div>
      ))}
    </div>
  );
}