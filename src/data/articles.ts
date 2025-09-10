export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  role?: string;
  date: string;
  publishedDate?: string;
  readTime: string;
  tags: string[];
  category: string;
  featured: boolean;
}

export const articlesData: Article[] = [
  {
    id: "how-ai-is-transforming-workforce-in-2025",
    title: "How AI is Transforming the Workforce in 2025",
    excerpt: "Explore the revolutionary impact of artificial intelligence on modern workplaces, from automation to augmented decision-making, and discover how businesses can adapt to thrive in the AI-driven future.",
    content: `
      <h2>The AI Revolution in the Modern Workplace</h2>
      <p>As we navigate through 2025, artificial intelligence continues to reshape how we work, collaborate, and innovate. The transformation isn't just about replacing human tasks—it's about augmenting human capabilities and creating entirely new opportunities for growth and efficiency.</p>
      
      <h3>Key Areas of AI Transformation</h3>
      
      <h4>1. Intelligent Automation</h4>
      <p>AI-powered automation has evolved beyond simple rule-based systems. Modern AI can handle complex decision-making processes, analyze unstructured data, and adapt to changing business conditions in real-time.</p>
      
      <h4>2. Enhanced Decision Making</h4>
      <p>Machine learning algorithms now provide predictive analytics that help businesses anticipate market trends, customer behavior, and operational challenges before they occur.</p>
      
      <h4>3. Personalized Employee Experiences</h4>
      <p>AI is creating more personalized work experiences through intelligent scheduling, customized learning paths, and adaptive user interfaces that respond to individual work patterns.</p>
      
      <h3>Impact on Different Industries</h3>
      
      <h4>Healthcare</h4>
      <p>AI is revolutionizing patient care through predictive diagnostics, personalized treatment plans, and automated administrative tasks that free up healthcare professionals to focus on patient interaction.</p>
      
      <h4>Finance</h4>
      <p>From fraud detection to automated trading and personalized financial advice, AI is making financial services more secure, efficient, and accessible.</p>
      
      <h4>Manufacturing</h4>
      <p>Smart factories powered by AI are optimizing production lines, predicting equipment failures, and ensuring quality control at unprecedented levels of precision.</p>
      
      <h3>Preparing Your Workforce for the AI Future</h3>
      
      <p>To successfully integrate AI into your organization, consider these strategic approaches:</p>
      
      <ul>
        <li><strong>Reskilling and Upskilling:</strong> Invest in training programs that help employees work alongside AI systems</li>
        <li><strong>Change Management:</strong> Develop clear communication strategies to address concerns and highlight opportunities</li>
        <li><strong>Human-AI Collaboration:</strong> Design workflows that leverage both human creativity and AI efficiency</li>
        <li><strong>Ethical AI Implementation:</strong> Establish guidelines for responsible AI use that prioritizes transparency and fairness</li>
      </ul>
      
      <h3>The Future is Collaborative</h3>
      
      <p>The most successful organizations in 2025 will be those that view AI not as a replacement for human workers, but as a powerful tool for amplifying human potential. By focusing on collaboration between humans and AI, businesses can create more innovative, efficient, and fulfilling work environments.</p>
      
      <p>At Tepa Solutions, we help organizations navigate this AI transformation through custom automation solutions that enhance rather than replace human capabilities. Ready to explore how AI can transform your workplace? <a href="/contact-us/sales">Contact our team</a> to discuss your specific needs.</p>
    `,
    author: "Jerrie Mataya",
    role: "Founder & CEO",
    date: "2024-12-10",
    publishedDate: "2024-12-10",
    readTime: "8 min read",
    tags: ["AI", "Workforce", "Business Transformation", "2025 Trends"],
    category: "AI & Automation",
    featured: true
  },
  {
    id: "react-performance-optimization-guide",
    title: "React Performance Optimization: Complete Guide 2025",
    excerpt: "Learn advanced techniques to optimize React applications for better performance and user experience.",
    content: `
      <h2>React Performance Optimization: Complete Guide 2025</h2>
      <p>Performance optimization is crucial for creating fast, responsive React applications that provide exceptional user experiences.</p>
      
      <h3>Key Optimization Techniques</h3>
      <h4>1. Component Memoization</h4>
      <p>Use React.memo() and useMemo() to prevent unnecessary re-renders.</p>
      
      <h4>2. Code Splitting</h4>
      <p>Implement lazy loading with React.lazy() and Suspense for better initial load times.</p>
      
      <h4>3. Virtual DOM Optimization</h4>
      <p>Understand how React's reconciliation works and optimize your component structure accordingly.</p>
    `,
    author: "Development Team",
    role: "Senior Frontend Engineers",
    date: "2024-12-08",
    publishedDate: "2024-12-08",
    readTime: "12 min read",
    tags: ["React", "Performance", "JavaScript", "Frontend"],
    category: "Web Development",
    featured: false
  },
  {
    id: "philippines-tech-startup-ecosystem-2025",
    title: "Philippines Tech Startup Ecosystem: Growth and Opportunities",
    excerpt: "An analysis of the growing tech startup scene in the Philippines and opportunities for entrepreneurs.",
    content: `
      <h2>Philippines Tech Startup Ecosystem: Growth and Opportunities</h2>
      <p>The Philippines is experiencing unprecedented growth in its tech startup ecosystem, with increasing investment and government support.</p>
      
      <h3>Current State of the Market</h3>
      <p>With over 2,000 startups and growing investor interest, the Philippines is becoming a major tech hub in Southeast Asia.</p>
      
      <h3>Key Opportunities</h3>
      <ul>
        <li>Fintech and digital payments</li>
        <li>E-commerce and logistics</li>
        <li>EdTech and online learning</li>
        <li>HealthTech solutions</li>
      </ul>
    `,
    author: "Jerrie Mataya",
    role: "Founder & CEO",
    date: "2024-12-06",
    publishedDate: "2024-12-06",
    readTime: "10 min read",
    tags: ["Philippines", "Startups", "Tech Industry", "Entrepreneurship"],
    category: "Startup Ecosystem",
    featured: true
  }
];