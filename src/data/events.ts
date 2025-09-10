export interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  locationDetails?: string;
  capacity: string;
  status: string;
  featured: boolean;
  instructor: string;
  instructorRole: string;
  level: string;
  image?: string;
  certificate?: string;
  topics: string[];
  requirements: string[];
  agenda: Record<string, string>;
  price?: string;
  tags?: string[];
}

export const eventsData: Event[] = [
  {
    id: "introduction-to-how-to-make-a-roblox-game",
    title: "Introduction to How to make a Roblox Game",
    description: "Join our comprehensive workshop where you'll learn the fundamentals of Roblox game development using Roblox Studio and Lua scripting. Perfect for beginners and aspiring game developers!",
    type: "Workshop",
    category: "Development",
    date: "2025-09-27",
    time: "4:00 PM - 6:00 PM",
    duration: "2 hours",
    location: "Zoom Meeting",
    locationDetails: "Online via Zoom Meeting - No need to commute!",
    capacity: "20 participants",
    status: "registration-open",
    featured: true,
    instructor: "Jake Martinez",
    instructorRole: "Senior Game Developer",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1704244377777-fc9d78f11643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2Jsb3glMjBnYW1lJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzU3NDUwMzU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    certificate: "Completion Certificate",
    topics: [
      "Introduction to Roblox Studio",
      "Basic Lua scripting concepts",
      "Creating your first game world",
      "Adding interactive elements",
      "Scripting player movements",
      "Implementing game mechanics",
      "Testing and debugging",
      "Publishing your game"
    ],
    requirements: [
      "Pre-setup Roblox Studio on your device",
      "Have your own Roblox login account",
      "Stable internet connection",
      "Basic computer literacy"
    ],
    agenda: {
      "4:00 - 4:15": "Welcome & Introductions",
      "4:15 - 4:45": "Roblox Studio Basics & Interface",
      "4:45 - 5:15": "Basic Lua Scripting",
      "5:15 - 5:45": "Building Your First Game",
      "5:45 - 6:00": "Q&A and Next Steps"
    },
    price: "Free",
    tags: ["Roblox", "Game Development", "Lua", "Beginners"]
  },
  {
    id: "react-masterclass-advanced-patterns",
    title: "React Masterclass: Advanced Patterns & Best Practices",
    description: "Deep dive into advanced React patterns, hooks, and performance optimization techniques.",
    type: "Masterclass",
    category: "Web Development",
    date: "2025-01-20",
    time: "10:00 AM - 1:00 PM PHT",
    duration: "3 hours",
    location: "Manila Tech Hub",
    capacity: "50 participants",
    status: "registration-open",
    featured: true,
    instructor: "Jerrie Mataya",
    instructorRole: "Founder & CEO",
    level: "Advanced",
    topics: [
      "Advanced React patterns",
      "Custom hooks development",
      "Performance optimization",
      "State management best practices",
      "Testing strategies",
      "Production deployment"
    ],
    requirements: [
      "2+ years React experience",
      "Understanding of JavaScript ES6+",
      "Familiarity with modern development tools",
      "Laptop with Node.js installed"
    ],
    agenda: {
      "10:00 - 10:30": "Welcome & Advanced Patterns Overview",
      "10:30 - 11:30": "Custom Hooks & State Management",
      "11:30 - 12:30": "Performance Optimization Techniques",
      "12:30 - 1:00": "Q&A and Best Practices Discussion"
    },
    price: "₱2,500",
    tags: ["React", "JavaScript", "Advanced", "Web Development"]
  },
  {
    id: "ai-automation-business-workshop",
    title: "AI Automation for Business: Practical Implementation",
    description: "Learn how to implement AI automation solutions in your business processes.",
    type: "Workshop",
    category: "Business Automation",
    date: "2025-01-25",
    time: "1:00 PM - 5:00 PM PHT",
    duration: "4 hours",
    location: "Cebu Business District",
    capacity: "75 participants",
    status: "registration-open",
    featured: false,
    instructor: "AI Solutions Team",
    instructorRole: "Business Automation Specialists",
    level: "Intermediate",
    topics: [
      "AI automation fundamentals",
      "Business process analysis",
      "Implementation strategies",
      "ROI calculation",
      "Change management",
      "Success metrics"
    ],
    requirements: [
      "Business leadership experience",
      "Basic understanding of business processes",
      "Interest in automation technologies",
      "Laptop for hands-on exercises"
    ],
    agenda: {
      "1:00 - 1:30": "Introduction to AI Automation",
      "1:30 - 2:30": "Business Process Analysis",
      "2:30 - 3:30": "Implementation Planning",
      "3:30 - 4:30": "Hands-on Workshop",
      "4:30 - 5:00": "Q&A and Next Steps"
    },
    price: "₱3,500",
    tags: ["AI", "Automation", "Business", "Implementation"]
  }
];