import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Linkedin, 
  Facebook
} from 'lucide-react';

export const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "inquire@tepasolutions.asia",
    href: "mailto:inquire@tepasolutions.asia",
    color: "text-blue-500"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 912 345 678",
    href: "tel:+639123456789",
    color: "text-green-500"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "BGC Taguig, Philippines",
    href: "#",
    color: "text-red-500"
  }
];

export const socialLinks = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/639123456789",
    color: "hover:text-green-600"
  },
  {
    icon: Linkedin,
    label: "LinkedIn", 
    href: "https://linkedin.com/company/tepasolutions",
    color: "hover:text-blue-600"
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com/tepasolutions",
    color: "hover:text-blue-500"
  }
];