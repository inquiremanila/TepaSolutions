import { 
  Home, 
  Briefcase, 
  BookOpen,
  Bot, 
  Building,
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
  Package,
  FileText,
  Calendar,
  Info,
  MapPin,
  Phone,
  Mail,
  HeadphonesIcon,
  Target,
  Factory,
  Heart
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
    label: "What we offer", 
    href: "#portfolio", 
    icon: Briefcase,
    hasDropdown: true,
    dropdownItems: [
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
      },
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
      }
    ]
  },
  { 
    label: "Resources", 
    href: "#resources", 
    icon: BookOpen,
    hasDropdown: true,
    dropdownItems: [
      { 
        label: "Articles & Insights", 
        description: "Industry insights and best practices",
        icon: FileText, 
        action: "navigate",
        target: "articles"
      },
      { 
        label: "Events", 
        description: "Upcoming events and webinars",
        icon: Calendar, 
        action: "navigate",
        target: "events"
      },
      { 
        label: "Volunteer with Us", 
        description: "Join our mission to educate the youth",
        icon: Heart, 
        action: "navigate",
        target: "contact-volunteer"
      }
    ]
  },
  { 
    label: "About Tepa", 
    href: "#about", 
    icon: Building,
    hasDropdown: true,
    dropdownItems: [
      { 
        label: "Learn about Tepa", 
        description: "Our story, mission and values",
        icon: Info, 
        action: "navigate",
        target: "about-company"
      },
      { 
        label: "Careers", 
        description: "Join our growing team",
        icon: Users, 
        action: "navigate",
        target: "careers"
      },
      { 
        label: "Investors", 
        description: "Investor relations and information",
        icon: TrendingUp, 
        action: "navigate",
        target: "investors"
      },
      { 
        label: "Contact Us", 
        description: "Get in touch with our team",
        icon: Phone, 
        action: "expand",
        target: "contact",
        subItems: [
          {
            label: "Sales",
            description: "Talk to our sales team",
            icon: Phone,
            action: "navigate",
            target: "contact-sales"
          },
          {
            label: "Support",
            description: "Get technical support",
            icon: HeadphonesIcon,
            action: "navigate",
            target: "contact-support"
          }
        ]
      }
    ]
  }
];