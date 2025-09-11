import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Users, Heart, Code, Palette, GraduationCap, Laptop, Send, CheckCircle, AlertCircle, ArrowRight, Calendar, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

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
  {
    id: 1,
    slug: 'frontend-developer',
    title: "Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "BGC, Taguig / Remote",
    experience: "2-4 years",
    salary: "₱50,000 - ₱80,000",
    description: "Build beautiful, responsive user interfaces using React, TypeScript, and modern web technologies. Join our development team to create innovative solutions that impact businesses worldwide.",
    requirements: [
      "3+ years experience with React and TypeScript",
      "Strong knowledge of HTML, CSS, and JavaScript",
      "Experience with modern build tools (Vite, Webpack)",
      "Understanding of responsive design principles",
      "Familiarity with Git version control",
      "Experience with REST APIs and state management"
    ],
    responsibilities: [
      "Develop and maintain responsive web applications",
      "Collaborate with designers to implement pixel-perfect UIs",
      "Optimize applications for maximum speed and scalability",
      "Write clean, maintainable, and testable code",
      "Participate in code reviews and technical discussions",
      "Stay updated with latest frontend technologies and best practices"
    ],
    niceToHave: [
      "Experience with Next.js or other React frameworks",
      "Knowledge of design systems and component libraries",
      "Understanding of accessibility (a11y) principles",
      "Experience with testing frameworks (Jest, Cypress)",
      "Familiarity with cloud platforms (AWS, Vercel)",
      "Design skills and experience with Figma"
    ],
    postedDate: "2025-01-10",
    applicationDeadline: "2025-02-10"
  },
  {
    id: 2,
    slug: 'fullstack-developer',
    title: "Full Stack Developer",
    department: "Engineering",
    type: "Full-time",
    location: "BGC, Taguig / Remote",
    experience: "3-5 years",
    salary: "₱70,000 - ₱120,000",
    description: "Work across the entire technology stack to build scalable web applications and automation solutions. Perfect opportunity for developers who enjoy both frontend and backend challenges.",
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
    postedDate: "2025-01-08",
    applicationDeadline: "2025-02-08"
  },
  {
    id: 3,
    slug: 'ui-ux-designer',
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
    location: "BGC, Taguig / Remote",
    experience: "2-4 years",
    salary: "₱45,000 - ₱70,000",
    description: "Create intuitive and engaging user experiences for web applications and automation platforms. Work closely with development teams to bring designs to life.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency in Figma and design tools",
      "Strong understanding of user-centered design principles",
      "Experience with prototyping and user testing",
      "Knowledge of design systems and component libraries",
      "Portfolio showcasing web application designs"
    ],
    responsibilities: [
      "Design user interfaces for web applications and automation tools",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with developers to ensure design implementation",
      "Maintain and evolve design systems",
      "Present design concepts to stakeholders"
    ],
    niceToHave: [
      "Experience designing for business automation tools",
      "Knowledge of HTML/CSS and frontend technologies",
      "Understanding of accessibility principles",
      "Experience with motion design and animations",
      "Background in service design or business process design",
      "Familiarity with data visualization"
    ],
    postedDate: "2025-01-05",
    applicationDeadline: "2025-02-05"
  },
  {
    id: 4,
    slug: 'business-development-manager',
    title: "Business Development Manager",
    department: "Sales",
    type: "Full-time",
    location: "BGC, Taguig",
    experience: "3-5 years",
    salary: "₱60,000 - ₱100,000 + Commission",
    description: "Drive business growth by identifying new opportunities and building relationships with potential clients. Lead the expansion of our automation and development services.",
    requirements: [
      "4+ years of B2B sales or business development experience",
      "Experience selling technology solutions or services",
      "Strong communication and presentation skills",
      "Understanding of business automation and software development",
      "Proven track record of meeting sales targets",
      "Network in the Philippine business community"
    ],
    responsibilities: [
      "Identify and pursue new business opportunities",
      "Build and maintain relationships with key clients",
      "Develop and present proposals for automation solutions",
      "Collaborate with technical teams on solution design",
      "Manage sales pipeline and forecast revenue",
      "Represent Tepa Solutions at industry events"
    ],
    niceToHave: [
      "Experience with CRM systems and sales automation tools",
      "Background in consulting or professional services",
      "Understanding of enterprise software sales cycles",
      "Experience selling to SMEs and large enterprises",
      "Knowledge of digital transformation trends",
      "Previous experience in a startup environment"
    ],
    postedDate: "2025-01-03",
    applicationDeadline: "2025-02-03"
  }
];

const departments = ["All", "Engineering", "Design", "Sales", "Marketing"];

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
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{position.salary}</span>
                          </div>
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