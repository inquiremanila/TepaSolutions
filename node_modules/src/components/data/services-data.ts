import { 
  Globe, 
  Smartphone, 
  Palette, 
  ShoppingCart, 
  Database, 
  Zap 
} from 'lucide-react';

export const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive websites built with the latest technologies",
    features: ["React & Next.js", "TypeScript", "Tailwind CSS", "SEO Optimized"],
    color: "text-blue-500"
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications",
    features: ["React Native", "Flutter", "iOS & Android", "App Store Ready"],
    color: "text-green-500"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, user-centered design that converts",
    features: ["Figma", "Prototyping", "User Research", "Design Systems"],
    color: "text-purple-500"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Complete online stores with payment integration",
    features: ["Shopify", "WooCommerce", "Payment Gateways", "Analytics"],
    color: "text-orange-500"
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description: "Robust backend systems and API development",
    features: ["Node.js", "Python", "Database Design", "Cloud Deployment"],
    color: "text-red-500"
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Speed optimization and performance enhancement",
    features: ["Core Web Vitals", "Caching", "CDN Setup", "Monitoring"],
    color: "text-yellow-500"
  }
];