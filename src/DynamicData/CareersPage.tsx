import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Heart, GraduationCap, ArrowRight, Calendar, DollarSign, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface CareersPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
}

const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Flexible Schedule",
    description: "Hybrid work options and flexible hours"
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Learning & Growth", 
    description: "Continuous learning budget and skill development"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Great Team",
    description: "Collaborative environment with passionate people"
  }
];

export const jobPositions = [
  // Internship Positions - Remote
  {
    id: 1,
    slug: 'intern-frontend-developer',
    title: "Frontend Developer Intern",
    department: "Engineering",
    type: "Internship",
    location: "Remote",
    experience: "Entry Level",
    salary: "",
    description: "Join our development team as a frontend developer intern. Learn React, TypeScript, and modern web technologies while working on real projects that impact businesses worldwide.",
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Familiarity with React (personal projects or coursework)",
      "Understanding of responsive design principles",
      "Strong willingness to learn and adapt",
      "Good communication skills",
      "Availability for at least 20 hours per week"
    ],
    responsibilities: [
      "Assist in developing responsive web applications",
      "Learn and implement modern frontend technologies",
      "Collaborate with senior developers on UI components",
      "Participate in code reviews and learning sessions",
      "Support testing and quality assurance processes",
      "Document your learning and project contributions"
    ],
    niceToHave: [
      "Experience with Git version control",
      "Basic understanding of design principles",
      "Familiarity with TypeScript",
      "Experience with CSS frameworks",
      "Personal coding projects or portfolio",
      "Design skills and experience with Figma"
    ],
    postedDate: "2025-01-15",
    applicationDeadline: "2025-10-30"
  },
  {
    id: 2,
    slug: 'intern-backend-developer',
    title: "Backend Developer Intern",
    department: "Engineering",
    type: "Internship",
    location: "Remote",
    experience: "Entry Level",
    salary: "",
    description: "Learn backend development with Node.js, databases, and API design while contributing to real automation solutions and business tools.",
    requirements: [
      "Basic programming knowledge (JavaScript, Python, or similar)",
      "Understanding of databases and data structures",
      "Familiarity with REST APIs",
      "Strong problem-solving skills",
      "Good communication and teamwork abilities",
      "Availability for at least 20 hours per week"
    ],
    responsibilities: [
      "Assist in API development and maintenance",
      "Learn database design and optimization",
      "Support backend infrastructure and automation tools",
      "Participate in code reviews and technical discussions",
      "Help with testing and debugging backend systems",
      "Document development processes and learnings"
    ],
    niceToHave: [
      "Experience with Node.js or Express.js",
      "Knowledge of SQL and NoSQL databases",
      "Familiarity with cloud platforms",
      "Understanding of version control (Git)",
      "Experience with automation tools",
      "Interest in DevOps practices"
    ],
    postedDate: "2025-01-15",
    applicationDeadline: "2025-10-30"
  },
  {
    id: 3,
    slug: 'intern-article-writer',
    title: "Article Writer Intern",
    department: "Marketing",
    type: "Internship",
    location: "Remote",
    experience: "Entry Level",
    salary: "",
    description: "Create engaging content about technology, business automation, and digital trends. Perfect for writers passionate about tech and business innovation.",
    requirements: [
      "Excellent written English communication skills",
      "Interest in technology and business topics",
      "Basic research and fact-checking abilities",
      "Understanding of SEO principles",
      "Ability to meet deadlines consistently",
      "Availability for at least 15 hours per week"
    ],
    responsibilities: [
      "Write articles on technology and business automation topics",
      "Research industry trends and emerging technologies",
      "Create compelling headlines and meta descriptions",
      "Collaborate with marketing team on content strategy",
      "Edit and proofread content for quality assurance",
      "Assist with social media content creation"
    ],
    niceToHave: [
      "Experience with content management systems",
      "Knowledge of digital marketing principles",
      "Familiarity with AI tools and automation",
      "Understanding of target audience engagement",
      "Portfolio of published articles or blog posts",
      "Social media management experience"
    ],
    postedDate: "2025-01-15",
    applicationDeadline: "2025-10-30"
  },
  {
    id: 4,
    slug: 'intern-seo-specialist',
    title: "SEO Specialist Intern",
    department: "Marketing",
    type: "Internship",
    location: "Remote",
    experience: "Entry Level",
    salary: "",
    description: "Learn search engine optimization and digital marketing strategies while helping improve our clients' online visibility and search rankings.",
    requirements: [
      "Basic understanding of SEO principles",
      "Analytical mindset and attention to detail",
      "Familiarity with Google Analytics and Search Console",
      "Interest in digital marketing and online growth",
      "Strong research and problem-solving skills",
      "Availability for at least 20 hours per week"
    ],
    responsibilities: [
      "Assist with keyword research and analysis",
      "Support on-page optimization projects",
      "Help with technical SEO audits",
      "Monitor website performance and rankings",
      "Assist with content optimization strategies",
      "Learn and apply SEO best practices"
    ],
    niceToHave: [
      "Experience with SEO tools (SEMrush, Ahrefs, Moz)",
      "Knowledge of HTML and basic web technologies",
      "Understanding of content marketing",
      "Familiarity with local SEO strategies",
      "Experience with social media marketing",
      "Certification in Google Analytics or Ads"
    ],
    postedDate: "2025-01-15",
    applicationDeadline: "2025-10-30"
  },
  {
    id: 5,
    slug: 'intern-admin-assistant',
    title: "Administrative Assistant Intern",
    department: "Operations",
    type: "Internship",
    location: "Remote",
    experience: "Entry Level",
    salary: "",
    description: "Support daily operations and learn business administration while working with a dynamic tech company focused on automation and innovation.",
    requirements: [
      "Strong organizational and time management skills",
      "Excellent communication abilities",
      "Proficiency in Microsoft Office or Google Workspace",
      "Attention to detail and accuracy",
      "Ability to multitask and prioritize",
      "Availability for at least 20 hours per week"
    ],
    responsibilities: [
      "Assist with scheduling and calendar management",
      "Support client communication and follow-ups",
      "Help with document preparation and data entry",
      "Coordinate meetings and virtual events",
      "Assist with project management tasks",
      "Learn business process optimization"
    ],
    niceToHave: [
      "Experience with project management tools",
      "Knowledge of CRM systems",
      "Understanding of business automation tools",
      "Customer service experience",
      "Familiarity with virtual collaboration tools",
      "Interest in process improvement"
    ],
    postedDate: "2025-01-15",
    applicationDeadline: "2025-10-30"
  },
  {
    id: 6,
    slug: 'intern-business-development',
    title: "Business Development Intern",
    department: "Sales",
    type: "Internship",
    location: "Remote",
    experience: "Entry Level",
    salary: "",
    description: "Learn business development and sales strategies while supporting client acquisition and relationship building for our technology solutions.",
    requirements: [
      "Strong interpersonal and communication skills",
      "Interest in business development and sales",
      "Basic understanding of technology solutions",
      "Research and analytical abilities",
      "Self-motivated and goal-oriented",
      "Availability for at least 20 hours per week"
    ],
    responsibilities: [
      "Support lead generation and prospecting activities",
      "Assist with market research and competitor analysis",
      "Help prepare sales presentations and proposals",
      "Support client communication and follow-ups",
      "Learn CRM management and sales processes",
      "Assist with networking and event coordination"
    ],
    niceToHave: [
      "Experience with sales or customer service",
      "Understanding of B2B sales processes",
      "Familiarity with CRM tools",
      "Knowledge of automation and tech solutions",
      "Strong presentation skills",
      "Network in business or tech communities"
    ],
    postedDate: "2025-01-15",
    applicationDeadline: "2025-10-30"
  },

  // Contractual Positions - Remote (6-12 months)
  {
    id: 7,
    slug: 'contract-fullstack-developer',
    title: "Full Stack Developer",
    department: "Engineering",
    type: "Contract",
    location: "Remote",
    experience: "3-5 years",
    salary: "",
    description: "Work on end-to-end web application development using modern technologies. 6-12 month contract opportunity for experienced developers who enjoy both frontend and backend challenges.",
    requirements: [
      "4+ years of full-stack development experience",
      "Proficiency in React and Node.js",
      "Experience with databases (PostgreSQL, MongoDB)",
      "Knowledge of cloud platforms (AWS, Azure, GCP)",
      "Understanding of DevOps practices",
      "Strong problem-solving and debugging skills"
    ],
    responsibilities: [
      "Design and implement full-stack web applications",
      "Build and maintain APIs and microservices",
      "Collaborate with cross-functional teams on product features",
      "Optimize application performance and scalability",
      "Implement security best practices",
      "Mentor junior developers and conduct code reviews"
    ],
    niceToHave: [
      "Experience with automation and workflow tools",
      "Knowledge of containerization (Docker, Kubernetes)",
      "Understanding of CI/CD pipelines",
      "Experience with real-time technologies (WebSockets, Socket.io)",
      "Familiarity with AI/ML integration",
      "Previous startup or agency experience"
    ],
    postedDate: "2025-01-15",
    applicationDeadline: "2025-10-30"
  },
  {
    id: 8,
    slug: 'contract-mobile-app-developer',
    title: "Mobile App Developer",
    department: "Engineering",
    type: "Contract",
    location: "Remote",
    experience: "3-5 years",
    salary: "",
    description: "Develop native and cross-platform mobile applications. 6-12 month contract for experienced mobile developers working on innovative business solutions.",
    requirements: [
      "4+ years of mobile app development experience",
      "Proficiency in React Native or Flutter",
      "Experience with native iOS and Android development",
      "Knowledge of mobile app deployment processes",
      "Understanding of mobile UX/UI principles",
      "Experience with mobile testing and debugging"
    ],
    responsibilities: [
      "Develop cross-platform mobile applications",
      "Implement native mobile features and integrations",
      "Optimize app performance and user experience",
      "Collaborate with designers on UI implementation",
      "Manage app store submissions and updates",
      "Ensure mobile security best practices"
    ],
    niceToHave: [
      "Experience with mobile automation testing",
      "Knowledge of mobile analytics and crash reporting",
      "Understanding of mobile CI/CD pipelines",
      "Experience with mobile payment integrations",
      "Familiarity with augmented reality or IoT",
      "Previous enterprise mobile app experience"
    ],
    postedDate: "2025-01-15",
    applicationDeadline: "2025-10-30"
  },
  {
    id: 9,
    slug: 'contract-android-developer',
    title: "Android Developer",
    department: "Engineering",
    type: "Contract",
    location: "Remote",
    experience: "3-5 years",
    salary: "",
    description: "Build native Android applications using Kotlin and modern Android development practices. 6-12 month contract opportunity for Android specialists.",
    requirements: [
      "4+ years of native Android development experience",
      "Proficiency in Kotlin and Java",
      "Experience with Android SDK and development tools",
      "Knowledge of Android architecture components",
      "Understanding of Material Design principles",
      "Experience with Google Play Store deployment"
    ],
    responsibilities: [
      "Develop native Android applications",
      "Implement Android-specific features and services",
      "Ensure app compatibility across Android versions",
      "Optimize app performance and battery usage",
      "Integrate with Android system features",
      "Maintain code quality and best practices"
    ],
    niceToHave: [
      "Experience with Android Jetpack Compose",
      "Knowledge of Android testing frameworks",
      "Understanding of Android security practices",
      "Experience with Firebase and Google services",
      "Familiarity with Android enterprise features",
      "Knowledge of Android accessibility guidelines"
    ],
    postedDate: "2025-01-15",
    applicationDeadline: "2025-10-30"
  },
  {
    id: 10,
    slug: 'contract-ios-developer',
    title: "iOS Developer",
    department: "Engineering",
    type: "Contract",
    location: "Remote",
    experience: "3-5 years",
    salary: "",
    description: "Create native iOS applications using Swift and iOS development frameworks. 6-12 month contract for experienced iOS developers.",
    requirements: [
      "4+ years of native iOS development experience",
      "Proficiency in Swift and Objective-C",
      "Experience with iOS SDK and Xcode",
      "Knowledge of iOS design patterns and architecture",
      "Understanding of Apple's Human Interface Guidelines",
      "Experience with App Store submission process"
    ],
    responsibilities: [
      "Develop native iOS applications",
      "Implement iOS-specific features and integrations",
      "Ensure app compatibility across iOS versions",
      "Optimize app performance and memory usage",
      "Integrate with iOS system frameworks",
      "Follow Apple's development guidelines and best practices"
    ],
    niceToHave: [
      "Experience with SwiftUI and Combine",
      "Knowledge of iOS testing frameworks (XCTest)",
      "Understanding of iOS security and privacy",
      "Experience with Core Data and CloudKit",
      "Familiarity with iOS enterprise distribution",
      "Knowledge of iOS accessibility features"
    ],
    postedDate: "2025-01-15",
    applicationDeadline: "2025-10-30"
  },
  {
    id: 11,
    slug: 'contract-backend-developer',
    title: "Backend Developer",
    department: "Engineering",
    type: "Contract",
    location: "Remote",
    experience: "3-5 years",
    salary: "",
    description: "Build scalable backend systems and APIs for business automation solutions. 6-12 month contract opportunity for backend specialists.",
    requirements: [
      "4+ years of backend development experience",
      "Proficiency in Node.js, Python, or similar",
      "Experience with databases (PostgreSQL, MongoDB, Redis)",
      "Knowledge of API design and development",
      "Understanding of cloud platforms and services",
      "Experience with microservices architecture"
    ],
    responsibilities: [
      "Design and develop scalable backend systems",
      "Build robust APIs and microservices",
      "Implement database schemas and optimization",
      "Ensure system security and performance",
      "Collaborate with frontend teams on integration",
      "Monitor and maintain production systems"
    ],
    niceToHave: [
      "Experience with container orchestration",
      "Knowledge of message queues and event streaming",
      "Understanding of DevOps and CI/CD practices",
      "Experience with monitoring and logging tools",
      "Familiarity with serverless architecture",
      "Knowledge of automation and workflow systems"
    ],
    postedDate: "2025-01-15",
    applicationDeadline: "2025-10-30"
  }
];

const departments = ["All", "Engineering", "Marketing", "Sales", "Operations"];

export function CareersPage({ navigate }: CareersPageProps) {
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredPositions = jobPositions.filter(position => 
    selectedDepartment === "All" || position.department === selectedDepartment
  );

  const handleJobClick = (job: typeof jobPositions[0]) => {
    if (navigate) {
      navigate(`/careers/${job.slug}`);
    }
  };

  const handleApplyClick = () => {
    if (navigate) {
      navigate('/contact-us/careers');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-muted/30 to-background py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4">Join Our Team</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Build the Future of Business Technology
            </h1>
            <p className="text-xl text-muted-foreground">
              Join a growing team of passionate professionals creating innovative solutions 
              that transform how businesses operate. Be part of our mission to make technology 
              accessible and powerful for every organization.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Join Tepa Solutions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're building a company where talented people can do their best work, 
              learn continuously, and make a meaningful impact on businesses worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore current opportunities to join our team and help shape the future of business automation.
            </p>
          </motion.div>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {departments.map(dept => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </Button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredPositions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => handleJobClick(position)}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{position.department}</Badge>
                          <Badge variant="secondary">{position.type}</Badge>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{position.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{position.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{position.experience}</span>
                          </div>
                          {position.salary && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{position.salary}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Posted {new Date(position.postedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button>
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPositions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No open positions in this department at the moment.
              </p>
              <p className="text-muted-foreground mt-2">
                Check back soon or contact us about future opportunities.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for talented individuals to join our team. 
              Send us your resume and let us know how you'd like to contribute to our mission.
            </p>
            <Button size="lg" onClick={handleApplyClick}>
              Send Us Your Resume
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}