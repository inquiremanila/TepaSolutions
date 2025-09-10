import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users, ExternalLink, Play, Trophy, Code, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitEventRegistration } from '../../utils/api';
import { toast } from "sonner";
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface EventsPageProps {
  onNavigate: (target: string) => void;
}

const events = [
  {
    id: 1,
    title: "Introduction to How to make a Roblox Game",
    description: "Join our comprehensive workshop where you'll learn the fundamentals of Roblox game development using Roblox Studio and Lua scripting. Perfect for beginners and aspiring game developers!",
    type: "Workshop",
    category: "Development",
    date: "2025-09-27",
    time: "4:00 PM - 6:00 PM",
    duration: "2 hours",
    location: "Zoom Meeting",
    locationDetails: "Online via Zoom Meeting - No need to commute!",
    capacity: "20 participants",
    status: "registration-open",
    featured: true,
    instructor: "Jake Martinez",
    instructorRole: "Senior Game Developer",
    level: "Beginner",
    image: "/images/Roblox_game_development_workshop_image_563b57d9.png",    certificate: "Completion Certificate",
    topics: [
      "Introduction to Roblox Studio",
      "Basic Lua scripting concepts",
      "Creating your first game world",
      "Adding interactive elements",
      "Scripting player movements",
      "Implementing game mechanics",
      "Testing and debugging",
      "Publishing your game"
    ],
    requirements: [
      "Pre-setup Roblox Studio on your device",
      "Have your own Roblox login account",
      "Stable internet connection",
      "Basic computer literacy"
    ],
    agenda: {
      "4:00 - 4:15": "Welcome & Introductions",
      "4:15 - 4:45": "Roblox Studio Basics & Interface",
      "4:45 - 5:15": "Basic Lua Scripting",
      "5:15 - 5:45": "Building Your First Game",
      "5:45 - 6:00": "Q&A and Next Steps"
    }
  },
  {
    id: 2,
    title: "Introduction to HTML and CSS",
    description: "Learn the fundamentals of web development with HTML and CSS. Build your first website from scratch and understand the core technologies that power the web. Perfect for complete beginners!",
    type: "Webinar",
    category: "Development",
    date: "2025-09-20",
    time: "2:00 PM - 4:00 PM",
    duration: "2 hours",
    location: "Zoom Meeting",
    locationDetails: "Online via Zoom Meeting - No need to commute!",
    capacity: "30 participants",
    status: "registration-open",
    featured: false,
    instructor: "Maria Santos",
    instructorRole: "Senior Frontend Developer",
    level: "Beginner",
    certificate: "Completion Certificate",
    topics: [
      "What is HTML and CSS?",
      "Setting up your development environment",
      "HTML structure and basic tags",
      "CSS selectors and properties",
      "Creating your first webpage",
      "Styling and layout basics",
      "Best practices for clean code",
      "Next steps in web development"
    ],
    requirements: [
      "VS Code must be pre-installed on your device",
      "Basic computer literacy",
      "Stable internet connection",
      "Text editor familiarity (helpful but not required)"
    ],
    agenda: {
      "2:00 - 2:15": "Welcome & Setup Verification",
      "2:15 - 2:45": "HTML Fundamentals",
      "2:45 - 3:15": "CSS Basics & Styling",
      "3:15 - 3:45": "Building Your First Webpage",
    }
  },
  {
    id: 3,
    title: "Mobile App Development Bootcamp",
    description: "A comprehensive bootcamp covering mobile app development. Official details will be announced soon. Stay tuned for updates!",
    type: "Bootcamp",
    category: "Development",
    date: "TBA",
    time: "TBA",
    duration: "TBA",
    location: "TBA",
    locationDetails: "Details will be provided upon registration opening",
    capacity: "TBA",
    status: "coming-soon",
    featured: false,
    instructor: "TBA",
    instructorRole: "Mobile Development Expert",
    level: "TBA"
  },
  {
    id: 4,
    title: "School Workshop: Introduction to How to make a Roblox Game",
    description: "Special school workshop designed for students interested in game development. Learn the basics of Roblox game creation in a fun, educational environment. Details to be announced soon!",
    type: "Workshop",
    category: "Development",
    date: "TBA",
    time: "TBA",
    duration: "TBA",
    location: "TBA",
    locationDetails: "Details will be provided upon confirmation",
    capacity: "TBA",
    status: "coming-soon",
    featured: false,
    instructor: "TBA",
    instructorRole: "Game Development Instructor",
    level: "Beginner",
    topics: [
      "Introduction to game development",
      "Roblox Studio basics",
      "Creative thinking and design",
      "Basic programming concepts",
      "Collaborative game building"
    ],
    requirements: [
      "Details will be provided upon registration opening"
    ]
  }
];

const eventTypes = ["All", "Workshop", "Webinar", "Bootcamp", "Conference"];

export function EventsPage({ onNavigate }: EventsPageProps) {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    experience: '',
    expectations: '',
    dietaryRestrictions: ''
  }); 

  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isNotifying, setIsNotifying] = useState(false);

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const event = events.find(e => e.id === selectedEvent);
      if (!event) return;

      await submitEventRegistration({
        eventId: event.id.toString(),
        eventTitle: event.title,
        ...registrationData
      });

      toast.success('Registration successful!', {
        description: 'You will receive a confirmation email shortly.',
        icon: <CheckCircle className="w-4 h-4" />,
      });

      setRegistrationData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        experience: '',
        expectations: '',
        dietaryRestrictions: ''
      });
      setShowRegistrationForm(false);

    } catch (error) {
      console.error('Registration submission error:', error);
      toast.error('Failed to register for event', {
        description: 'Please try again or contact us directly.',
        icon: <AlertCircle className="w-4 h-4" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNotifying(true);

    try {
      const event = events.find(e => e.id === selectedEvent);
      if (!event) return;

      await submitEventRegistration({
        eventId: event.id.toString(),
        eventTitle: `Notify Me - ${event.title}`,
        name: 'Email Notification Request',
        email: notifyEmail,
        phone: '',
        organization: '',
        experience: '',
        expectations: `Please notify me when registration opens for ${event.title}`,
        dietaryRestrictions: ''
      });

      toast.success('Notification request submitted!', {
        description: 'You will receive an email when registration opens.',
        icon: <CheckCircle className="w-4 h-4" />,
      });

      setNotifyEmail('');
      setShowNotifyForm(false);

    } catch (error) {
      console.error('Notify submission error:', error);
      toast.error('Failed to submit notification request', {
        description: 'Please try again or contact us directly.',
        icon: <AlertCircle className="w-4 h-4" />,
      });
    } finally {
      setIsNotifying(false);
    }
  };

  const filteredEvents = events.filter(event => 
    selectedType === "All" || event.type === selectedType
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'registration-open':
        return <Badge className="bg-green-500 hover:bg-green-600">Registration Open</Badge>;
      case 'early-bird':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Early Bird</Badge>;
      case 'coming-soon':
        return <Badge variant="outline">Coming Soon</Badge>;
      case 'sold-out':
        return <Badge variant="destructive">Sold Out</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getEventIcon = (category: string) => {
    switch (category) {
      case 'Development':
        return <Code className="w-5 h-5" />;
      case 'Business':
        return <Trophy className="w-5 h-5" />;
      case 'Marketing':
        return <Users className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  if (selectedEvent) {
    const event = events.find(e => e.id === selectedEvent);
    if (!event) return null;

    if (showRegistrationForm) {
      return (
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-6 py-20 max-w-2xl">
            <Button
              variant="ghost"
              onClick={() => setShowRegistrationForm(false)}
              className="mb-8"
            >
              ← Back
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold mb-4">Register for {event.title}</h1>
                <p className="text-muted-foreground">
                  Complete the form below to secure your spot. All fields marked with * are required.
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={registrationData.name}
                          onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={registrationData.email}
                          onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={registrationData.phone}
                          onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="organization">Organization/Company</Label>
                        <Input
                          id="organization"
                          value={registrationData.organization}
                          onChange={(e) => setRegistrationData(prev => ({ ...prev, organization: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="experience">Your Experience Level</Label>
                      <Textarea
                        id="experience"
                        placeholder="Briefly describe your background and experience level relevant to this event..."
                        value={registrationData.experience}
                        onChange={(e) => setRegistrationData(prev => ({ ...prev, experience: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="expectations">What do you hope to learn?</Label>
                      <Textarea
                        id="expectations"
                        placeholder="Tell us what you hope to gain from this event..."
                        value={registrationData.expectations}
                        onChange={(e) => setRegistrationData(prev => ({ ...prev, expectations: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    {(event.location !== 'Online' && event.type !== 'Webinar' && !event.location.includes('Zoom')) && (
                      <div>
                        <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                        <Input
                          id="dietaryRestrictions"
                          placeholder="Any dietary restrictions or allergies we should know about?"
                          value={registrationData.dietaryRestrictions}
                          onChange={(e) => setRegistrationData(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
                        />
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Processing Registration...' : 'Complete Registration'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      );
    }

    if (showNotifyForm) {
      return (
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-6 py-20 max-w-2xl">
            <Button
              variant="ghost"
              onClick={() => setShowNotifyForm(false)}
              className="mb-8"
            >
              ← Back
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold mb-4">Get Notified - {event.title}</h1>
                <p className="text-muted-foreground">
                  Enter your email address and we'll notify you when registration opens for this event.
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleNotifySubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="notifyEmail">Email Address *</Label>
                      <Input
                        id="notifyEmail"
                        type="email"
                        value={notifyEmail}
                        onChange={(e) => setNotifyEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>

                    <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                      <p>We'll send you an email notification as soon as registration opens for this event. No spam, just event updates!</p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isNotifying}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isNotifying ? 'Submitting...' : 'Notify Me When Registration Opens'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        {/* Event Header */}
        <div className="bg-gradient-to-b from-muted/30 to-background py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => setSelectedEvent(null)}
              className="mb-8"
            >
              ← Back
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  {getEventIcon(event.category)}
                </div>
                <div>
                  <Badge>{event.type}</Badge>
                  <Badge variant="outline" className="ml-2">{event.level}</Badge>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {event.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {event.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date === '' || event.date === 'TBA' ? 'To be announced' : new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{event.time} ({event.duration})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span>Instructor: {event.instructor}</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {event.price}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                {getStatusBadge(event.status)}
                {event.status === 'registration-open' && (
                  <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setShowRegistrationForm(true)}>
                    Register Now
                  </Button>
                )}
                {event.status === 'early-bird' && (
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600" onClick={() => setShowRegistrationForm(true)}>
                    Early Bird Registration
                  </Button>
                )}
                {event.status === 'coming-soon' && (
                  <Button size="lg" variant="outline" onClick={() => setShowNotifyForm(true)}>
                    Notify Me
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Event Details */}
        <div className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="agenda">Agenda</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
                  {event.topics && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {event.topics.map((topic, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-4">About Your Instructor</h3>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-bold">{event.instructor}</h4>
                    <p className="text-muted-foreground">{event.instructorRole}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="agenda">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Event Schedule</h3>
                  {event.agenda && (
                    <div className="space-y-4">
                      {Object.entries(event.agenda).map(([time, activity], index) => (
                        <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                          <div className="font-bold text-primary min-w-32">{time}</div>
                          <div>{activity}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="requirements">
                <div>
                  <h3 className="text-2xl font-bold mb-6">What to Bring</h3>
                  {event.requirements && (
                    <div className="space-y-3">
                      {event.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>{requirement}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="location">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Venue Information</h3>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-bold mb-2">{event.location}</h4>
                    <p className="text-muted-foreground mb-4">{event.locationDetails}</p>

                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
            <Badge className="mb-4">Events</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn, Grow, and Connect
            </h1>
            <p className="text-xl text-muted-foreground">
              Join our workshops, webinars, and conferences to expand your skills, 
              network with like-minded professionals, and stay ahead in the digital landscape.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Event Type Filters */}
      <div className="py-8 border-b">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="flex gap-2">
              {eventTypes.map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Event */}
      {events.find(e => e.featured) && selectedType === "All" && (
        <div className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-8">Featured Event</h2>
              {events.filter(e => e.featured).map(event => (
                <Card key={event.id} className="overflow-hidden bg-gradient-to-r from-primary/5 to-primary/10">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-8 p-8">
                      <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                            {getEventIcon(event.category)}
                          </div>
                          <div>
                            <Badge>{event.type}</Badge>
                            <Badge variant="outline" className="ml-2">{event.level}</Badge>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{event.date === '' || event.date === 'TBA' ? 'To be announced' : new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span>{event.capacity}</span>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => setSelectedEvent(event.id)}
                          className="w-full md:w-auto"
                        >
                          Learn More & Register
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                      
                      <div className="bg-white/50 rounded-lg p-6 flex flex-col justify-center items-center text-center">
                        {getStatusBadge(event.status)}
                        <div className="mt-4 text-sm text-muted-foreground">
                          Duration: {event.duration}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Capacity: {event.capacity}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* Events Grid */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.filter(e => !e.featured).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => setSelectedEvent(event.id)}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          {getEventIcon(event.category)}
                        </div>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>
                    <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date === '' || event.date === 'TBA' ? 'To be announced' : new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Badge variant="secondary">{event.level}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Want to Host an Event?</h2>
            <p className="text-muted-foreground mb-8">
              Have an idea for a workshop or want to speak at one of our events? 
              We're always looking for passionate educators and industry experts.
            </p>
            <Button onClick={() => onNavigate('contact-event-host')}>
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}