import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowLeft, Send, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { submitContactForm, submitVolunteerApplication } from '../utils/form5-api-handlers';
import { toast } from "sonner";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tepabot } from './form2-tepabot-support';

type FormType = 'sales' | 'support' | 'volunteer' | 'event-host' | 'investor';

interface ContactFormsProps {
  formType: FormType;
  onBack: () => void;
}

const areasOfInterest = [
  'Business Automation',
  'Web Application Development',
  'Mobile App Development',
  'Website Development',
  'SEO Solutions',
  'Custom Integration',
  'Other'
];

const howCanWeHelp = [
  'Quote',
  'Demo',
  'Sales question'
];

const employeeRanges = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+'
];

export function ContactForms({ formType, onBack }: ContactFormsProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    phone: '',
    businessName: '',
    employees: '',
    location: 'Philippines',
    isCurrentClient: '',
    areaOfInterest: '',
    howCanWeHelp: '',
    message: '',
    subject: '' // Added for investor form
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supportType, setSupportType] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formType === 'volunteer') {
        // Handle volunteer application separately
        await submitVolunteerApplication({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          experienceLevel: formData.howCanWeHelp, // Using this field for experience level
          availability: formData.isCurrentClient, // Using this field for availability
          areaOfInterest: formData.areaOfInterest,
          message: formData.message
        });
      } else {
        const submissionData = {
          type: formType,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          company: formData.businessName,
          phone: formData.phone,
          message: formData.message,
          subject: formType === 'sales' 
            ? `Sales Inquiry - ${formData.areaOfInterest || 'General'}`
            : formType === 'event-host'
            ? `Event Hosting Inquiry - ${formData.areaOfInterest || 'General'}`
            : formType === 'investor'
            ? formData.subject || 'Investor Relations Inquiry'
            : formType === 'support'
            ? `Customer Support Request - ${supportType || 'General'}`
            : 'Customer Support Request',
          priority: formType === 'support' ? 'high' as const : 'medium' as const,
          supportType: supportType,
          attachedFiles: attachedFiles.length
        };

        await submitContactForm(submissionData);
      }
      
      toast.success('Form submitted successfully!', {
        description: 'We will contact you shortly.',
        icon: <CheckCircle className="w-4 h-4" />,
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        phone: '',
        businessName: '',
        employees: '',
        location: 'Philippines',
        isCurrentClient: '',
        areaOfInterest: '',
        howCanWeHelp: '',
        message: '',
        subject: ''
      });
      setSupportType('');
      setAttachedFiles([]);

    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit form', {
        description: 'Please try again or contact us directly.',
        icon: <AlertCircle className="w-4 h-4" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (formType === 'sales') {
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
                onClick={onBack}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <h1 className="text-4xl font-bold">Contact Sales</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                If you would like to have a Tepa Sales representative contact you directly, please submit your details using the form below.
              </p>
            </div>

            {/* Contact Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Call Our Sales Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">63 2 8 558 1237</p>
                  <p className="text-muted-foreground mt-2">
                    Alternatively, you can call our Sales team directly
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Other Assistance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you are looking for other assistance, contact Customer Service.
                  </p>
                  <Button variant="outline" className="mt-3" onClick={() => window.dispatchEvent(new CustomEvent('navigateToService', { detail: 'contact-support' }))}>
                    Customer Service
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Talk to Experts Section */}
            <Card>
              <CardHeader>
                <CardTitle>Talk to our experts</CardTitle>
                <CardDescription>
                  Our experts are on hand to discuss your business needs and answer any questions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* How can we help */}
                  <div>
                    <Label className="text-base font-medium">How can we help today?</Label>
                    <RadioGroup
                      value={formData.howCanWeHelp}
                      onValueChange={(value) => updateFormData('howCanWeHelp', value)}
                      className="mt-2"
                    >
                      <div className="flex gap-6">
                        {howCanWeHelp.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option}>{option}</Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Area of Interest */}
                  <div>
                    <Label htmlFor="areaOfInterest" className="text-base font-medium">Area of interest</Label>
                    <Select value={formData.areaOfInterest} onValueChange={(value) => updateFormData('areaOfInterest', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select area of interest" />
                      </SelectTrigger>
                      <SelectContent>
                        {areasOfInterest.map((area) => (
                          <SelectItem key={area} value={area}>{area}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-base font-medium">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-base font-medium">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => updateFormData('lastName', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  {/* Email and Job Title */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-base font-medium">Business Email</Label>
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
                      <Label htmlFor="jobTitle" className="text-base font-medium">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => updateFormData('jobTitle', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone and Business Name */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-base font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessName" className="text-base font-medium">Business Name</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => updateFormData('businessName', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  {/* Employees and Location */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employees" className="text-base font-medium"># of Employees</Label>
                      <Select value={formData.employees} onValueChange={(value) => updateFormData('employees', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select employee range" />
                        </SelectTrigger>
                        <SelectContent>
                          {employeeRanges.map((range) => (
                            <SelectItem key={range} value={range}>{range}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-base font-medium">Locations</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => updateFormData('location', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  {/* Current Client */}
                  <div>
                    <Label className="text-base font-medium">Are you a current Tepa client?</Label>
                    <RadioGroup
                      value={formData.isCurrentClient}
                      onValueChange={(value) => updateFormData('isCurrentClient', value)}
                      className="mt-2"
                    >
                      <div className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="client-yes" />
                          <Label htmlFor="client-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="client-no" />
                          <Label htmlFor="client-no">No</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-base font-medium">Tell us how we can help.</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      className="mt-2"
                      rows={4}
                      placeholder="Please describe your needs and how we can assist you..."
                    />
                  </div>

                  {/* Privacy Notice */}
                  <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                    <p>Your privacy is assured.</p>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Tepabot />
      </div>
    );
  }

  // Volunteer Form  
  if (formType === 'volunteer') {
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
                onClick={onBack}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <h1 className="text-4xl font-bold">Join Our Volunteer Program</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Help us bridge the digital divide by teaching coding and digital literacy to underserved communities.
              </p>
            </div>

            {/* Volunteer Form */}
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Application</CardTitle>
                <CardDescription>
                  Complete this form to express your interest in our Educational Outreach Program.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-base font-medium">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-base font-medium">Last Name</Label>
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
                      <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
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
                        required
                      />
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <Label className="text-base font-medium">Your programming experience level</Label>
                    <RadioGroup
                      value={formData.howCanWeHelp}
                      onValueChange={(value) => updateFormData('howCanWeHelp', value)}
                      className="mt-2"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="beginner" id="beginner" />
                          <Label htmlFor="beginner">Beginner - I'm just starting out</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="intermediate" id="intermediate" />
                          <Label htmlFor="intermediate">Intermediate - I have some experience</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="advanced" id="advanced" />
                          <Label htmlFor="advanced">Advanced - I'm experienced and want to teach</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Availability */}
                  <div>
                    <Label className="text-base font-medium">When are you available to volunteer?</Label>
                    <RadioGroup
                      value={formData.isCurrentClient}
                      onValueChange={(value) => updateFormData('isCurrentClient', value)}
                      className="mt-2"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekends" id="weekends" />
                          <Label htmlFor="weekends">Weekends (Saturday/Sunday)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="evenings" id="evenings" />
                          <Label htmlFor="evenings">Weekday evenings</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="flexible" id="flexible" />
                          <Label htmlFor="flexible">Flexible - depends on schedule</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Interest Areas */}
                  <div>
                    <Label htmlFor="areaOfInterest" className="text-base font-medium">Which volunteer activities interest you most?</Label>
                    <Select value={formData.areaOfInterest} onValueChange={(value) => updateFormData('areaOfInterest', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teaching-coding">Teaching basic programming</SelectItem>
                        <SelectItem value="digital-literacy">Digital literacy workshops</SelectItem>
                        <SelectItem value="mentoring">Mentoring students</SelectItem>
                        <SelectItem value="curriculum">Curriculum development</SelectItem>
                        <SelectItem value="events">Community tech events</SelectItem>
                        <SelectItem value="all">All of the above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Why volunteer */}
                  <div>
                    <Label htmlFor="message" className="text-base font-medium">Why do you want to volunteer with us?</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      className="mt-2"
                      rows={4}
                      placeholder="Tell us about your motivation to volunteer and how you'd like to contribute..."
                      required
                    />
                  </div>

                  {/* Privacy Notice */}
                  <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                    <p>Thank you for your interest in volunteering! We'll review your application and get back to you within 48 hours.</p>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Volunteer Application'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Tepabot />
      </div>
    );
  }

  // Event Host Form
  if (formType === 'event-host') {
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
                onClick={onBack}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <h1 className="text-4xl font-bold">Host an Event with Us</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have an idea for a workshop or want to speak at one of our events? 
                We're always looking for passionate educators and industry experts.
              </p>
            </div>

            {/* Event Host Form */}
            <Card>
              <CardHeader>
                <CardTitle>Event Hosting Proposal</CardTitle>
                <CardDescription>
                  Tell us about your event idea and we'll work with you to bring it to life.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-base font-medium">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-base font-medium">Last Name</Label>
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
                      <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
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
                        required
                      />
                    </div>
                  </div>

                  {/* Organization and Title */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName" className="text-base font-medium">Organization/Company</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => updateFormData('businessName', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobTitle" className="text-base font-medium">Your Title/Role</Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => updateFormData('jobTitle', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  {/* Event Type */}
                  <div>
                    <Label className="text-base font-medium">What type of event are you interested in hosting?</Label>
                    <RadioGroup
                      value={formData.howCanWeHelp}
                      onValueChange={(value) => updateFormData('howCanWeHelp', value)}
                      className="mt-2"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="workshop" id="workshop" />
                          <Label htmlFor="workshop">Technical Workshop</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="webinar" id="webinar" />
                          <Label htmlFor="webinar">Online Webinar</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="conference" id="conference" />
                          <Label htmlFor="conference">Conference Speaking</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other (please describe below)</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Topic Area */}
                  <div>
                    <Label htmlFor="areaOfInterest" className="text-base font-medium">Topic/Technology Area</Label>
                    <Select value={formData.areaOfInterest} onValueChange={(value) => updateFormData('areaOfInterest', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select topic area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="mobile-development">Mobile Development</SelectItem>
                        <SelectItem value="business-automation">Business Automation</SelectItem>
                        <SelectItem value="ai-machine-learning">AI & Machine Learning</SelectItem>
                        <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                        <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Event Proposal */}
                  <div>
                    <Label htmlFor="message" className="text-base font-medium">Event Proposal & Details</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      className="mt-2"
                      rows={6}
                      placeholder="Please describe your event idea, target audience, key learning objectives, and any specific requirements..."
                      required
                    />
                  </div>

                  {/* Privacy Notice */}
                  <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                    <p>Thank you for your interest in hosting an event with us! We'll review your proposal and get back to you within 72 hours.</p>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Event Proposal'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Tepabot />
      </div>
    );
  }

  // Investor Form - SIMPLIFIED
  if (formType === 'investor') {
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
                onClick={onBack}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <h1 className="text-4xl font-bold">Investor Relations</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Interested in investment opportunities with Tepa Solutions? 
                Connect with our investor relations team to learn more about our growth strategy and financial performance.
              </p>
            </div>

            {/* Investor Contact Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Direct Investor Line
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">+63 2 8558 1237</p>
                  <p className="text-muted-foreground mt-2">
                    Speak directly with our investor relations team
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Investor Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-primary">investors@tepasolutions.com</p>
                  <p className="text-muted-foreground mt-2">
                    For detailed inquiries and document requests
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Simplified Investor Form */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Investor Relations</CardTitle>
                <CardDescription>
                  High-priority communication channel for current and prospective investors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-base font-medium">Full Name</Label>
                      <Input
                        id="firstName"
                        value={`${formData.firstName} ${formData.lastName}`.trim()}
                        onChange={(e) => {
                          const parts = e.target.value.split(' ');
                          setFormData(prev => ({ 
                            ...prev, 
                            firstName: parts[0] || '', 
                            lastName: parts.slice(1).join(' ') || '' 
                          }));
                        }}
                        className="mt-2"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <Label htmlFor="subject" className="text-base font-medium">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => updateFormData('subject', e.target.value)}
                      className="mt-2"
                      placeholder="Brief subject of your inquiry"
                      required
                    />
                  </div>

                  {/* Comments */}
                  <div>
                    <Label htmlFor="message" className="text-base font-medium">Comments</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      className="mt-2"
                      rows={5}
                      placeholder="Please describe your investment interest, timeline, and any specific questions about our business..."
                      required
                    />
                  </div>

                  {/* Privacy Notice */}
                  <div className="text-sm text-muted-foreground bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <p><strong>High Priority:</strong> All investor inquiries are handled with highest priority and confidentiality. Our investor relations team will respond within 24 hours.</p>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Investor Inquiry'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Tepabot />
      </div>
    );
  }

  // Support Form - UPDATED
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
              onClick={onBack}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <h1 className="text-4xl font-bold">Customer Support</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get help with your existing Tepa solutions. Our support team is here to assist you.
            </p>
          </div>

          {/* Support Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Request</CardTitle>
              <CardDescription>
                Please provide details about the issue you're experiencing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Support Type Dropdown */}
                <div>
                  <Label htmlFor="supportType" className="text-base font-medium">Type of Support Request</Label>
                  <Select value={supportType} onValueChange={setSupportType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select the type of support you need" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical-issue">Technical Issue</SelectItem>
                      <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                      <SelectItem value="billing-question">Billing Question</SelectItem>
                      <SelectItem value="feature-request">Feature Request</SelectItem>
                      <SelectItem value="bug-report">Bug Report</SelectItem>
                      <SelectItem value="account-access">Account Access</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-base font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-base font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
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

                <div>
                  <Label htmlFor="businessName" className="text-base font-medium">Company Name</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => updateFormData('businessName', e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                {/* File Upload */}
                <div>
                  <Label htmlFor="fileUpload" className="text-base font-medium">Attach Files (Optional)</Label>
                  <div className="mt-2">
                    <input
                      type="file"
                      id="fileUpload"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx,.txt"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('fileUpload')?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Files
                    </Button>
                    {attachedFiles.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {attachedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted/30 p-2 rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Issue Description */}
                <div>
                  <Label htmlFor="message" className="text-base font-medium">Describe your issue</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    className="mt-2"
                    rows={6}
                    placeholder="Please provide as much detail as possible about the issue you're experiencing..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Support Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Tepabot />
    </div>
  );
}