import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Target, BarChart3, Globe, Download, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Tepabot } from '../Tepabot';

interface InvestorsPageProps {
  onNavigate: (target: string) => void;
}

const financialHighlights = [
  {
    metric: "Revenue Growth",
    value: "185%",
    period: "YoY 2024",
    trend: "up",
    description: "Consistent growth driven by enterprise automation solutions"
  },
  {
    metric: "Client Retention",
    value: "94%",
    period: "2024",
    trend: "up",
    description: "High customer satisfaction and long-term partnerships"
  },
  {
    metric: "Market Expansion",
    value: "3x",
    period: "2022-2024",
    trend: "up",
    description: "Geographic and sector diversification"
  },
  {
    metric: "Profit Margin",
    value: "28%",
    period: "Q4 2024",
    trend: "up",
    description: "Improved operational efficiency and premium service positioning"
  }
];

const businessMetrics = [
  {
    title: "Total Projects Delivered",
    value: "200+",
    growth: "+150% from 2023"
  },
  {
    title: "Active Enterprise Clients",
    value: "50+",
    growth: "+60% from 2023"
  },
  {
    title: "Team Size",
    value: "25",
    growth: "+67% from 2023"
  },
  {
    title: "Technology Partners",
    value: "12",
    growth: "New partnerships in AI & Cloud"
  }
];

const marketOpportunity = [
  {
    segment: "Business Automation Market",
    size: "$13.2B",
    growth: "11.5% CAGR",
    description: "Growing demand for workflow automation and AI integration"
  },
  {
    segment: "Mobile App Development",
    size: "$365B",
    growth: "13.4% CAGR",
    description: "Increasing mobile-first business strategies"
  },
  {
    segment: "Digital Transformation",
    size: "$880B",
    growth: "19.1% CAGR",
    description: "Post-pandemic acceleration of digital adoption"
  }
];

const competitiveAdvantages = [
  {
    title: "Deep Industry Expertise",
    description: "Specialized knowledge in healthcare, finance, and manufacturing automation",
    icon: <Target className="w-6 h-6" />
  },
  {
    title: "End-to-End Solutions",
    description: "Complete service offering from strategy to implementation and support",
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: "AI-First Approach",
    description: "Early adoption and integration of AI technologies in all solutions",
    icon: <BarChart3 className="w-6 h-6" />
  },
  {
    title: "Premium Positioning",
    description: "Focus on high-value, complex projects with enterprise clients",
    icon: <TrendingUp className="w-6 h-6" />
  }
];

const growthStrategy = [
  {
    phase: "Phase 1: Market Leadership",
    timeline: "2025-2026",
    objectives: [
      "Become #1 automation provider in Philippines",
      "Expand to 100+ enterprise clients",
      "Launch AI-powered automation platform",
      "Establish innovation labs"
    ],
    investment: "₱50M"
  },
  {
    phase: "Phase 2: Regional Expansion",
    timeline: "2026-2027",
    objectives: [
      "Enter Southeast Asian markets",
      "Establish offices in Singapore and Thailand",
      "Partner with regional system integrators",
      "Build local development teams"
    ],
    investment: "₱150M"
  },
  {
    phase: "Phase 3: Platform Scale",
    timeline: "2027-2028",
    objectives: [
      "Launch SaaS automation platform",
      "Achieve 1000+ platform subscribers",
      "Develop partner ecosystem",
      "Explore strategic acquisitions"
    ],
    investment: "₱300M"
  }
];

const investmentHighlights = [
  "Experienced leadership team with proven track record",
  "Strong financial performance with positive cash flow",
  "Scalable business model with recurring revenue streams",
  "Large and growing market opportunity",
  "Differentiated technology platform and IP",
  "Strategic partnerships with major technology vendors"
];

export function InvestorsPage({ onNavigate }: InvestorsPageProps) {
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
            <Badge className="mb-4">Investor Relations</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Investing in the Future of Business Automation
            </h1>
            <p className="text-xl text-muted-foreground">
              Join us as we transform how businesses operate through innovative technology solutions. 
              Discover the investment opportunity in Southeast Asia's fastest-growing automation company.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Financial Highlights */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Financial Highlights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Strong financial performance demonstrating sustainable growth and operational excellence.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.metric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      {highlight.metric}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-primary">{highlight.value}</span>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{highlight.period}</p>
                    <p className="text-xs text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-8 space-y-8">
              {/* Investment Thesis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-primary" />
                    Investment Thesis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Tepa Solutions is positioned to capitalize on the massive digital transformation 
                    opportunity in Southeast Asia. Our unique combination of deep technical expertise, 
                    industry specialization, and AI-first approach creates significant competitive advantages 
                    in the rapidly growing business automation market.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Investment Highlights</h4>
                      <ul className="space-y-2">
                        {investmentHighlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                            <span className="text-sm text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Market Opportunity</h4>
                      <div className="space-y-4">
                        {marketOpportunity.map((market, index) => (
                          <div key={index} className="bg-muted/50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-medium text-sm">{market.segment}</h5>
                              <Badge variant="outline">{market.growth}</Badge>
                            </div>
                            <div className="text-2xl font-bold text-primary mb-1">{market.size}</div>
                            <p className="text-xs text-muted-foreground">{market.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Competitive Advantages */}
              <Card>
                <CardHeader>
                  <CardTitle>Competitive Advantages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {competitiveAdvantages.map((advantage, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                          {advantage.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">{advantage.title}</h4>
                          <p className="text-sm text-muted-foreground">{advantage.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="financials" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {businessMetrics.map((metric, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                          <div>
                            <h4 className="font-medium">{metric.title}</h4>
                            <p className="text-sm text-muted-foreground">{metric.growth}</p>
                          </div>
                          <div className="text-2xl font-bold text-primary">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Business Automation</span>
                        <span className="font-bold">45%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Mobile App Development</span>
                        <span className="font-bold">30%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Web Development</span>
                        <span className="font-bold">20%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Other Services</span>
                        <span className="font-bold">5%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="strategy" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Growth Strategy & Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {growthStrategy.map((phase, index) => (
                      <div key={index} className="border-l-4 border-primary pl-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold">{phase.phase}</h3>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">{phase.timeline}</Badge>
                            <Badge className="bg-green-500">{phase.investment}</Badge>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {phase.objectives.map((objective, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-sm text-muted-foreground">{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Annual Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Annual Report 2024</h4>
                          <p className="text-sm text-muted-foreground">Complete financial and operational review</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Q4 2024 Results</h4>
                          <p className="text-sm text-muted-foreground">Quarterly earnings and highlights</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                        <div>
                          <h4 className="font-medium">Annual Report 2023</h4>
                          <p className="text-sm text-muted-foreground">Previous year review</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Investor Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                        <Calendar className="w-8 h-8 text-primary" />
                        <div>
                          <h4 className="font-medium">Q1 2025 Earnings Call</h4>
                          <p className="text-sm text-muted-foreground">April 15, 2025 at 2:00 PM PHT</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <Calendar className="w-8 h-8 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Annual Investor Meeting</h4>
                          <p className="text-sm text-muted-foreground">June 20, 2025 at BGC Office</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <Calendar className="w-8 h-8 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Tech Innovation Showcase</h4>
                          <p className="text-sm text-muted-foreground">September 10, 2025</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
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
            <h2 className="text-3xl font-bold mb-4">Interested in Learning More?</h2>
            <p className="text-muted-foreground mb-8">
              Contact our investor relations team to discuss investment opportunities, 
              request additional materials, or schedule a meeting with our leadership team.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => onNavigate('contact-investor')} size="lg">
                Contact Investor Relations
              </Button>
              <Button variant="outline" size="lg">
                Download Investor Deck
              </Button>
            </div>
            
            <div className="mt-8 text-sm text-muted-foreground">
              <p>Investor Relations Contact:</p>
              <p>Email: investors@tepasolutions.com | Phone: +63 2 8558 1237</p>
            </div>
          </motion.div>
        </div>
      </div>
      <Tepabot />
    </div>
  );
}