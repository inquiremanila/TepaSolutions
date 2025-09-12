import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Users, Target, Zap, Heart, TrendingUp, Globe, Award, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface AboutPageProps {
  onNavigate: (target: string) => void;
}

const values = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Innovation First",
    description: "We explore and adapt to new technologies thoughtfully, applying them only where they create real value for our clients."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Client-Centered",
    description: "We listen closely, communicate openly, and design solutions around our clients' actual needs—not one-size-fits-all promises."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Excellence Driven",
    description: "We hold ourselves accountable to deliver dependable results, focusing on quality and consistency in both work and service."
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Legacy & Values",
    description: "We operate with honesty and integrity, aiming to build solutions—and relationships—that last well beyond project delivery."
  }
];

const futureGoals = [
  { 
    id: 1, 
    icon: <TrendingUp className="w-6 h-6" />,
    goal: "AI Integration Leadership", 
    description: "Become the leading provider of AI-powered business automation solutions in Southeast Asia" 
  },
  { 
    id: 2, 
    icon: <Globe className="w-6 h-6" />,
    goal: "Regional Expansion", 
    description: "Expand our client base across Southeast Asia, serving businesses of all sizes with innovative technology solutions" 
  },
  { 
    id: 3, 
    icon: <Users className="w-6 h-6" />,
    goal: "Remote-First Excellence", 
    description: "Build a world-class remote team that delivers exceptional results for clients globally" 
  },
  { 
    id: 4, 
    icon: <Target className="w-6 h-6" />,
    goal: "Technology Accessibility", 
    description: "Make enterprise-grade technology solutions accessible and affordable for small and medium businesses" 
  },
  { 
    id: 5, 
    icon: <Award className="w-6 h-6" />,
    goal: "Industry Recognition", 
    description: "Establish Tepa Solutions as a recognized leader in business technology transformation and innovation" 
  },
  { 
    id: 6, 
    icon: <BookOpen className="w-6 h-6" />,
    goal: "Community Impact", 
    description: "Give back to our community through pro-bono work for non-profits and mentorship opportunities for young professionals" 
  }
];

export function AboutPage({ onNavigate }: AboutPageProps) {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Tepa Solutions
            </h1>
            <p className="text-xl text-muted-foreground">
              Named after our founder's beloved late grandmother, Tepa Solutions is a growing technology startup founded in 2024, dedicated to transforming businesses through innovative software solutions while educating the next generation of innovators.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Tepa Solutions was founded with a mission to bridge the gap between complex technology and practical business needs. With extensive experience in software development and business strategy, our founder Jerrie recognized that many businesses struggle with outdated systems and inefficient processes that hold them back from reaching their potential.
              </p>
              <p>
                What started as a vision to help businesses leverage technology more effectively has evolved into a comprehensive technology consultancy serving clients across the Philippines and beyond.
              </p>
              <p>
                Today, we specialize in custom software development, business automation, AI integration, and digital transformation strategies that help our clients streamline operations, increase efficiency, and accelerate growth.
              </p>
              
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-lg mt-12">
                <h3 className="text-xl font-bold mb-4 text-foreground">Our Mission:</h3>
                <p className="italic text-lg mb-4">
                  "To empower businesses with innovative technology solutions that simplify complexity, drive efficiency, and unlock new opportunities for growth."
                </p>
                <p className="text-primary font-medium">— Jerrie M., Founder & CEO</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core values guide every decision we make and every solution we build for our clients.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                      {value.icon}
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Goals & Vision */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Future Goals & Vision</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              As a rapidly growing startup, we have ambitious goals to expand our impact and become the go-to technology partner for businesses across the region.
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {futureGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                        {goal.icon}
                      </div>
                      <h4 className="font-bold text-primary mb-3">{goal.goal}</h4>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Office Location */}
      <div className="py-16 bg-muted/30" id="office-locations">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Office</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit us at our modern office in the heart of BGC, Taguig - 
              the Philippines' premier business district.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Tepa Solutions BGC</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Address</p>
                            <p className="text-muted-foreground text-sm">
                              26th Floor, High Street South Corporate Plaza<br />
                              BGC, Taguig City, Philippines 1634
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-muted-foreground text-sm">+63 912 345 678</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-muted-foreground text-sm">hello@tepasolutions.asia</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Office Hours</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                    
                    <div>
                      <Button onClick={() => onNavigate('contact-sales')}>
                        Schedule a Meeting
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🏢</div>
                      <p className="text-muted-foreground">
                        Modern office space in the heart of BGC's business district
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how we can help streamline your operations and accelerate your growth with innovative technology solutions. Get in touch with our team today.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={() => onNavigate('contact-sales')} size="lg">
                Tell Us About Your Projects
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate('careers')}>
                Join Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}