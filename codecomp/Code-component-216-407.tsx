import { motion } from 'motion/react';
import { TrendingUp, DollarSign, Users, Target, BarChart3, Globe, Download, Calendar } from 'lucide-react';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../src/components/ui/tabs';

interface InvestorsPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
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
    period: "Since 2024",
    trend: "up",
    description: "Expanded operations across Southeast Asia"
  },
  {
    metric: "Team Growth",
    value: "250%",
    period: "Since launch",
    trend: "up",
    description: "Rapid scaling of technical and business teams"
  }
];

const milestones = [
  {
    date: "Q1 2024",
    title: "Company Founded",
    description: "Tepa Solutions officially launched with initial focus on business automation"
  },
  {
    date: "Q2 2024",
    title: "First Enterprise Client",
    description: "Secured first major enterprise automation contract"
  },
  {
    date: "Q3 2024",
    title: "Team Expansion",
    description: "Grew team to 12 professionals across development and business"
  },
  {
    date: "Q4 2024",
    title: "Revenue Milestone",
    description: "Achieved sustainable monthly recurring revenue"
  },
  {
    date: "Q1 2025",
    title: "Market Leadership",
    description: "Established as leading automation provider in Philippines"
  }
];

export function InvestorsPage({ navigate }: InvestorsPageProps) {
  const handleContactClick = () => {
    if (navigate) {
      navigate('/contact-us/investors');
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
            <Badge className="mb-4">Investor Relations</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Invest in the Future of Business Automation
            </h1>
            <p className="text-xl text-muted-foreground">
              Join us in revolutionizing how businesses operate through intelligent automation solutions. 
              Tepa Solutions is positioned for exponential growth in the rapidly expanding automation market.
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
              Strong financial performance demonstrating sustainable growth and market validation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {financialHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.metric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{highlight.metric}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">{highlight.value}</div>
                    <div className="text-sm text-muted-foreground mb-3">{highlight.period}</div>
                    <p className="text-xs text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Opportunity */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Investment Opportunity</h2>
            
            <Tabs defaultValue="market" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="market">Market</TabsTrigger>
                <TabsTrigger value="business">Business Model</TabsTrigger>
                <TabsTrigger value="growth">Growth Strategy</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
              </TabsList>
              
              <TabsContent value="market" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Market Opportunity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Market Size</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Global automation market: $214B by 2025</li>
                          <li>• Southeast Asia automation: $12B opportunity</li>
                          <li>• Philippines market growing 25% annually</li>
                          <li>• SME automation largely untapped</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Competitive Advantage</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Local market expertise and relationships</li>
                          <li>• Affordable solutions for SMEs</li>
                          <li>• Rapid implementation methodology</li>
                          <li>• Comprehensive service offering</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="business" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Business Model
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Revenue Streams</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Custom development projects</li>
                          <li>• Automation consulting</li>
                          <li>• Recurring maintenance contracts</li>
                          <li>• Training and workshops</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Client Mix</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 40% Enterprise clients</li>
                          <li>• 45% SME businesses</li>
                          <li>• 15% Government/NGO</li>
                          <li>• High retention rates</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Service Areas</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Business process automation</li>
                          <li>• Web application development</li>
                          <li>• Mobile app development</li>
                          <li>• AI integration consulting</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="growth" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Growth Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Short-term (6-12 months)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Expand team to 25 professionals</li>
                          <li>• Launch AI automation services</li>
                          <li>• Establish partnerships with system integrators</li>
                          <li>• Enter Malaysian and Thai markets</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Long-term (12-24 months)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Regional market leadership position</li>
                          <li>• Proprietary automation platform launch</li>
                          <li>• Strategic acquisitions consideration</li>
                          <li>• IPO preparation and evaluation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="financials" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Financial Projections
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">₱15M</div>
                        <div className="text-sm text-muted-foreground">2024 Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">₱45M</div>
                        <div className="text-sm text-muted-foreground">2025 Projected</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">₱120M</div>
                        <div className="text-sm text-muted-foreground">2026 Target</div>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Conservative projections based on current growth trajectory and market expansion plans. 
                        Detailed financial statements available to qualified investors under NDA.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      {/* Company Milestones */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Company Milestones</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key achievements and milestones that demonstrate our rapid growth and market validation.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.date}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex gap-8 items-center ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-24 flex-shrink-0 text-right">
                    <Badge variant="outline">{milestone.date}</Badge>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{milestone.title}</h4>
                    <p className="text-muted-foreground text-sm">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Invest?</h2>
            <p className="text-muted-foreground mb-8">
              Join us in building the future of business automation. Get in touch to learn more about 
              investment opportunities and access detailed financial information.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={handleContactClick}>
                Schedule Investor Meeting
                <Calendar className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Download Pitch Deck
                <Download className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              All financial information subject to NDA requirements
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}