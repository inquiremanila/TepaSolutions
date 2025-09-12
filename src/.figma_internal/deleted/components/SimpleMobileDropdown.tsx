import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight } from 'lucide-react';

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

interface SimpleMobileDropdownProps {
  items: DropdownItem[];
  onAction: (action: string, target: string) => void;
  onClose: () => void;
}

export function SimpleMobileDropdown({ items, onAction, onClose }: SimpleMobileDropdownProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleItemClick = (item: DropdownItem) => {
    if (item.subItems && item.action === "expand") {
      // Toggle expansion
      setExpandedItem(expandedItem === item.target ? null : item.target);
    } else {
      // Navigate
      onAction(item.action, item.target);
      onClose();
    }
  };

  const handleSubItemClick = (subItem: SubItem) => {
    onAction(subItem.action, subItem.target);
    onClose();
  };

  return (
    <div className="bg-background border-t border-border">
      {items.map((item) => (
        <div key={item.label}>
          {/* Main Item */}
          <button
            onClick={() => handleItemClick(item)}
            className="w-full flex items-center justify-between p-4 hover:bg-accent transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">
                  {item.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.description}
                </div>
              </div>
            </div>
            {item.subItems && (
              <motion.div
                animate={{ rotate: expandedItem === item.target ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            )}
          </button>

          {/* Sub Items */}
          {item.subItems && (
            <AnimatePresence>
              {expandedItem === item.target && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-muted/30"
                >
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.label}
                      onClick={() => handleSubItemClick(subItem)}
                      className="w-full flex items-center gap-3 p-4 pl-12 hover:bg-accent/50 transition-colors border-l-2 border-primary/20 ml-4"
                    >
                      <div className="w-6 h-6 rounded bg-primary/5 flex items-center justify-center">
                        <subItem.icon className="w-3 h-3 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-foreground text-sm">
                          {subItem.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {subItem.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ))}
    </div>
  );
}