import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { articles } from './ArticlesPage';

interface ArticlePageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
  articleSlug?: string;
}

export function ArticlePage({ navigate, articleSlug }: ArticlePageProps) {
  const article = articles.find(a => a.slug === articleSlug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Button onClick={() => navigate?.('/articles')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate?.('/articles');
  };

  const handleContactClick = () => {
    navigate?.('/contact-us/sales');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Article Header */}
      <div className="bg-gradient-to-b from-muted/30 to-background py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
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

      {/* Featured Image */}
      {article.featuredImage && (
        <div className=\"py-8\">
          <div className=\"container mx-auto px-6 max-w-4xl\">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className=\"aspect-video rounded-xl overflow-hidden\"
            >
              <ImageWithFallback
                src={article.featuredImage}
                alt={article.title}
                className=\"w-full h-full object-cover\"
                data-priority=\"high\"
              />
            </motion.div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: article.content || '<p>Content coming soon...</p>' }}
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
              onClick={handleContactClick}
              className="bg-primary hover:bg-primary/90"
            >
              Get Started Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Related Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {articles
                .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(tag => article.tags.includes(tag))))
                .slice(0, 2)
                .map(relatedArticle => (
                  <div
                    key={relatedArticle.id}
                    className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate?.(`/articles/${relatedArticle.slug}`)}
                  >
                    <Badge variant="outline" className="mb-3">{relatedArticle.category}</Badge>
                    <h4 className="font-bold mb-2 line-clamp-2">{relatedArticle.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{relatedArticle.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{relatedArticle.author}</span>
                      <span>{relatedArticle.readTime}</span>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}