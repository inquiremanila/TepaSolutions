import { motion } from 'motion/react';
import { Heart, Users, GraduationCap, Code, Laptop, MapPin, Calendar, Award, Camera, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

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
  { number: "500+", label: "Students Reached", period: "Since 2024" },
  { number: "12", label: "Partner Schools", period: "Across Philippines" },
  { number: "25+", label: "Active Volunteers", period: "Growing Team" },
  { number: "20", label: "Workshops Conducted", period: "This Year" }
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
    name: "Sarah Kim",
    role: "Volunteer Mentor",
    quote: "Volunteering with Tepa has been incredibly rewarding. Seeing students discover their passion for tech is amazing.",
    location: "Manila"
  }
];

const pastEvents = [
  {
    id: 1,
    title: "Code for Good Hackathon",
    date: "November 2024",
    location: "BGC, Taguig",
    participants: "50+ students",
    description: "48-hour hackathon where students built solutions for local NGOs and community organizations."
  },
  {
    id: 2,
    title: "Digital Skills for Seniors",
    date: "October 2024",
    location: "Community Center, Makati",
    participants: "30 seniors",
    description: "Teaching elderly community members how to use smartphones, social media, and online banking safely."
  },
  {
    id: 3,
    title: "Women in Tech Workshop",
    date: "September 2024",
    location: "University of the Philippines",
    participants: "75 women students",
    description: "Empowering women students with tech skills and career guidance from female industry professionals."
  },
  {
    id: 4,
    title: "Youth Programming Bootcamp",
    date: "August 2024",
    location: "Quezon City Public Schools",
    participants: "100+ students",
    description: "5-day intensive programming bootcamp covering web development fundamentals and project building."
  }
];

const galleryImages = [
  {
    id: 1,
    alt: "Students coding their first website",
    caption: "Young students learning web development basics during our coding workshop"
  },
  {
    id: 2,
    alt: "Digital literacy workshop in progress",
    caption: "Community members learning essential computer skills"
  },
  {
    id: 3,
    alt: "Mentorship session",
    caption: "One-on-one mentoring session between volunteer and student"
  },
  {
    id: 4,
    alt: "Hackathon team collaboration",
    caption: "Teams collaborating during our Code for Good hackathon"
  },
  {
    id: 5,
    alt: "Community leaders learning tech",
    caption: "Local community leaders embracing new technologies"
  },
  {
    id: 6,
    alt: "Graduation ceremony",
    caption: "Celebrating successful completion of our programming bootcamp"
  }
];

export function VolunteerPage({ navigate }: VolunteerPageProps) {
  const handleVolunteerClick = () => {
    navigate?.('/volunteer-with-us/volunteer-form');
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

      {/* Past Events & Gallery */}
      <div className="py-16" id="impact-stories">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Recent Initiatives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how our volunteers are making a difference through hands-on workshops, mentorship programs, and community events.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{event.participants}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Event Highlights</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="group">
                  <div className="aspect-video bg-muted/20 rounded-lg overflow-hidden mb-3">
                    <ImageWithFallback
                      src="/images/placeholder"
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      data-priority={image.id <= 2 ? "high" : undefined}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">{image.caption}</p>
                </div>
              ))}
            </div>
          </motion.div>
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