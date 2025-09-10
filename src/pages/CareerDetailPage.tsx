import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Building, Calendar, ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { careersData, Career } from '../data/careers';

interface CareerDetailPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
  careerId?: string;
}

export function CareerDetailPage({ navigate, currentPath, careerId }: CareerDetailPageProps) {
  // Extract career ID from current path if not provided
  const id = careerId || currentPath?.split('/careers/')[1];
  
  // Find the career by ID
  const career = careersData.find(c => c.id === id);

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Position Not Found</h1>
          <p className="text-muted-foreground mb-8">The position you're looking for doesn't exist.</p>
          <Button onClick={() => navigate?.('/careers')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Careers
          </Button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate?.('/careers');
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time': return 'default';
      case 'part-time': return 'secondary';
      case 'internship': return 'outline';
      case 'contract': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={handleBack} className="hover:bg-muted">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Careers
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Job Details */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={getTypeColor(career.type)}>{career.type}</Badge>
                <Badge variant="outline">{career.department}</Badge>
                <Badge variant="secondary">{career.experience}</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {career.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {career.description}
              </p>
            </motion.header>

            {/* Job Description Sections */}
            <div className="space-y-8">
              {/* Responsibilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {career.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {career.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Company Culture */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-muted/50 rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold mb-4">Why Join Tepa Solutions?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Benefits & Perks</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Competitive salary and benefits</li>
                      <li>• Health insurance coverage</li>
                      <li>• Flexible working arrangements</li>
                      <li>• Professional development budget</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Work Environment</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Innovative and collaborative culture</li>
                      <li>• Modern tools and technologies</li>
                      <li>• Mentorship and growth opportunities</li>
                      <li>• Work-life balance focus</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Job Info Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Position Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span>{career.location}</span>
                  </div>

                  {/* Job Type */}
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span>{career.type}</span>
                  </div>

                  {/* Department */}
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-muted-foreground" />
                    <span>{career.department}</span>
                  </div>

                  {/* Experience Level */}
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span>{career.experience}</span>
                  </div>

                  {/* Salary */}
                  {career.salary && (
                    <div className="text-center py-4 bg-muted/50 rounded-lg">
                      <div className="text-lg font-semibold">{career.salary}</div>
                      <div className="text-sm text-muted-foreground">Salary Range</div>
                    </div>
                  )}

                  {/* Posted Date */}
                  {career.postedDate && (
                    <div className="text-center text-sm text-muted-foreground">
                      Posted on {new Date(career.postedDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button className="w-full" size="lg" onClick={() => navigate?.('/contact-us/sales')}>
                      Apply Now
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Share Position
                    </Button>
                  </div>

                  {/* Additional Info */}
                  <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                    We are an equal opportunity employer committed to diversity and inclusion.
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}