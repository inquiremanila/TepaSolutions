import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter
} from 'lucide-react';

export const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@yourname.dev",
    href: "mailto:hello@yourname.dev",
    color: "text-blue-500"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    color: "text-green-500"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
    color: "text-red-500"
  }
];

export const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com",
    color: "hover:text-gray-900 dark:hover:text-gray-100"
  },
  {
    icon: Linkedin,
    label: "LinkedIn", 
    href: "https://linkedin.com",
    color: "hover:text-blue-600"
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com",
    color: "hover:text-blue-400"
  }
];