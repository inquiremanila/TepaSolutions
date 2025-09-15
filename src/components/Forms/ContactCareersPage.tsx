import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { submitCareerApplication, uploadFile } from '../../supabase/api';
import { toast } from "sonner";
import { jobPositions } from '../../DynamicData/CareersPage';

interface ContactCareersPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
}

export function ContactCareersPage({ navigate }: ContactCareersPageProps) {
  const [searchParams] = useSearchParams();
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
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [coverLetterType, setCoverLetterType] = useState<'text' | 'file'>('text');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get position from URL parameters if available (SSR-safe)
  useEffect(() => {
    const positionFromUrl = searchParams.get('position');
    if (positionFromUrl && !formData.position) {
      const position = jobPositions.find(job => job.slug === positionFromUrl);
      if (position) {
        setFormData(prev => ({ ...prev, position: position.title }));
      }
    }
  }, [searchParams, formData.position]);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type (PDF, DOC, DOCX, TXT)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (allowedTypes.includes(file.type)) {
        setCoverLetterFile(file);
        setCoverLetterType('file');
      } else {
        toast.error('Invalid file type', {
          description: 'Please upload a PDF, DOC, DOCX, or TXT file for your cover letter.',
        });
      }
    }
  };

  const removeCoverLetterFile = () => {
    setCoverLetterFile(null);
    setCoverLetterType('text');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let coverLetterFileUrl;
      let coverLetterContent = '';
      
      // Upload cover letter file if provided
      if (coverLetterType === 'file' && coverLetterFile) {
        try {
          coverLetterFileUrl = await uploadFile(coverLetterFile, 'cover-letters');
          coverLetterContent = `Cover letter file uploaded: ${coverLetterFile.name}`;
        } catch (uploadError) {
          console.error('Cover letter upload failed:', uploadError);
          toast.error('Failed to upload cover letter file', {
            description: 'Please try again or use text format.',
            icon: <AlertCircle className="w-4 h-4" />,
          });
          setIsSubmitting(false);
          return;
        }
      } else if (coverLetterType === 'text') {
        coverLetterContent = formData.coverLetter;
      }

      await submitCareerApplication({
        position: formData.position,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        resume: formData.resume,
        coverLetter: coverLetterContent,
        coverLetterFileUrl: coverLetterFileUrl,
        portfolio: formData.portfolio,
        experience: formData.experience,
        location: formData.location,
        availability: formData.availability
      });

      // Show contextual message instead of toast for career applications
      setIsSubmitted(true);

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
      setCoverLetterFile(null);
      setCoverLetterType('text');

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

  // Show success message after submission
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-800">Application Submitted!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your interest in joining our team! We will review your application 
              and get back to you within 48 hours with next steps.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Questions about your application? Contact our HR team:
              </p>
              <p className="font-medium">📞 63 2 8 558 1237</p>
              <p className="font-medium">✉️ careers@tepasolutions.asia</p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                Submit Another Application
              </Button>
              <Button 
                onClick={handleBackClick}
                variant="default"
              >
                View Other Positions
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
                  <Label className="text-base font-medium">Cover Letter</Label>
                  <div className="mt-2 space-y-4">
                    {/* Cover Letter Type Selection */}
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant={coverLetterType === 'text' ? 'default' : 'outline'}
                        onClick={() => {
                          setCoverLetterType('text');
                          setCoverLetterFile(null);
                        }}
                        size="sm"
                      >
                        Write Text
                      </Button>
                      <Button
                        type="button"
                        variant={coverLetterType === 'file' ? 'default' : 'outline'}
                        onClick={() => setCoverLetterType('file')}
                        size="sm"
                      >
                        Upload File
                      </Button>
                    </div>

                    {/* Text Area for Cover Letter */}
                    {coverLetterType === 'text' && (
                      <Textarea
                        id="coverLetter"
                        value={formData.coverLetter}
                        onChange={(e) => updateFormData('coverLetter', e.target.value)}
                        rows={6}
                        placeholder="Tell us why you're interested in this position and why you'd be a great fit for our team..."
                      />
                    )}

                    {/* File Upload for Cover Letter */}
                    {coverLetterType === 'file' && (
                      <div className="space-y-3">
                        {!coverLetterFile ? (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input
                              type="file"
                              id="coverLetterFile"
                              accept=".pdf,.doc,.docx,.txt"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <label htmlFor="coverLetterFile" className="cursor-pointer">
                              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                              <p className="text-sm text-gray-600">Click to upload your cover letter</p>
                              <p className="text-xs text-gray-500 mt-1">Supports: PDF, DOC, DOCX, TXT (Max 5MB)</p>
                            </label>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-800">{coverLetterFile.name}</span>
                              <span className="text-xs text-green-600">({(coverLetterFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={removeCoverLetterFile}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
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