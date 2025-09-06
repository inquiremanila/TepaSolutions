import { 
  Home, 
  Briefcase, 
  FolderOpen,
  Bot, 
  Mail,
  Smartphone,
  Globe,
  Monitor,
  Search,
  Cog,
  LucideIcon,
  TrendingUp,
  Headphones,
  Megaphone,
  DollarSign,
  Users,
  Package
} from 'lucide-react';

interface SubItem {
  label: string;
  description: string;
  icon: LucideIcon;
  action: string;
  target: string;
}

interface DropdownItem {
  label: string;
  description: string;
  icon: LucideIcon;
  action: string;
  target: string;
  subItems?: SubItem[];
}

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#", icon: Home },
  { 
    label: "Services", 
    href: "#services", 
    icon: Briefcase,
    hasDropdown: true,
    dropdownItems: [
      { 
        label: "Mobile App Development", 
        description: "Native & cross-platform mobile apps",
        icon: Smartphone, 
        action: "navigate",
        target: "app-dev"
      },
      { 
        label: "Web Application Development", 
        description: "Full-stack web applications",
        icon: Monitor, 
        action: "navigate",
        target: "web-app"
      },
      { 
        label: "Website Development", 
        description: "Modern responsive websites",
        icon: Globe, 
        action: "navigate",
        target: "web-dev"
      },
      { 
        label: "SEO Solutions", 
        description: "Search engine optimization",
        icon: Search, 
        action: "navigate",
        target: "seo"
      },
      { 
        label: "Business Automation", 
        description: "Workflow & process automation solutions",
        icon: Cog, 
        action: "expand",
        target: "automation",
        subItems: [
          {
            label: "Sales Process Automation",
            description: "End-to-end sales funnel automation",
            icon: TrendingUp,
            action: "navigate",
            target: "automation-sales"
          },
          {
            label: "Customer Support Automation", 
            description: "Intelligent helpdesk workflows",
            icon: Headphones,
            action: "navigate", 
            target: "automation-support"
          },
          {
            label: "Marketing Campaign Automation",
            description: "Multi-channel marketing workflows",
            icon: Megaphone,
            action: "navigate",
            target: "automation-marketing"
          },
          {
            label: "Financial Process Automation",
            description: "Accounting & invoicing automation",
            icon: DollarSign,
            action: "navigate",
            target: "automation-finance"
          },
          {
            label: "HR & Recruitment Automation",
            description: "Hiring & employee management",
            icon: Users,
            action: "navigate",
            target: "automation-hr"
          },
          {
            label: "Supply Chain Automation",
            description: "Inventory & logistics optimization",
            icon: Package,
            action: "navigate",
            target: "automation-inventory"
          }
        ]
      }
    ]
  },
  { label: "Projects", href: "#portfolio", icon: FolderOpen },
  { label: "Contact", href: "#contact", icon: Mail }
];