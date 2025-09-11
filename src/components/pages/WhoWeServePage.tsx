import { useState } from 'react';
import { motion } from 'motion/react';
import { Building, Users, TrendingUp, Target, Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface WhoWeServePageProps {
  initialSection?: 'overview' | 'business-size' | 'industry';
  onNavigate: (target: string) => void;
}

const businessSizes = [
  {
    title: "Startups & Small Businesses",
    description: "1-50 employees",
    icon: <Zap className="w-8 h-8" />,
    features: [
      "MVP Development",
      "Cost-effective solutions",
      "Rapid prototyping",
      "Scalable architecture",
      "Cloud-first approach"
    ],
    solutions: [
      "Simple website to establish online presence",
      "Basic mobile app for customer engagement",
      "Essential automation for daily operations",
      "Founder-friendly development process",
      "Growth-ready technology foundation"
    ],
    caseStudy: {
      title: "Local Restaurant Chain Growth",
      description: "Helped a 3-location restaurant chain implement online ordering and delivery management, increasing revenue by 40% in 6 months."
    }
  },
  {
    title: "Medium-Sized Enterprises",
    description: "51-500 employees",
    icon: <Building className="w-8 h-8" />,
    features: [
      "Custom enterprise solutions",
      "Integration capabilities",
      "Advanced automation",
      "Multi-platform deployment",
      "Team collaboration tools"
    ],
    solutions: [
      "Comprehensive business management systems",
      "Advanced workflow automation",
      "Custom mobile applications for teams",
      "Data analytics and reporting tools",
      "Integrated communication platforms"
    ],
    caseStudy: {
      title: "Healthcare Network Digitization",
      description: "Built integrated patient management system for 200-employee healthcare network, reducing administrative time by 60%."
    }
  },
  {
    title: "Large Corporations",
    description: "500+ employees",
    icon: <Globe className="w-8 h-8" />,
    features: [
      "Enterprise-grade security",
      "Complex system integration",
      "Scalable infrastructure",
      "Advanced analytics",
      "24/7 support"
    ],
    solutions: [
      "Enterprise resource planning systems",
      "Large-scale automation platforms",
      "Multi-regional application deployment",
      "Advanced AI and machine learning integration",
      "Comprehensive digital transformation strategies"
    ],
    caseStudy: {
      title: "Manufacturing Giant Automation",
      description: "Implemented AI-powered supply chain automation for 2000+ employee manufacturer, saving $2M annually."
    }
  }
];

const industries = [
  {
    name: "Healthcare",
    icon: "🏥",
    description: "Digital solutions for better patient care and operational efficiency",
    solutions: [
      "Patient management systems",
      "Telemedicine platforms",
      "Medical record digitization",
      "Appointment scheduling automation",
      "Compliance management tools"
    ],
    challenges: [
      "HIPAA compliance requirements",
      "Integration with existing systems",
      "Real-time data processing",
      "Security and privacy concerns"
    ]
  },
  {
    name: "Education",
    icon: "🎓",
    description: "Technology solutions that enhance learning and administrative efficiency",
    solutions: [
      "Learning management systems",
      "Student information systems",
      "Online examination platforms",
      "Virtual classroom solutions",
      "Administrative automation"
    ],
    challenges: [
      "Accessibility requirements",
      "Multi-device compatibility",
      "Data privacy for minors",
      "Scalable infrastructure"
    ]
  },
  {
    name: "E-commerce & Retail",
    icon: "🛒",
    description: "Comprehensive solutions for modern retail operations",
    solutions: [
      "Custom e-commerce platforms",
      "Inventory management systems",
      "Customer loyalty programs",
      "Payment processing integration",
      "Supply chain automation"
    ],
    challenges: [
      "High-traffic handling",
      "Payment security",
      "Multi-channel integration",
      "Real-time inventory sync"
    ]
  },
  {
    name: "Financial Services",
    icon: "💰",
    description: "Secure and compliant solutions for financial institutions",
    solutions: [
      "Digital banking platforms",
      "Investment portfolio management",
      "Risk assessment automation",
      "Fraud detection systems",
      "Regulatory compliance tools"
    ],
    challenges: [
      "Regulatory compliance",
      "High-security requirements",
      "Real-time transaction processing",
      "Legacy system integration"
    ]
  },
  {
    name: "Manufacturing",
    icon: "🏭",
    description: "Smart manufacturing solutions for Industry 4.0",
    solutions: [
      "Production management systems",
      "Quality control automation",
      "Predictive maintenance platforms",
      "Supply chain optimization",
      "IoT integration solutions"
    ],
    challenges: [
      "Industrial IoT integration",
      "Real-time monitoring needs",
      "Safety compliance",
      "Legacy equipment compatibility"
    ]
  },
  {
    name: "Professional Services",
    icon: "💼",
    description: "Streamlined operations for service-based businesses",
    solutions: [
      "Client management systems",
      "Project tracking platforms",
      "Time and billing automation",
      "Document management systems",
      "Communication platforms"
    ],
    challenges: [
      "Client data security",
      "Multi-project management",
      "Billing complexity",
      "Team collaboration needs"
    ]
  }
];

export function WhoWeServePage({ initialSection = 'overview', onNavigate }: WhoWeServePageProps) {
  const [activeTab, setActiveTab] = useState(initialSection);

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
            <Badge className="mb-4">Who We Serve</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Solutions for Every Scale of Business
            </h1>
            <p className="text-xl text-muted-foreground">
              From startups building their first digital presence to enterprises transforming 
              entire workflows, we create tailored solutions that fit your unique needs and scale.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 z-20 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="business-size" id="business-size">Business Size</TabsTrigger>
              <TabsTrigger value="industry" id="industry">Industry</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="py-16">
            <div className="container mx-auto px-6">
              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-4 gap-8 mb-16"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">200+</div>
                  <div className="text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Industries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-muted-foreground">Support Available</div>
                </div>
              </motion.div>

              {/* Our Approach */}
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold mb-6">Our Approach to Every Business</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We believe that every business, regardless of size or industry, deserves access to 
                  cutting-edge technology solutions. Our approach is always tailored to your specific 
                  needs, budget, and growth trajectory.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader>
                      <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                      <CardTitle>Understand Your Needs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        We start by deeply understanding your business challenges, goals, and constraints.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                      <CardTitle>Design Custom Solutions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Our solutions are never one-size-fits-all. We craft technology that fits your unique situation.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                      <CardTitle>Scale With You</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Our solutions grow with your business, adapting to changing needs and increasing demands.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('business-size')}>
                  <CardHeader>
                    <Building className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>Solutions by Business Size</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Discover how our solutions scale from startup MVPs to enterprise-grade systems.
                    </p>
                    <Button variant="outline">
                      Explore Business Sizes
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('industry')}>
                  <CardHeader>
                    <Users className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>Solutions by Industry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      See how we address the unique challenges and requirements of different industries.
                    </p>
                    <Button variant="outline">
                      Explore Industries
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Business Size Tab */}
        <TabsContent value="business-size">
          <div className="py-16" id="business-size">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Solutions for Every Business Size</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Whether you're just starting out or managing a large enterprise, 
                  we have the right solutions to help you build, automate, and scale your operations.
                </p>
              </div>

              <div className="space-y-16">
                {businessSizes.map((size, index) => (
                  <motion.div
                    key={size.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                  >
                    <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                          {size.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{size.title}</h3>
                          <p className="text-muted-foreground">{size.description}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">What We Offer:</h4>
                        <div className="grid gap-2">
                          {size.solutions.map((solution, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-sm">{solution}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {size.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary">{feature}</Badge>
                        ))}
                      </div>
                      
                      <Button onClick={() => onNavigate('contact-sales')}>
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Success Story</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <h4 className="font-semibold mb-2">{size.caseStudy.title}</h4>
                          <p className="text-muted-foreground text-sm">{size.caseStudy.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Industry Tab */}
        <TabsContent value="industry">
          <div className="py-16" id="industry">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Industry-Specific Solutions</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Every industry has unique challenges and requirements. 
                  Our solutions are designed with deep industry knowledge to address your specific needs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industries.map((industry, index) => (
                  <motion.div
                    key={industry.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="text-4xl mb-4">{industry.icon}</div>
                        <CardTitle>{industry.name}</CardTitle>
                        <p className="text-muted-foreground text-sm">{industry.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Our Solutions:</h4>
                          <div className="space-y-1">
                            {industry.solutions.slice(0, 3).map((solution, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-xs text-muted-foreground">{solution}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Key Challenges We Address:</h4>
                          <div className="space-y-1">
                            {industry.challenges.slice(0, 2).map((challenge, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Shield className="w-3 h-3 text-primary" />
                                <span className="text-xs text-muted-foreground">{challenge}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('contact-sales')}>
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-muted-foreground mb-8">
              No matter your business size or industry, we have the expertise and solutions 
              to help you achieve your digital transformation goals.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => onNavigate('contact-sales')} size="lg">
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate('automation')}>
                Explore Solutions
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}