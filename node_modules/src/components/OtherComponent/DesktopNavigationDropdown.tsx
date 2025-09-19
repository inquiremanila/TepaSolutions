import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface SubItem {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
  target: string;
}

interface DropdownItem {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
  target: string;
  subItems?: SubItem[];
}

interface DesktopNavigationDropdownProps {
  items: DropdownItem[];
  onAction: (action: string, target: string) => void;
  onClose: () => void;
}

export function DesktopNavigationDropdown({ items, onAction, onClose }: DesktopNavigationDropdownProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<{ top: number; left: number } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoveredItemRef = useRef<HTMLButtonElement>(null);

  // Calculate submenu position
  useEffect(() => {
    if (hoveredItem && hoveredItemRef.current && dropdownRef.current) {
      const itemRect = hoveredItemRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      
      setSubmenuPosition({
        top: itemRect.top - dropdownRect.top,
        left: dropdownRect.width - 1 // Position submenu to the right of dropdown
      });
    } else {
      setSubmenuPosition(null);
    }
  }, [hoveredItem]);

  const handleItemClick = (item: DropdownItem) => {
    if (item.action === 'expand' && item.subItems) {
      // For desktop, we handle expand on hover, not click
      return;
    }
    onAction(item.action, item.target);
    onClose();
  };

  const handleSubItemClick = (subItem: SubItem) => {
    onAction(subItem.action, subItem.target);
    onClose();
  };

  const getHoveredSubItems = () => {
    if (!hoveredItem) return null;
    const item = items.find(item => item.target === hoveredItem);
    return item?.subItems || null;
  };

  return (
    <motion.div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-2 bg-background border rounded-lg shadow-xl z-50 min-w-96 max-w-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div className="p-2">
        {items.map((item) => (
          <div key={item.label} className="relative">
            <button
              ref={hoveredItem === item.target ? hoveredItemRef : null}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => {
                if (item.subItems && item.action === 'expand') {
                  setHoveredItem(item.target);
                } else {
                  setHoveredItem(null);
                }
              }}
              className="w-full flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {item.description}
                  </div>
                </div>
              </div>
              {item.subItems && item.action === 'expand' && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Submenu */}
      <AnimatePresence>
        {hoveredItem && submenuPosition && (
          <motion.div
            className="absolute bg-background border rounded-lg shadow-xl min-w-80 z-10"
            style={{
              top: submenuPosition.top,
              left: submenuPosition.left
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={() => setHoveredItem(hoveredItem)} // Keep submenu open
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="p-2">
              <div className="px-3 py-2 border-b mb-2">
                <h3 className="font-medium text-sm text-primary">Business Automation</h3>
                <p className="text-xs text-muted-foreground">Specialized automation solutions</p>
              </div>
              {getHoveredSubItems()?.map((subItem) => (
                <button
                  key={subItem.label}
                  onClick={() => handleSubItemClick(subItem)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-accent rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <subItem.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{subItem.label}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {subItem.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}