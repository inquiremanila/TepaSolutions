import { motion, useInView } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github, Play } from 'lucide-react';
import { projects } from './data/projects-data';
import { FoodDeliveryDemo } from './demos/FoodDeliveryDemo';
import { AdminDashboardDemo } from './demos/AdminDashboardDemo';
import { DentalWebsiteDemo } from './demos/DentalWebsiteDemo';
import { WorkflowAutomationDemo } from './demos/WorkflowAutomationDemo';
import { SEODemo } from './demos/SEODemo';
import { useRef, useState } from 'react';

const demoComponents = {
  FoodDeliveryDemo,
  AdminDashboardDemo,
  DentalWebsiteDemo,
  WorkflowAutomationDemo,
  SEODemo
};

// Mapping between demo component and service page
const demoToServiceMap: { [key: string]: string } = {
  'FoodDeliveryDemo': 'app-dev',
  'AdminDashboardDemo': 'web-app', 
  'DentalWebsiteDemo': 'web-dev',
  'SEODemo': 'seo'
};

export function Portfolio() {
  const [liveDemoStates, setLiveDemoStates] = useState<{ [key: string]: boolean }>({});

  const toggleLiveDemo = (projectId: string) => {
    setLiveDemoStates(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4">Demos</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our demos to get a feel for what we do. These examples show the kind of apps and solutions we build.
          </p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectDemo 
              key={project.id} 
              project={project} 
              index={index} 
              isLiveDemo={liveDemoStates[project.id] || false}
              onToggleLiveDemo={() => toggleLiveDemo(project.id)}
            />
          ))}
        </div>


      </div>
    </section>
  );
}

function ProjectDemo({ 
  project, 
  index, 
  isLiveDemo, 
  onToggleLiveDemo 
}: { 
  project: any; 
  index: number; 
  isLiveDemo: boolean;
  onToggleLiveDemo: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-20% 0px -20% 0px" 
  });

  const DemoComponent = demoComponents[project.demoComponent as keyof typeof demoComponents];
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      className="min-h-screen flex items-center py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto ${
        isReversed ? 'lg:grid-flow-col-dense' : ''
      } ${index >= 1 ? 'px-5' : ''}`}>
        {/* Demo Container */}
        <motion.div
          className={`flex justify-center ${isReversed ? 'lg:col-start-2' : ''}`}
          initial={{ x: isReversed ? 100 : -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            {/* Device Frame for Mobile Apps */}
            {project.category === 'mobile' ? (
              <div className="relative scale-75 sm:scale-90 lg:scale-100">
                <DemoComponent isVisible={isInView} isLiveDemo={isLiveDemo} />
                {/* Phone Shadow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-black/20 to-transparent rounded-[3rem] blur-xl -z-10" />
              </div>
            ) : project.category === 'automation' ? (
              /* Automation Flow Frame */
              <div className="relative scale-50 sm:scale-75 lg:scale-90 xl:scale-100">
                <DemoComponent isVisible={isInView} />
                {/* Automation Shadow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-2xl -z-10" />
              </div>
            ) : project.category === 'seo' ? (
              /* SEO Demo Frame */
              <div className="relative scale-75 sm:scale-90 lg:scale-100">
                <DemoComponent isVisible={isInView} isLiveDemo={isLiveDemo} />
                {/* SEO Shadow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-xl -z-10" />
              </div>
            ) : (
              /* Desktop Browser Frame */
              <div className="relative scale-50 sm:scale-75 lg:scale-90 xl:scale-100">
                <DemoComponent isVisible={isInView} isLiveDemo={isLiveDemo} />
                {/* Desktop Shadow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-black/20 to-transparent rounded-xl blur-2xl -z-10" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Project Info */}
        <motion.div
          className={`space-y-6 px-4 lg:px-0 ${isReversed ? 'lg:col-start-1' : ''}`}
          initial={{ x: isReversed ? -100 : 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div>
            <Badge className="mb-4" variant="outline">
              {project.type}
            </Badge>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {project.title}
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            <motion.div
              className="p-4 bg-muted/50 rounded-lg border border-border"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="font-semibold mb-2">
                {project.category === 'automation' ? '🤖 Automation Flow' : 
                 project.category === 'seo' ? '📊 SEO Strategy Presentation' : 
                 '✨ Interactive Demo'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {project.category === 'automation' 
                  ? "Watch this automated workflow demonstration that shows how we optimize business processes and improve efficiency through intelligent automation."
                  : project.category === 'seo'
                    ? "View our comprehensive SEO strategy presentation that demonstrates how we optimize your website for better search engine rankings and increased organic traffic."
                    : isLiveDemo 
                      ? "You can now interact with the demo! Navigate through the app to experience the full user journey."
                      : "This demo auto-plays when scrolled into view, showcasing the complete user experience and key features of the application."
                }
              </p>
            </motion.div>

            <div className="flex gap-4">
              {project.category === 'automation' ? (
                <Button 
                  className="group" 
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('navigateToAutomation'));
                  }}
                >
                  <ExternalLink className="size-4 mr-2 group-hover:rotate-45 transition-transform" />
                  Explore Automation Solutions
                </Button>
              ) : project.category === 'seo' ? (
                <Button 
                  className="group"
                  onClick={() => {
                    const serviceKey = demoToServiceMap[project.demoComponent];
                    if (serviceKey) {
                      window.dispatchEvent(new CustomEvent('navigateToService', { detail: serviceKey }));
                    }
                  }}
                >
                  <ExternalLink className="size-4 mr-2 group-hover:rotate-45 transition-transform" />
                  Explore SEO Solutions
                </Button>
              ) : (
                <>
                  <Button 
                    className="group"
                    onClick={onToggleLiveDemo}
                    variant={isLiveDemo ? "outline" : "default"}
                  >
                    {isLiveDemo ? (
                      <>
                        <ExternalLink className="size-4 mr-2" />
                        Exit Live Demo
                      </>
                    ) : (
                      <>
                        <Play className="size-4 mr-2" />
                        Try Live Demo
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="group"
                    onClick={() => {
                      const serviceKey = demoToServiceMap[project.demoComponent];
                      if (serviceKey) {
                        window.dispatchEvent(new CustomEvent('navigateToService', { detail: serviceKey }));
                      }
                    }}
                  >
                    <ExternalLink className="size-4 mr-2 group-hover:rotate-45 transition-transform" />
                    Explore More
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}