import { motion } from 'motion/react';
import { Heart, Users, GraduationCap, Code, Laptop, MapPin, Calendar, Award, Camera, BookOpen, Send, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from "sonner";
import { useState } from 'react';
import { submitVolunteerApplication } from '../utils/api';

interface VolunteerPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
}

const volunteerOpportunities = [
  {
    id: 1,
    icon: <Code className="w-8 h-8" />,
    title: "Coding Mentorship",
    description: "Teach programming fundamentals to students and young professionals looking to break into tech.",
    commitment: "2-4 hours/week",
    skills: "JavaScript, Python, React, or any programming language"
  },
  {
    id: 2,
    icon: <Laptop className="w-8 h-8" />,
    title: "Digital Literacy Workshops",
    description: "Help bridge the digital divide by teaching basic computer skills to underserved communities.",
    commitment: "4-6 hours/month",
    skills: "Basic computer knowledge and patience"
  },
  {
    id: 3,
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Career Guidance",
    description: "Share your professional experience and guide aspiring tech professionals in their career journey.",
    commitment: "2-3 hours/month",
    skills: "Professional experience in any field"
  },
  {
    id: 4,
    icon: <BookOpen className="w-8 h-8" />,
    title: "Content Creation",
    description: "Help create educational content, tutorials, and resources for our online learning platforms.",
    commitment: "Flexible",
    skills: "Writing, video editing, or subject matter expertise"
  }
];

const impactStats = [
  { number: "120+", label: "Students Reached", period: "Since 2024" },
  { number: "2", label: "Partner Schools", period: "Across Philippines" },
  { number: "15+", label: "Active Volunteers", period: "Growing Team" },
  { number: "6", label: "Workshops Conducted", period: "This Year" }
];

const testimonials = [
  {
    id: 1,
    name: "Maria Santos",
    role: "High School Student",
    quote: "The coding workshop opened my eyes to programming. I'm now planning to pursue Computer Science!",
    location: "Quezon City"
  },
  {
    id: 2,
    name: "Carlos Rivera",
    role: "Community Leader",
    quote: "Tepa Solutions' digital literacy program has transformed our community center. More people now feel confident using technology.",
    location: "Cebu"
  },
  {
    id: 3,
    name: "Kim Marquez",
    role: "Volunteer Mentor",
    quote: "Volunteering with Tepa has been incredibly rewarding. Seeing students discover their passion for tech is amazing.",
    location: "Manila"
  }
];

const pastEvents = [
  {
    id: 1,
    title: "Digital Skills for Seniors",
    date: "October 2024",
    location: "Community Center, Makati",
    participants: "30 seniors",
    description: "Helping seniors learn to use smartphones, social media, and online services safely."
  },
  {
    id: 2,
    title: "Intro to Coding for Kids",
    date: "September 2024",
    location: "Local Library, Pasig",
    participants: "25 kids",
    description: "Fun beginner coding games and activities to spark interest in technology."
  },
  {
    id: 3,
    title: "Small Business Tech Tips",
    date: "August 2024",
    location: "Barangay Hall, Quezon City",
    participants: "20 local business owners",
    description: "Basic training on using free digital tools to improve small business operations."
  },
  {
    id: 4,
    title: "Community Internet Safety Talk",
    date: "July 2024",
    location: "School Gym, Taguig",
    participants: "50 parents and students",
    description: "Simple tips on staying safe online for families and kids."
  }
];


const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1540058404349-2e5fabf32d75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc2hvcCUyMHN0dWRlbnRzJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzU3NTQ5NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Students coding their first website",
    caption: "Young students learning web development basics during our coding workshop"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1585597648262-4ec84d233732?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjb21wdXRlciUyMGRpZ2l0YWwlMjBsaXRlcmFjeXxlbnwxfHx8fDE3NTc1NDk0NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Digital literacy workshop in progress",
    caption: "Community members learning essential computer skills"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1690192435015-319c1d5065b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3JzaGlwJTIwcHJvZ3JhbW1pbmclMjB0ZWFjaGluZ3xlbnwxfHx8fDE3NTc1NDk0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Mentorship session",
    caption: "One-on-one mentoring session between volunteer and student"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1633249658235-d591f2f2acba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NTc1NDk0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Hackathon team collaboration",
    caption: "Teams collaborating during our Code for Good hackathon"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1696041757950-62e2c030283b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwdm9sdW50ZWVyJTIwY29tbXVuaXR5JTIwb3V0cmVhY2h8ZW58MXx8fHwxNzU3NTQ5NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Community leaders learning tech",
    caption: "Local community leaders embracing new technologies"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1543058871-74a1d669ba70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY29kaW5nJTIwYm9vdGNhbXAlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NTc1NDk0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Graduation ceremony",
    caption: "Celebrating successful completion of our programming bootcamp"
  }
];

export function VolunteerPage({ navigate }: VolunteerPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experienceLevel: '',
    availability: '',
    areaOfInterest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitVolunteerApplication(formData);
      toast.success("Thank you for your interest in volunteering! We'll review your application and get back to you within 48 hours.");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experienceLevel: '',
        availability: '',
        areaOfInterest: '',
        message: ''
      });
    } catch (error) {
      console.error('Volunteer application error:', error);
      toast.error("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVolunteerClick = () => {
    document.getElementById('volunteer-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    navigate?.('/contact-us/sales');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-green-100 text-green-800">
              <Heart className="w-4 h-4 mr-2" />
              Volunteer Program
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Code for Community Impact
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join our mission to democratize technology education and empower underserved communities through coding, digital literacy, and mentorship programs across the Philippines.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={handleVolunteerClick}>
                Join Our Mission
              </Button>
              <Button variant="outline" size="lg" onClick={() => {
                document.getElementById('impact-stories')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                See Our Impact
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  To bridge the digital divide by making technology education accessible to everyone, regardless of their background or economic status. We believe that every individual deserves the opportunity to learn, grow, and thrive in our digital world.
                </p>
                <p className="text-muted-foreground">
                  Through our volunteer programs, we're not just teaching code - we're building dreams, opening doors, and creating pathways to better futures for individuals and communities across the Philippines.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  A Philippines where technology literacy is universal, where every community has access to digital tools and knowledge, and where the next generation of tech innovators comes from all walks of life.
                </p>
                <p className="text-muted-foreground">
                  We envision a future where our volunteer efforts create a ripple effect - where those we teach today become the mentors and leaders of tomorrow, continuing the cycle of knowledge sharing and community empowerment.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Why Volunteer With Us */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Volunteer With Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Make a lasting impact while developing your skills and connecting with like-minded individuals who believe in the power of technology to transform lives.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-green-600">
                    <Heart className="w-8 h-8" />
                  </div>
                  <CardTitle>Meaningful Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Directly contribute to bridging the digital divide and creating opportunities for underserved communities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <Users className="w-8 h-8" />
                  </div>
                  <CardTitle>Community Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Connect with passionate volunteers, mentors, and students who share your vision for inclusive technology education.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-purple-600">
                    <Award className="w-8 h-8" />
                  </div>
                  <CardTitle>Professional Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Develop leadership, teaching, and communication skills while giving back to the community.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Volunteer Opportunities */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Volunteer Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from various ways to contribute based on your skills, interests, and availability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {opportunity.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{opportunity.commitment}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                    <div className="bg-primary/5 p-3 rounded-lg">
                      <p className="text-sm">
                        <strong>Skills needed:</strong> {opportunity.skills}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Growing Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Since launching our volunteer program, we've made significant strides in tech education accessibility.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.period}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

     
      {/* Testimonials */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Voices from Our Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from students, community members, and volunteers whose lives have been touched by our programs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl text-primary mb-4">"</div>
                    <p className="text-muted-foreground mb-4 italic">{testimonial.quote}</p>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Volunteer Application Form */}
      <div className="py-16" id="volunteer-form">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Join Our Volunteer Program</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ready to make an impact? Complete this form to express your interest in our Educational Outreach Program.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Volunteer Application</CardTitle>
                <CardDescription>
                  Help us bridge the digital divide by teaching coding and digital literacy to underserved communities.
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
                      value={formData.experienceLevel}
                      onValueChange={(value) => updateFormData('experienceLevel', value)}
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
                      value={formData.availability}
                      onValueChange={(value) => updateFormData('availability', value)}
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
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-muted-foreground mb-8">
              Join our growing community of volunteers who are passionate about making technology education accessible to everyone. 
              Whether you have 2 hours a week or 2 hours a month, your contribution matters.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={handleVolunteerClick}>
                Start Volunteering Today
              </Button>
              <Button variant="outline" size="lg" onClick={handleContactClick}>
                Partner With Us
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Have questions? Reach out to our volunteer coordinator at volunteer@tepasolutions.asia
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}