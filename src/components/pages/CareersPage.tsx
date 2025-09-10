import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Users, Heart, Code, Palette, GraduationCap, Laptop, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitCareerApplication } from '../../utils/api';
import { toast } from "sonner@2.0.3";
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface CareersPageProps {
  onNavigate: (target: string) => void;
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

const positions = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "BGC, Taguig",
    experience: "2-4 years",
    description: "Build beautiful, responsive user interfaces using React, TypeScript, and modern web technologies.",
    requirements: [
      "3+ years of React/JavaScript experience",
      "Strong understanding of TypeScript",
      "Experience with responsive design and CSS frameworks",
      "Knowledge of state management (Redux/Zustand)",
      "Familiarity with testing frameworks"
    ],
    responsibilities: [
      "Develop and maintain frontend applications",
      "Collaborate with designers and backend developers",
      "Optimize applications for performance",
      "Write clean, maintainable code",
      "Participate in code reviews"
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Testing"]
  },
  {
    id: 2,
    title: "Backend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "BGC, Taguig",
    experience: "3-5 years",
    description: "Design and implement scalable backend systems and APIs using Node.js, Python, and cloud technologies.",
    requirements: [
      "4+ years of backend development experience",
      "Proficiency in Node.js or Python",
      "Database design and optimization skills",
      "Experience with cloud platforms (AWS/GCP)",
      "Understanding of microservices architecture"
    ],
    responsibilities: [
      "Design and develop RESTful APIs",
      "Optimize database performance",
      "Implement security best practices",
      "Deploy and monitor applications",
      "Mentor junior developers"
    ],
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "AWS", "Docker"]
  },
  {
    id: 3,
    title: "Frontend Developer Intern",
    department: "Engineering",
    type: "Internship",
    location: "BGC, Taguig",
    experience: "Student/Fresh Graduate",
    description: "Learn and contribute to real-world projects while working with experienced developers.",
    requirements: [
      "Currently studying Computer Science or related field",
      "Basic knowledge of HTML, CSS, JavaScript",
      "Eagerness to learn React and modern frameworks",
      "Good communication skills",
      "Available for 6-month internship"
    ],
    responsibilities: [
      "Assist in frontend development tasks",
      "Learn React and TypeScript",
      "Work on assigned features",
      "Participate in daily standups",
      "Complete training modules"
    ],
    skills: ["HTML", "CSS", "JavaScript", "React (learning)", "Git"]
  },
  {
    id: 4,
    title: "Backend Developer Intern",
    department: "Engineering", 
    type: "Internship",
    location: "BGC, Taguig",
    experience: "Student/Fresh Graduate",
    description: "Gain hands-on experience in backend development and API design.",
    requirements: [
      "Computer Science or related field student",
      "Basic programming knowledge (any language)",
      "Understanding of databases and APIs",
      "Willingness to learn new technologies",
      "6-month commitment"
    ],
    responsibilities: [
      "Support backend development projects",
      "Learn server-side technologies",
      "Assist with database tasks",
      "Write documentation",
      "Shadow senior developers"
    ],
    skills: ["Programming Basics", "SQL", "APIs", "Node.js (learning)"]
  }
];

const volunteerProgram = {
  title: "Educational Outreach Volunteer",
  description: "Help us bridge the digital divide by teaching coding and digital literacy to underserved communities.",
  commitment: "4-8 hours per month",
  activities: [
    "Teach basic programming in schools",
    "Conduct digital literacy workshops",
    "Mentor students in coding projects",
    "Help develop educational curriculum",
    "Support community tech events"
  ],
  requirements: [
    "Passion for education and technology",
    "Basic programming knowledge",
    "Good communication skills",
    "Patience and empathy",
    "Available weekends or evenings"
  ]
};

export function CareersPage({ onNavigate }: CareersPageProps) {
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [filterType, setFilterType] = useState("All");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    portfolio: '',
    experience: ''
  });

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const position = positions.find(p => p.id === selectedPosition);
      await submitCareerApplication({
        position: position?.title || 'General Application',
        ...applicationData
      });

      toast.success('Application submitted successfully!', {
        description: 'We will review your application and get back to you soon.',
        icon: <CheckCircle className="w-4 h-4" />,
      });

      setApplicationData({
        name: '',
        email: '',
        phone: '',
        resume: '',
        coverLetter: '',
        portfolio: '',
        experience: ''
      });
      setShowApplicationForm(false);

    } catch (error) {
      console.error('Application submission error:', error);
      toast.error('Failed to submit application', {
        description: 'Please try again or contact us directly.',
        icon: <AlertCircle className="w-4 h-4" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPositions = positions.filter(pos => 
    filterType === "All" || pos.type === filterType
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-green-500';
      case 'Internship':
        return 'bg-blue-500';
      case 'Contract':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (selectedPosition) {
    const position = positions.find(p => p.id === selectedPosition);
    if (!position) return null;

    if (showApplicationForm) {
      return (
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-6 py-20 max-w-2xl">
            <Button
              variant="ghost"
              onClick={() => setShowApplicationForm(false)}
              className="mb-8"
            >
              ← Back
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold mb-4">Apply for {position.title}</h1>
                <p className="text-muted-foreground">
                  Fill out the form below to submit your application. All fields marked with * are required.
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleApplicationSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={applicationData.name}
                          onChange={(e) => setApplicationData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={applicationData.email}
                          onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={applicationData.phone}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="resume">Resume/CV (Link or text) *</Label>
                      <Textarea
                        id="resume"
                        placeholder="Paste your resume content here or provide a link to your resume..."
                        value={applicationData.resume}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, resume: e.target.value }))}
                        rows={6}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="coverLetter">Cover Letter</Label>
                      <Textarea
                        id="coverLetter"
                        placeholder="Tell us why you're interested in this position and how you can contribute to our team..."
                        value={applicationData.coverLetter}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="portfolio">Portfolio/GitHub (Optional)</Label>
                      <Input
                        id="portfolio"
                        placeholder="Link to your portfolio, GitHub, or relevant work samples"
                        value={applicationData.portfolio}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, portfolio: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="experience">Relevant Experience</Label>
                      <Textarea
                        id="experience"
                        placeholder="Briefly describe your relevant experience and achievements..."
                        value={applicationData.experience}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, experience: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-20 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => setSelectedPosition(null)}
            className="mb-8"
          >
            ← Back
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Position Header */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Badge className={getTypeColor(position.type)}>{position.type}</Badge>
                <Badge variant="outline">{position.department}</Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4">{position.title}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{position.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{position.experience}</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mt-4">{position.description}</p>
            </div>

            {/* Position Details */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Requirements</h3>
                  <ul className="space-y-2">
                    {position.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Key Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {position.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Responsibilities</h3>
                <ul className="space-y-2">
                  {position.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <span className="text-muted-foreground">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Apply Section */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
              <p className="text-muted-foreground mb-6">
                Send us your resume and a brief cover letter explaining why you're excited 
                about this opportunity and how you can contribute to our team.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => setShowApplicationForm(true)} size="lg">
                  Apply Now
                </Button>
                <Button variant="outline" size="lg" onClick={() => onNavigate('contact-sales')}>
                  Ask Questions
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
            <Badge className="mb-4">Careers</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Growing Team
            </h1>
            <p className="text-xl text-muted-foreground">
              Be part of a dynamic team that's transforming businesses through innovative technology. 
              Build your career while making a real impact.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Tepa Solutions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe that great work comes from great culture. Here's what makes working at Tepa special.
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our current openings and find the perfect role to advance your career.
            </p>
          </div>

          {/* Filter Tabs */}
          <Tabs defaultValue="All" className="mb-8">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="All" onClick={() => setFilterType("All")}>All</TabsTrigger>
              <TabsTrigger value="Full-time" onClick={() => setFilterType("Full-time")}>Full-time</TabsTrigger>
              <TabsTrigger value="Internship" onClick={() => setFilterType("Internship")}>Internships</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Positions Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {filteredPositions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPosition(position.id)}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getTypeColor(position.type)}>{position.type}</Badge>
                      <Badge variant="outline">{position.department}</Badge>
                    </div>
                    <CardTitle className="text-xl">{position.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{position.experience}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {position.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {position.skills.slice(0, 4).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                      {position.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">+{position.skills.length - 4} more</Badge>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Volunteer Program */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Educational Outreach Program</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Use your skills to make a difference in the community. Join our volunteer program 
                to help teach coding and digital literacy to underserved communities.
              </p>
            </div>
            
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{volunteerProgram.title}</CardTitle>
                    <p className="text-muted-foreground">{volunteerProgram.commitment}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{volunteerProgram.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3">What You'll Do:</h4>
                    <ul className="space-y-2">
                      {volunteerProgram.activities.map((activity, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                          <span className="text-sm text-muted-foreground">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">What We're Looking For:</h4>
                    <ul className="space-y-2">
                      {volunteerProgram.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                          <span className="text-sm text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button onClick={() => onNavigate('contact-volunteer')}>
                    Join Our Volunteer Program
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Don't See Your Perfect Role?</h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for talented individuals who share our passion for innovation. 
              Send us your resume and let us know how you'd like to contribute to our mission.
            </p>
            <Button onClick={() => onNavigate('contact-sales')} size="lg">
              Send Your Resume
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}