import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users, Play, Trophy, Code, ArrowRight, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface EventsPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
}

export const events = [
  {
    id: 1,
    slug: 'introduction-to-how-to-make-a-roblox-game',
    title: "Introduction to How to make a Roblox Game",
    description: "Join our comprehensive workshop where you'll learn the fundamentals of Roblox game development using Roblox Studio and Lua scripting. Perfect for beginners and aspiring game developers!",
    fullDescription: `
      <h2>About This Workshop</h2>
      <p>Dive into the exciting world of Roblox game development! This beginner-friendly workshop will teach you everything you need to know to create your first Roblox game. From setting up Roblox Studio to publishing your finished game, we'll guide you through every step of the process.</p>
      
      <h3>What You'll Learn</h3>
      <p>Our comprehensive curriculum covers all the essential skills needed to become a successful Roblox developer:</p>
      
      <h4>Game Development Fundamentals</h4>
      <ul>
        <li>Understanding the Roblox ecosystem and platform</li>
        <li>Navigating Roblox Studio interface and tools</li>
        <li>Basic game design principles and best practices</li>
        <li>Introduction to 3D modeling and world building</li>
      </ul>
      
      <h4>Lua Scripting Essentials</h4>
      <ul>
        <li>Programming fundamentals and logic</li>
        <li>Variables, functions, and control structures</li>
        <li>Event handling and player interactions</li>
        <li>Common scripting patterns in Roblox</li>
      </ul>
      
      <h4>Hands-On Project</h4>
      <p>You'll create a complete game project during the workshop, including:</p>
      <ul>
        <li>Designing and building a game world</li>
        <li>Implementing player movement and controls</li>
        <li>Adding interactive objects and power-ups</li>
        <li>Creating win/lose conditions and scoring</li>
        <li>Testing and debugging your game</li>
        <li>Publishing and sharing your creation</li>
      </ul>
      
      <h3>Who Should Attend</h3>
      <p>This workshop is perfect for:</p>
      <ul>
        <li>Complete beginners with no programming experience</li>
        <li>Students interested in game development</li>
        <li>Parents wanting to learn alongside their children</li>
        <li>Educators looking to incorporate game development in their curriculum</li>
        <li>Anyone curious about the Roblox platform</li>
      </ul>
      
      <h3>What You'll Take Away</h3>
      <ul>
        <li>A fully functional Roblox game you created</li>
        <li>Foundational knowledge of Lua scripting</li>
        <li>Understanding of game development workflow</li>
        <li>Resources and tutorials for continued learning</li>
        <li>Certificate of completion</li>
        <li>Access to our private Discord community</li>
      </ul>
    `,
    type: "Workshop",
    category: "Development",
    date: "2025-02-27",
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
    price: "Free",
    image: "https://images.unsplash.com/photo-1704244377777-fc9d78f11643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2Jsb3glMjBnYW1lJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzU3NDUwMzU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    certificate: "Completion Certificate",
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
      "Basic computer skills",
      "Stable internet connection for Zoom",
      "Microphone and camera (optional but recommended)"
    ]
  },
  {
    id: 2,
    slug: 'web-development-bootcamp-react-nodejs',
    title: "Web Development Bootcamp: React & Node.js",
    description: "Intensive 3-day bootcamp covering modern web development with React frontend and Node.js backend. Build a complete full-stack application from scratch.",
    type: "Bootcamp",
    category: "Development",
    date: "2025-03-15",
    time: "9:00 AM - 5:00 PM",
    duration: "3 days",
    location: "BGC, Taguig",
    locationDetails: "Tepa Solutions Office, BGC",
    capacity: "15 participants",
    status: "registration-open",
    featured: false,
    instructor: "Jerrie Mataya",
    instructorRole: "Full-Stack Developer",
    level: "Intermediate",
    price: "₱15,000",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHdlYiUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc1NzQ1MDM1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    certificate: "Professional Certificate",
    topics: [
      "React fundamentals and hooks",
      "State management with Redux",
      "Node.js and Express.js backend",
      "Database integration with MongoDB",
      "RESTful API development",
      "Authentication and security",
      "Deployment strategies",
      "Best practices and testing"
    ],
    requirements: [
      "Basic HTML, CSS, and JavaScript knowledge",
      "Own laptop with development environment",
      "Node.js and VS Code installed",
      "GitHub account"
    ]
  },
  {
    id: 3,
    slug: 'ai-automation-business-workshop',
    title: "AI & Automation for Business Leaders",
    description: "Executive workshop on implementing AI and automation solutions in your business. Learn practical strategies to increase efficiency and reduce costs.",
    type: "Executive Workshop",
    category: "Business",
    date: "2025-04-10",
    time: "2:00 PM - 5:00 PM",
    duration: "3 hours",
    location: "Makati City",
    locationDetails: "Marriott Hotel Manila, Makati",
    capacity: "30 participants",
    status: "registration-open",
    featured: false,
    instructor: "Manuel Rodriguez",
    instructorRole: "Business Automation Consultant",
    level: "Executive",
    price: "₱8,500",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHJhaSUyMGF1dG9tYXRpb258ZW58MXx8fHwxNzU3NDUwMzU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    certificate: "Executive Certificate",
    topics: [
      "AI landscape and business opportunities",
      "Process automation strategies",
      "ROI calculation for automation projects",
      "Change management and team adoption",
      "Vendor selection and implementation",
      "Case studies and success stories",
      "Future trends and planning",
      "Networking and Q&A session"
    ],
    requirements: [
      "Business leadership experience",
      "Basic understanding of business processes",
      "Laptop or tablet for exercises"
    ]
  },
  {
    id: 4,
    slug: 'mobile-app-design-ux-workshop',
    title: "Mobile App Design & UX Workshop",
    description: "Learn mobile app design principles, user experience best practices, and hands-on prototyping using Figma. Perfect for designers and product managers.",
    type: "Workshop",
    category: "Design",
    date: "2025-05-08",
    time: "10:00 AM - 4:00 PM",
    duration: "6 hours",
    location: "Zoom Meeting",
    locationDetails: "Interactive online workshop via Zoom",
    capacity: "25 participants",
    status: "coming-soon",
    featured: false,
    instructor: "Sarah Chen",
    instructorRole: "Senior UX Designer",
    level: "Intermediate",
    price: "₱5,000",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfG1vYmlsZSUyMGFwcCUyMGRlc2lnbnxlbnwxfHx8fDE3NTc0NTAzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    certificate: "Design Certificate",
    topics: [
      "Mobile design principles and guidelines",
      "User research and persona development",
      "Information architecture for mobile",
      "Prototyping with Figma",
      "Usability testing and iteration",
      "Accessibility in mobile design",
      "Design systems and component libraries",
      "Collaboration with developers"
    ],
    requirements: [
      "Basic design knowledge",
      "Figma account (free tier sufficient)",
      "Understanding of mobile platforms"
    ]
  }
];

const categories = ["All", "Development", "Business", "Design"];
const types = ["All", "Workshop", "Bootcamp", "Executive Workshop"];

const eventGalleryImages = [
  {
    id: 1,
    alt: "Roblox game development workshop in progress",
    caption: "Students learning Roblox game development fundamentals"
  },
  {
    id: 2,
    alt: "Web development bootcamp participants coding",
    caption: "Participants building their first full-stack web application"
  },
  {
    id: 3,
    alt: "AI and automation workshop for business leaders",
    caption: "Business executives learning AI implementation strategies"
  },
  {
    id: 4,
    alt: "Mobile app design workshop with Figma",
    caption: "Designers creating mobile app prototypes and wireframes"
  },
  {
    id: 5,
    alt: "Networking session at tech event",
    caption: "Participants networking and sharing ideas during break"
  },
  {
    id: 6,
    alt: "Hands-on coding session",
    caption: "One-on-one mentoring during intensive coding workshop"
  },
  {
    id: 7,
    alt: "Graduation ceremony for bootcamp completion",
    caption: "Celebrating successful completion of web development bootcamp"
  },
  {
    id: 8,
    alt: "Team collaboration during hackathon",
    caption: "Teams working together on innovative solutions"
  },
  {
    id: 9,
    alt: "Presenter explaining AI concepts",
    caption: "Expert presenter demonstrating AI automation tools"
  }
];

export function EventsPage({ navigate }: EventsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesType = selectedType === "All" || event.type === selectedType;
    return matchesCategory && matchesType;
  });

  const featuredEvent = events.find(event => event.featured);
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());

  const handleEventClick = (event: typeof events[0]) => {
    if (navigate) {
      navigate(`/events/${event.slug}`);
    }
  };

  const handleRegisterClick = (event: typeof events[0]) => {
    if (navigate) {
      navigate(`/contact-us/event-hosting?event=${event.slug}`);
    }
  };

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
            <Badge className="mb-4">Events & Workshops</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn, Grow, and Connect
            </h1>
            <p className="text-xl text-muted-foreground">
              Join our community events, workshops, and training sessions. 
              Level up your skills with hands-on learning experiences led by industry experts.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="py-8 border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2">
                <span className="text-sm text-muted-foreground">Category:</span>
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
              
              <div className="flex gap-2">
                <span className="text-sm text-muted-foreground">Type:</span>
                {types.map(type => (
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
      </div>

      {/* Featured Event */}
      {featuredEvent && selectedCategory === "All" && selectedType === "All" && (
        <div className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-8">Featured Event</h2>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-64 md:h-full">
                      <img
                        src={featuredEvent.image}
                        alt={featuredEvent.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline">{featuredEvent.type}</Badge>
                        <Badge variant="secondary">{featuredEvent.level}</Badge>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {featuredEvent.price}
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{featuredEvent.title}</h3>
                      <p className="text-muted-foreground mb-6">{featuredEvent.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{new Date(featuredEvent.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{featuredEvent.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{featuredEvent.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{featuredEvent.capacity}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button onClick={() => handleEventClick(featuredEvent)}>
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" onClick={() => handleRegisterClick(featuredEvent)}>
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      )}

      {/* Events Grid */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => handleEventClick(event)}>
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="secondary">{event.type}</Badge>
                      {event.status === 'registration-open' && (
                        <Badge className="bg-green-600 text-white">Open</Badge>
                      )}
                      {event.status === 'coming-soon' && (
                        <Badge variant="outline">Coming Soon</Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{event.category}</Badge>
                      <span className="text-sm font-medium text-primary">{event.price}</span>
                    </div>
                    <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{event.description}</p>
                    
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <p className="font-medium">{event.instructor}</p>
                        <p className="text-muted-foreground">{event.instructorRole}</p>
                      </div>
                      <Badge variant="outline">{event.level}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No events found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Event Gallery */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Event Highlights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take a look at our past events and workshops. See the learning, collaboration, 
              and innovation happening in our tech community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {eventGalleryImages.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: image.id * 0.1 }}
                className="group"
              >
                <div className="aspect-video bg-muted/20 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="/images/placeholder"
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    data-priority={image.id <= 3 ? "high" : undefined}
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">{image.caption}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Want to Host an Event?</h2>
            <p className="text-muted-foreground mb-8">
              Interested in hosting a workshop or event with us? We'd love to collaborate 
              and bring valuable learning experiences to your community.
            </p>
            <Button size="lg" onClick={() => navigate?.('/contact-us/event-hosting')}>
              Partner With Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}