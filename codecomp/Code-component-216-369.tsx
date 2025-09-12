import { useState } from 'react';
import { motion } from 'motion/react';
import { Building, Users, TrendingUp, Target, Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../src/components/ui/tabs';

interface WhoWeServePageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
}

const businessSizes = [
  {
    title: "Startups & Small Businesses",
    description: "1-50 employees",
    icon: <Zap className="w-8 h-8" />,
    features: [
      "MVP Development",
      "Affordable automation solutions",
      "Scalable architecture planning",
      "Growth-focused strategies"
    ],
    solutions: [
      "Web application development",
      "Basic process automation",
      "Digital presence establishment",
      "Cost-effective integrations"
    ]
  },
  {
    title: "Medium Enterprises",
    description: "50-500 employees",
    icon: <Building className="w-8 h-8" />,
    features: [
      "Process optimization",
      "System integrations",
      "Team productivity tools",
      "Compliance automation"
    ],
    solutions: [
      "Workflow automation platforms",
      "Custom business applications",
      "Data analytics solutions",
      "Multi-department integrations"
    ]
  },
  {
    title: "Large Enterprises",
    description: "500+ employees",
    icon: <Globe className="w-8 h-8" />,
    features: [
      "Enterprise-grade solutions",
      "Complex system integrations",
      "Advanced security measures",
      "Multi-location support"
    ],
    solutions: [
      "Enterprise automation platforms",
      "Legacy system modernization",
      "Advanced AI integrations",
      "Global deployment strategies"
    ]
  }
];

const industries = [
  {
    name: "Healthcare",
    icon: "🏥",
    description: "Digital health solutions and patient management systems",
    solutions: [
      "Electronic health records",
      "Appointment scheduling automation",
      "Patient communication systems",
      "Compliance and reporting tools"
    ]
  },
  {
    name: "Financial Services",
    icon: "🏦",
    description: "Fintech solutions and financial automation",
    solutions: [
      "Payment processing systems",
      "Risk assessment automation",
      "Customer onboarding workflows",
      "Regulatory compliance tools"
    ]
  },
  {
    name: "Education",
    icon: "🎓",
    description: "EdTech platforms and learning management systems",
    solutions: [
      "Learning management systems",
      "Student information systems",
      "Online assessment platforms",
      "Academic workflow automation"
    ]
  },
  {
    name: "Retail & E-commerce",
    icon: "🛒",
    description: "Online stores and inventory management solutions",
    solutions: [
      "E-commerce platforms",
      "Inventory management systems",
      "Order processing automation",
      "Customer relationship management"
    ]
  },
  {
    name: "Manufacturing",
    icon: "🏭",
    description: "Production optimization and supply chain management",
    solutions: [
      "Production planning systems",
      "Quality control automation",
      "Supply chain optimization",
      "Equipment monitoring platforms"
    ]
  },
  {
    name: "Professional Services",
    icon: "💼",
    description: "Client management and service delivery automation",
    solutions: [
      "Client portal development",
      "Project management systems",
      "Billing and invoicing automation",
      "Document management platforms"
    ]
  }
];

export function WhoWeServePage({ navigate }: WhoWeServePageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const handleContactClick = () => {
    if (navigate) {
      navigate('/contact-us/sales');
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
            <Badge className="mb-4">Who We Serve</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Solutions for Every Business Size and Industry
            </h1>
            <p className="text-xl text-muted-foreground">
              From startups to Fortune 500 companies, we provide tailored technology solutions 
              that drive growth, efficiency, and innovation across diverse industries worldwide.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="business-size">By Business Size</TabsTrigger>
              <TabsTrigger value="industry">By Industry</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Our Global Reach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">200+</div>
                        <div className="text-muted-foreground">Projects Delivered</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">15+</div>
                        <div className="text-muted-foreground">Industries Served</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">5</div>
                        <div className="text-muted-foreground">Countries</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Our Approach
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Understand your unique business needs and challenges</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Design solutions that scale with your growth</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Implement with minimal disruption to operations</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Provide ongoing support and optimization</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Why Choose Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Local expertise with global standards</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Transparent pricing and project timelines</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Proven track record across industries</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Continuous support and partnership</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="business-size" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-2xl font-bold mb-4">Tailored Solutions for Every Business Size</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    We understand that different business sizes have unique needs, budgets, and growth trajectories.
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {businessSizes.map((size, index) => (
                    <motion.div
                      key={size.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader className="text-center">
                          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                            {size.icon}
                          </div>
                          <CardTitle className="text-xl">{size.title}</CardTitle>
                          <p className="text-muted-foreground">{size.description}</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3">Key Features</h4>
                            <ul className="space-y-2">
                              {size.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                                  <span className="text-muted-foreground">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Popular Solutions</h4>
                            <ul className="space-y-2">
                              {size.solutions.map((solution, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                                  <span className="text-muted-foreground">{solution}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="industry" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-2xl font-bold mb-4">Industry Expertise</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Deep industry knowledge enables us to deliver solutions that address specific sector challenges and opportunities.
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
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="text-4xl mb-3">{industry.icon}</div>
                          <CardTitle className="text-lg">{industry.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{industry.description}</p>
                        </CardHeader>
                        <CardContent>
                          <h4 className="font-semibold mb-3 text-sm">Specialized Solutions</h4>
                          <ul className="space-y-2">
                            {industry.solutions.map((solution, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{solution}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              Whatever your business size or industry, we have the expertise and solutions to help you succeed. 
              Let's discuss how we can accelerate your digital transformation.
            </p>
            <Button size="lg" onClick={handleContactClick}>
              Schedule a Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}