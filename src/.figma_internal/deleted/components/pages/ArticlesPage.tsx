import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Tag, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ArticlesPageProps {
  onNavigate: (target: string) => void;
}

const articles = [
  {
    id: 1,
    title: "How AI is Transforming the Workforce in 2025",
    excerpt: "Explore the revolutionary impact of artificial intelligence on modern workplaces, from automation to augmented decision-making, and discover how businesses can adapt to thrive in the AI-driven future.",
    content: `
      <h2>The AI Revolution in the Modern Workplace</h2>
      <p>As we navigate through 2025, artificial intelligence continues to reshape how we work, collaborate, and innovate. The transformation isn't just about replacing human tasks—it's about augmenting human capabilities and creating entirely new opportunities for growth and efficiency.</p>
      
      <h3>Key Areas of AI Transformation</h3>
      
      <h4>1. Intelligent Automation</h4>
      <p>AI-powered automation has evolved beyond simple rule-based systems. Modern AI can handle complex decision-making processes, analyze unstructured data, and adapt to changing business conditions in real-time.</p>
      
      <h4>2. Enhanced Decision Making</h4>
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
    title: "The Complete Guide to Business Process Automation",
    excerpt: "Learn how to identify, design, and implement automated workflows that streamline operations and boost productivity across your organization.",
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
    title: "Mobile App Development Trends for 2025",
    excerpt: "Discover the latest trends in mobile app development, from cross-platform frameworks to AI integration and emerging user experience patterns.",
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
    title: "SEO Strategies That Actually Work in 2025",
    excerpt: "Cut through the noise with proven SEO strategies that deliver real results. From technical optimization to content strategy, we cover it all.",
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

export function ArticlesPage({ onNavigate }: ArticlesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(article => article.featured);

  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="min-h-screen bg-background">
        {/* Article Header */}
        <div className="bg-gradient-to-b from-muted/30 to-background py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => setSelectedArticle(null)}
              className="mb-8"
            >
              ← Back
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Article Content */}
        <div className="py-12">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-muted-foreground mb-6">
                Let us help you implement the strategies discussed in this article. Our team of experts is ready to guide your digital transformation journey.
              </p>
              <Button 
                onClick={() => onNavigate('contact-sales')}
                className="bg-primary hover:bg-primary/90"
              >
                Get Started Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
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
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    <div className="space-y-4">
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
                      
                      <Button 
                        onClick={() => setSelectedArticle(featuredArticle.id)}
                        className="w-full md:w-auto"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Tag className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">Featured Content</p>
                      </div>
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
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => setSelectedArticle(article.id)}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(article.date).toLocaleDateString()}
                      </span>
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
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
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