export interface Career {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  salary?: string;
  postedDate?: string;
}

export const careersData: Career[] = [
  {
    id: "frontend-developer-1",
    title: "Senior Frontend Developer - React & TypeScript",
    department: "Engineering",
    type: "Full-time",
    location: "Remote / Philippines",
    experience: "3-5 years",
    description: "Join our growing team as a Senior Frontend Developer and help build cutting-edge web applications using React, TypeScript, and modern development tools. You'll work on diverse projects for international clients while collaborating with a talented team of developers and designers.",
    requirements: [
      "5+ years of React/JavaScript experience",
      "Strong understanding of TypeScript",
      "Experience with responsive design and CSS frameworks",
      "Knowledge of state management (Redux/Zustand)",
      "Familiarity with testing frameworks (Jest, React Testing Library)",
      "Experience with modern build tools (Vite, Webpack)",
      "Remote work experience preferred"
    ],
    responsibilities: [
      "Develop and maintain frontend applications using React and TypeScript",
      "Collaborate with designers and backend developers to implement features",
      "Optimize applications for maximum speed and scalability",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and mentor junior developers",
      "Stay up-to-date with the latest frontend technologies and best practices"
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Testing", "Git", "Figma"],
    salary: "Competitive + Benefits",
    postedDate: "2024-12-10"
  },
  {
    id: "backend-developer-1",
    title: "Backend Developer - Node.js & Cloud",
    department: "Engineering",
    type: "Full-time",
    location: "Manila, Philippines",
    experience: "3-5 years",
    description: "Design and implement scalable backend systems and APIs using Node.js, Python, and cloud technologies. Work on challenging projects that serve thousands of users while maintaining high performance and reliability.",
    requirements: [
      "4+ years of backend development experience",
      "Proficiency in Node.js or Python",
      "Database design and optimization skills (PostgreSQL, MongoDB)",
      "Experience with cloud platforms (AWS/GCP/Azure)",
      "Understanding of microservices architecture",
      "Knowledge of API design and RESTful services",
      "Experience with Docker and containerization"
    ],
    responsibilities: [
      "Design and develop RESTful APIs and microservices",
      "Optimize database performance and ensure data integrity",
      "Implement security best practices and authentication systems",
      "Deploy and monitor applications in cloud environments",
      "Collaborate with frontend teams to integrate services",
      "Mentor junior developers and conduct code reviews"
    ],
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "AWS", "Docker", "API Design"],
    salary: "₱80,000 - ₱120,000",
    postedDate: "2024-12-08"
  },
  {
    id: "ui-ux-designer-1",
    title: "UI/UX Designer - Digital Products",
    department: "Design",
    type: "Full-time",
    location: "Hybrid - Cebu",
    experience: "2-4 years",
    description: "Design beautiful and functional user experiences for web and mobile applications. Work closely with our development team to create intuitive interfaces that delight users and drive business results.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency in Figma and design systems",
      "Experience with user research and usability testing",
      "Strong portfolio demonstrating design process",
      "Understanding of frontend development principles",
      "Knowledge of accessibility guidelines (WCAG)",
      "Excellent communication and collaboration skills"
    ],
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Conduct user research and usability testing",
      "Develop and maintain design systems and style guides",
      "Collaborate with developers to ensure design implementation",
      "Present design concepts to stakeholders and clients",
      "Stay current with design trends and best practices"
    ],
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems"],
    salary: "₱60,000 - ₱90,000",
    postedDate: "2024-12-05"
  }
];