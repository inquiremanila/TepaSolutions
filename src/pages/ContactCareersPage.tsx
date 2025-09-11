import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { submitCareerApplication } from '../utils/api';
import { toast } from "sonner@2.0.3";
import { jobPositions } from './CareersPage';

interface ContactCareersPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
}

export function ContactCareersPage({ navigate }: ContactCareersPageProps) {
  const [formData, setFormData] = useState({
    position: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    location: '',
    availability: '',
    resume: '',
    coverLetter: '',
    portfolio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get position from URL parameters if available
  const urlParams = new URLSearchParams(window.location.search);
  const positionFromUrl = urlParams.get('position');
  
  // Set the position if it came from URL and form is empty
  if (positionFromUrl && !formData.position) {
    const position = jobPositions.find(job => job.slug === positionFromUrl);
    if (position) {
      setFormData(prev => ({ ...prev, position: position.title }));
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitCareerApplication({
        position: formData.position,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        resume: formData.resume,
        coverLetter: formData.coverLetter,
        portfolio: formData.portfolio,
        experience: formData.experience,
        location: formData.location,
        availability: formData.availability
      });

      toast.success('Application submitted successfully!', {
        description: 'We will review your application and get back to you within 48 hours.',
        icon: <CheckCircle className="w-4 h-4" />,
      });

      // Reset form
      setFormData({
        position: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        location: '',
        availability: '',
        resume: '',
        coverLetter: '',
        portfolio: ''
      });

    } catch (error) {
      console.error('Career application submission error:', error);
      toast.error('Failed to submit application', {
        description: 'Please try again or contact us directly.',
        icon: <AlertCircle className="w-4 h-4" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    navigate?.('/careers');
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <Button
              variant="ghost"
              onClick={handleBackClick}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Button>
            
            <h1 className="text-4xl font-bold">Apply for a Position</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're excited that you're interested in joining our team! 
              Please fill out the form below to submit your application.
            </p>
          </div>

          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle>Job Application</CardTitle>
              <CardDescription>
                Complete this form to apply for a position at Tepa Solutions. 
                All fields marked with an asterisk (*) are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Position Selection */}
                <div>
                  <Label htmlFor="position" className="text-base font-medium">Position Applied For *</Label>
                  <Select value={formData.position} onValueChange={(value) => updateFormData('position', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobPositions.map((job) => (
                        <SelectItem key={job.id} value={job.title}>
                          {job.title} - {job.department}
                        </SelectItem>
                      ))}
                      <SelectItem value="other">Other / General Application</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-base font-medium">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-base font-medium">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-base font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Experience and Location */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience" className="text-base font-medium">Years of Experience</Label>
                    <Select value={formData.experience} onValueChange={(value) => updateFormData('experience', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-base font-medium">Preferred Location</Label>
                    <Select value={formData.location} onValueChange={(value) => updateFormData('location', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select preferred location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bgc-office">BGC Office (On-site)</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid (Mix of office and remote)</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <Label htmlFor="availability" className="text-base font-medium">When can you start?</Label>
                  <Select value={formData.availability} onValueChange={(value) => updateFormData('availability', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="2-weeks">2 weeks notice</SelectItem>
                      <SelectItem value="1-month">1 month notice</SelectItem>
                      <SelectItem value="2-months">2 months notice</SelectItem>
                      <SelectItem value="3-months">3+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Resume */}
                <div>
                  <Label htmlFor="resume" className="text-base font-medium">Resume / CV *</Label>
                  <Textarea
                    id="resume"
                    value={formData.resume}
                    onChange={(e) => updateFormData('resume', e.target.value)}
                    className="mt-2"
                    rows={8}
                    placeholder="Please paste your resume content here, or provide a brief summary of your work experience, education, and key skills..."
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    You can paste your full resume content or provide a summary of your experience and qualifications.
                  </p>
                </div>

                {/* Cover Letter */}
                <div>
                  <Label htmlFor="coverLetter" className="text-base font-medium">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    value={formData.coverLetter}
                    onChange={(e) => updateFormData('coverLetter', e.target.value)}
                    className="mt-2"
                    rows={6}
                    placeholder="Tell us why you're interested in this position and why you'd be a great fit for our team..."
                  />
                </div>

                {/* Portfolio */}
                <div>
                  <Label htmlFor="portfolio" className="text-base font-medium">Portfolio / Work Samples</Label>
                  <Input
                    id="portfolio"
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => updateFormData('portfolio', e.target.value)}
                    className="mt-2"
                    placeholder="https://your-portfolio.com or GitHub profile URL"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Share links to your portfolio, GitHub profile, or relevant work samples.
                  </p>
                </div>

                {/* Privacy Notice */}
                <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                  <p className="font-medium mb-2">Privacy Notice</p>
                  <p>
                    Your application and personal information will be kept confidential and used solely for recruitment purposes. 
                    We typically respond to applications within 48-72 hours.
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}