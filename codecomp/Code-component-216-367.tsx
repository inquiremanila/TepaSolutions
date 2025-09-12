import { motion } from 'motion/react';
import { MapPin, Clock, DollarSign, Calendar, ArrowLeft, Send, Users, CheckCircle } from 'lucide-react';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { jobPositions } from '../src/pages/CareersPage';

interface JobPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
  jobSlug?: string;
}

export function JobPage({ navigate, jobSlug }: JobPageProps) {
  const job = jobPositions.find(j => j.slug === jobSlug);

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-8">The job position you're looking for doesn't exist.</p>
          <Button onClick={() => navigate?.('/careers')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Careers
          </Button>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate?.('/careers');
  };

  const handleApplyClick = () => {
    navigate?.(`/contact-us/careers?position=${job.slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Job Header */}
      <div className="bg-gradient-to-b from-muted/30 to-background py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Careers
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{job.department}</Badge>
              <Badge variant="secondary">{job.type}</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {job.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {job.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-muted-foreground">{job.experience}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-medium">Salary</p>
                  <p className="text-muted-foreground">{job.salary}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-medium">Deadline</p>
                  <p className="text-muted-foreground">{new Date(job.applicationDeadline).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <Button size="lg" onClick={handleApplyClick} className="mt-6">
              Apply for This Position
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Job Details */}
      <div className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Responsibilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Nice to Have */}
              {job.niceToHave && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Nice to Have</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {job.niceToHave.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky top-24"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Apply for This Position</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Ready to join our team? Click below to submit your application and tell us why you'd be a great fit.
                    </p>
                    
                    <Button onClick={handleApplyClick} className="w-full" size="lg">
                      Apply Now
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Application Deadline</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(job.applicationDeadline).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Questions?</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Have questions about this role? We'd love to hear from you.
                      </p>
                      <Button variant="outline" size="sm" onClick={() => navigate?.('/contact-us/support')}>
                        Contact Us
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Positions */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8">Other Open Positions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {jobPositions
                .filter(pos => pos.id !== job.id)
                .slice(0, 2)
                .map(relatedJob => (
                  <Card
                    key={relatedJob.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => navigate?.(`/careers/${relatedJob.slug}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline">{relatedJob.department}</Badge>
                        <Badge variant="secondary">{relatedJob.type}</Badge>
                      </div>
                      
                      <h3 className="font-bold mb-2">{relatedJob.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {relatedJob.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{relatedJob.location}</span>
                        <span>{relatedJob.experience}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}