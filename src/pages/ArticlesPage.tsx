import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowRight, Tag, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface ArticlesPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
}

export const articles = [
  {
    id: 1,
    slug: 'ai-transforming-workforce-2025',
    title: "How AI is Transforming the Workforce in 2025",
    excerpt: "Explore the revolutionary impact of artificial intelligence on modern workplaces, from automation to augmented decision-making, and discover how businesses can adapt to thrive in the AI-driven future.",
    featuredImage: "https://images.unsplash.com/photo-1696272440000-0808a203c852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwd29ya3BsYWNlJTIwdHJhbnNmb3JtYXRpb258ZW58MXx8fHwxNzU3NTQ4MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `
      <h2>The AI Revolution in the Modern Workplace</h2>
      <img src="https://images.unsplash.com/photo-1531535807748-218331acbcb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU3NTQ4MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Team collaboration with AI technology" class="w-full h-64 object-cover rounded-lg my-6" />
      <p>As we navigate through 2025, artificial intelligence continues to reshape how we work, collaborate, and innovate. The transformation isn't just about replacing human tasks—it's about augmenting human capabilities and creating entirely new opportunities for growth and efficiency.</p>
      
      <h3>Key Areas of AI Transformation</h3>
      
      <h4>1. Intelligent Automation</h4>
      <p>AI-powered automation has evolved beyond simple rule-based systems. Modern AI can handle complex decision-making processes, analyze unstructured data, and adapt to changing business conditions in real-time.</p>
      
      <h4>2. Enhanced Decision Making</h4>
      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NzU0MDM0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Data analytics dashboard showing business insights" class="w-full h-48 object-cover rounded-lg my-4" />
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
        <li><strong>Invest in Training:</strong> Provide your team with AI literacy programs and hands-on experience with AI tools.</li>
        <li><strong>Foster Collaboration:</strong> Create cross-functional teams that combine human creativity with AI capabilities.</li>
        <li><strong>Start Small:</strong> Begin with pilot projects that demonstrate AI's value before scaling organization-wide.</li>
        <li><strong>Maintain Human-Centricity:</strong> Ensure AI solutions enhance rather than replace human judgment and creativity.</li>
      </ul>
      
      <h3>The Road Ahead</h3>
      
      <p>As AI technology continues to evolve, businesses that embrace this transformation while maintaining focus on human values and ethics will be best positioned for success. The future of work isn't about humans versus machines—it's about humans with machines, creating unprecedented opportunities for innovation and growth.</p>
      
      <p>At Tepa Solutions, we help organizations navigate this AI transformation through custom automation solutions, intelligent workflows, and strategic consulting. Our approach ensures that AI integration enhances your team's capabilities while maintaining the human touch that drives business success.</p>
    `,
    author: "Jerrie Mataya",
    role: "Head of AI Strategy",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["AI", "Workforce", "Automation", "Future of Work"],
    category: "Technology",
    featured: true
  },
  {
    id: 2,
    slug: 'complete-guide-business-process-automation',
    title: "The Complete Guide to Business Process Automation",
    excerpt: "Learn how to identify, design, and implement automated workflows that streamline operations and boost productivity across your organization.",
    featuredImage: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Nlc3MlMjBhdXRvbWF0aW9uJTIwd29ya2Zsb3d8ZW58MXx8fHwxNzU3NTQ4MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `
      <h2>Understanding Business Process Automation</h2>
      <img src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Nlc3MlMjBhdXRvbWF0aW9uJTIwd29ya2Zsb3d8ZW58MXx8fHwxNzU3NTQ4MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Business process automation workflow diagram" class="w-full h-64 object-cover rounded-lg my-6" />
      <p>Business Process Automation (BPA) is the technology-enabled automation of complex business processes and functions beyond simple automation tasks. It goes deeper than basic automation by integrating applications, restructuring labor resources and using software throughout the organization.</p>
      
      <h3>Why Business Process Automation Matters</h3>
      
      <p>In today's competitive landscape, businesses must operate more efficiently than ever before. Manual processes are not just time-consuming—they're prone to errors, inconsistent outcomes, and scaling limitations. BPA addresses these challenges by:</p>
      
      <ul>
        <li>Reducing operational costs by up to 30%</li>
        <li>Improving accuracy and consistency</li>
        <li>Enhancing customer experience through faster service delivery</li>
        <li>Freeing up employees to focus on strategic initiatives</li>
        <li>Providing better visibility into business operations</li>
      </ul>
      
      <h3>Identifying Automation Opportunities</h3>
      
      <p>Not every process is suitable for automation. The best candidates for BPA are processes that are:</p>
      
      <h4>Rule-Based and Repetitive</h4>
      <p>Processes that follow clear, logical rules with minimal exceptions make ideal automation candidates. These include data entry, invoice processing, and report generation.</p>
      
      <h4>High-Volume</h4>
      <p>Processes that occur frequently throughout your business operations provide the greatest ROI when automated. Think customer onboarding, order processing, or employee timekeeping.</p>
      
      <h4>Prone to Human Error</h4>
      <p>Manual processes involving calculations, data transfers, or complex workflows often benefit significantly from automation's consistency and accuracy.</p>
      
      <h3>Implementation Strategy</h3>
      
      <h4>Phase 1: Assessment and Planning</h4>
      <ul>
        <li>Map current processes and identify pain points</li>
        <li>Calculate potential ROI for each automation opportunity</li>
        <li>Prioritize processes based on impact and complexity</li>
        <li>Establish success metrics and KPIs</li>
      </ul>
      
      <h4>Phase 2: Design and Development</h4>
      <ul>
        <li>Create detailed workflow designs</li>
        <li>Select appropriate automation tools and platforms</li>
        <li>Develop and test automation workflows</li>
        <li>Create rollback plans and error handling procedures</li>
      </ul>
      
      <h4>Phase 3: Implementation and Optimization</h4>
      <ul>
        <li>Deploy automation in controlled environments</li>
        <li>Train staff on new processes and tools</li>
        <li>Monitor performance and gather feedback</li>
        <li>Continuously optimize and expand automation scope</li>
      </ul>
      
      <h3>Common Automation Tools and Technologies</h3>
      
      <h4>Robotic Process Automation (RPA)</h4>
      <p>RPA tools like UiPath, Blue Prism, and Automation Anywhere excel at automating rule-based tasks that involve interacting with existing software applications.</p>
      
      <h4>Workflow Management Systems</h4>
      <p>Platforms like Microsoft Power Automate, Zapier, and Nintex help orchestrate complex multi-step processes across different applications and systems.</p>
      
      <h4>Custom Development</h4>
      <p>For unique business requirements, custom automation solutions built with modern frameworks provide maximum flexibility and integration capabilities.</p>
      
      <h3>Measuring Success</h3>
      
      <p>Track these key metrics to evaluate your automation initiatives:</p>
      
      <ul>
        <li><strong>Time Savings:</strong> Reduction in process completion time</li>
        <li><strong>Cost Reduction:</strong> Decreased operational expenses</li>
        <li><strong>Error Rates:</strong> Improvement in accuracy and quality</li>
        <li><strong>Employee Satisfaction:</strong> Reduced mundane tasks and increased job satisfaction</li>
        <li><strong>Customer Experience:</strong> Faster response times and improved service quality</li>
      </ul>
      
      <h3>Getting Started</h3>
      
      <p>Begin your automation journey with a pilot project that has clear business value and manageable complexity. This approach allows you to demonstrate ROI, build internal expertise, and create momentum for larger automation initiatives.</p>
      
      <p>At Tepa Solutions, we help businesses identify the right automation opportunities and implement solutions that deliver measurable results. Our expertise spans RPA, custom workflow development, and integration strategies that transform how your business operates.</p>
    `,
    author: "Manuel Rodriguez",
    role: "Business Automation Consultant",
    date: "2025-01-10",
    readTime: "12 min read",
    tags: ["Automation", "Business Process", "Efficiency", "ROI"],
    category: "Business Strategy",
    featured: false
  },
  {
    id: 3,
    slug: 'mobile-app-development-trends-2025',
    title: "Mobile App Development Trends for 2025",
    excerpt: "Discover the latest trends in mobile app development, from cross-platform frameworks to AI integration and emerging user experience patterns.",
    featuredImage: "https://images.unsplash.com/photo-1726935068680-73cef7e8412b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHRyZW5kc3xlbnwxfHx8fDE3NTc1NDgxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `
      <h2>The Mobile Development Landscape in 2025</h2>
      <p>Mobile app development continues to evolve rapidly, driven by new technologies, changing user expectations, and innovative development frameworks. As we move through 2025, several key trends are shaping how developers build mobile applications and how users interact with them.</p>
      
      <h3>Cross-Platform Development Dominance</h3>
      <h4>React Native Evolution</h4>
      <p>React Native has solidified its position as a leading cross-platform framework, with major improvements in performance and native module integration. The new architecture brings significant performance enhancements and better memory management.</p>
      
      <h4>Flutter's Growing Ecosystem</h4>
      <p>Flutter continues to gain traction with its single codebase approach for mobile, web, and desktop applications. The framework's performance improvements and expanding widget library make it an attractive choice for developers.</p>
      
      <h3>AI Integration in Mobile Apps</h3>
      <p>Artificial intelligence is becoming a standard feature in mobile applications, from personalized recommendations to intelligent voice assistants and automated content generation.</p>
    `,
    author: "Jerrie Mataya",
    role: "Mobile Development Lead",
    date: "2025-01-05",
    readTime: "10 min read",
    tags: ["Mobile Development", "React Native", "Flutter", "UX Design"],
    category: "Development",
    featured: false
  },
  {
    id: 4,
    slug: 'seo-strategies-that-work-2025',
    title: "SEO Strategies That Actually Work in 2025",
    excerpt: "Cut through the noise with proven SEO strategies that deliver real results. From technical optimization to content strategy, we cover it all.",
    featuredImage: "https://images.unsplash.com/photo-1709281847780-2b34c28853c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTRU8lMjBzdHJhdGVneSUyMGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MXx8fHwxNzU3NTQ4MTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `
      <h2>SEO in the Modern Digital Landscape</h2>
      <p>Search engine optimization has evolved significantly, with search engines becoming smarter and user expectations higher. Success in 2025 requires a comprehensive approach that combines technical excellence with high-quality content and user experience optimization.</p>
      
      <h3>Core Web Vitals and Performance</h3>
      <p>Google's Core Web Vitals remain crucial ranking factors. Optimizing for Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) is essential for both user experience and search rankings.</p>
      
      <h3>Content Quality and E-A-T</h3>
      <p>Expertise, Authoritativeness, and Trustworthiness (E-A-T) continue to be fundamental to SEO success. Creating comprehensive, well-researched content that demonstrates expertise in your field is more important than ever.</p>
      
      <h3>Technical SEO Foundations</h3>
      <p>Proper site structure, schema markup, mobile optimization, and fast loading speeds form the foundation of any successful SEO strategy. These technical elements enable search engines to crawl, understand, and rank your content effectively.</p>
    `,
    author: "Manuel Rodriguez",
    role: "Digital Marketing Director",
    date: "2024-12-28",
    readTime: "15 min read",
    tags: ["SEO", "Digital Marketing", "Content Strategy", "Technical SEO"],
    category: "Marketing",
    featured: false
  }
];

const categories = ["All", "Technology", "Business Strategy", "Development", "Marketing"];

export function ArticlesPage({ navigate }: ArticlesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(article => article.featured);

  const handleArticleClick = (article: typeof articles[0]) => {
    if (navigate) {
      navigate(`/articles/${article.slug}`);
    }
  };

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
            <Badge className="mb-4">Articles & Insights</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Latest Insights & Industry Trends
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay ahead of the curve with our expert insights on technology, business automation, 
              and digital transformation strategies that drive real results.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="py-8 border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Article */}
      {featuredArticle && selectedCategory === "All" && !searchQuery && (
        <div className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
              <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => handleArticleClick(featuredArticle)}>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Featured Image */}
                    <div className="relative h-64 md:h-full">
                      <ImageWithFallback
                        src={featuredArticle.featuredImage || "/images/placeholder"}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover"
                        data-priority="high"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 space-y-4">
                      <Badge variant="secondary">{featuredArticle.category}</Badge>
                      <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{featuredArticle.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{featuredArticle.readTime}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full md:w-auto">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden" onClick={() => handleArticleClick(article)}>
                  {/* Article Image */}
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={article.featuredImage || "/images/placeholder"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter and get the latest insights delivered directly to your inbox.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" type="email" />
              <Button>Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}