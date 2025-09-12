import { useState } from 'react';
import { motion } from 'framer-motion';
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
    slug: 'free-introduction-roblox-game-development',
    title: "Free Introduction of Roblox Game Development",
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
    price: "Free",
    image: "https://ruhsxjeiegdeshcnbuxy.supabase.co/storage/v1/object/public/tepa-images/September%202025/events/course/free-roblox-game-dev.jpeg",
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
    slug: 'introduction-to-html-and-css',
    title: "Introduction to HTML and CSS",
    description: "Learn the fundamentals of web development with HTML and CSS. Perfect for beginners who want to start their journey in web development and create beautiful, responsive websites.",
    fullDescription: `
      <h2>About This Workshop</h2>
      <p>Start your web development journey with the building blocks of the web! This beginner-friendly workshop will introduce you to HTML and CSS, the essential technologies that power every website on the internet.</p>
      
      <h3>What You'll Learn</h3>
      <p>Our hands-on curriculum covers everything you need to get started with web development:</p>
      
      <h4>HTML Fundamentals</h4>
      <ul>
        <li>Understanding HTML structure and syntax</li>
        <li>Working with elements, tags, and attributes</li>
        <li>Creating semantic markup for accessibility</li>
        <li>Building forms and interactive elements</li>
        <li>Working with images, links, and media</li>
      </ul>
      
      <h4>CSS Styling Essentials</h4>
      <ul>
        <li>CSS syntax and selectors</li>
        <li>Colors, fonts, and typography</li>
        <li>Box model and layout principles</li>
        <li>Responsive design basics</li>
        <li>Flexbox and Grid layouts</li>
      </ul>
      
      <h4>Hands-On Project</h4>
      <p>You'll build a complete personal portfolio website including:</p>
      <ul>
        <li>Professional homepage with navigation</li>
        <li>About section with personal information</li>
        <li>Portfolio showcase section</li>
        <li>Contact form and footer</li>
        <li>Responsive design for mobile devices</li>
        <li>Basic animations and interactions</li>
      </ul>
      
      <h3>Who Should Attend</h3>
      <p>This workshop is ideal for:</p>
      <ul>
        <li>Complete beginners with no coding experience</li>
        <li>Students interested in web development</li>
        <li>Business owners wanting to understand web basics</li>
        <li>Designers looking to learn implementation</li>
        <li>Anyone curious about how websites are built</li>
      </ul>
    `,
    type: "Workshop",
    category: "Development",
    date: "2025-09-20",
    time: "2:00 PM - 5:00 PM",
    duration: "3 hours",
    location: "Zoom Meeting",
    locationDetails: "Interactive online workshop via Zoom",
    capacity: "25 participants",
    status: "registration-open",
    featured: false,
    instructor: "Jerrie Mataya",
    instructorRole: "Frontend Developer",
    level: "Beginner",
    price: "Free",
    image: "https://ruhsxjeiegdeshcnbuxy.supabase.co/storage/v1/object/public/tepa-images/September%202025/events/course/learn-html-css-free.jpg",
    certificate: "Completion Certificate",
    topics: [
      "HTML structure and elements",
      "CSS fundamentals and styling",
      "Responsive design principles",
      "Building a portfolio website",
      "Web development best practices",
      "Browser developer tools",
      "Deployment and hosting basics"
    ],
    requirements: [
      "Computer with internet connection",
      "Text editor (VS Code recommended)",
      "Modern web browser (Chrome, Firefox, Safari)",
      "Basic computer skills",
      "Enthusiasm to learn!"
    ]
  },
  {
    id: 3,
    slug: 'introduction-to-website-funnel',
    title: "Introduction to Website Funnel",
    description: "Learn how to create effective website funnels that convert visitors into customers. Master the psychology and strategy behind high-converting sales funnels for your business.",
    fullDescription: `
      <h2>About This Workshop</h2>
      <p>Transform your website into a powerful sales machine! This comprehensive workshop will teach you how to design and implement effective website funnels that guide visitors through a strategic journey from awareness to conversion.</p>
      
      <h3>What You'll Learn</h3>
      <p>Master the art and science of funnel creation with our proven framework:</p>
      
      <h4>Funnel Strategy Fundamentals</h4>
      <ul>
        <li>Understanding the customer journey and buyer psychology</li>
        <li>Different types of funnels and when to use them</li>
        <li>Mapping your ideal customer's path to purchase</li>
        <li>Creating compelling value propositions</li>
      </ul>
      
      <h4>Funnel Design and Implementation</h4>
      <ul>
        <li>Landing page design principles</li>
        <li>Writing persuasive copy and headlines</li>
        <li>Call-to-action optimization</li>
        <li>Lead magnets and opt-in strategies</li>
        <li>Email sequence automation</li>
      </ul>
      
      <h4>Optimization and Analytics</h4>
      <ul>
        <li>A/B testing methodologies</li>
        <li>Conversion rate optimization techniques</li>
        <li>Analytics and performance tracking</li>
        <li>Identifying and fixing funnel leaks</li>
      </ul>
      
      <h3>Practical Workshop Project</h3>
      <p>You'll create your own funnel strategy including:</p>
      <ul>
        <li>Customer avatar and journey mapping</li>
        <li>Funnel wireframes and flow design</li>
        <li>Landing page copy and structure</li>
        <li>Email sequence outline</li>
        <li>Conversion tracking setup</li>
      </ul>
    `,
    type: "Workshop",
    category: "Business",
    date: "Coming Soon",
    time: "1:00 PM - 4:00 PM",
    duration: "3 hours",
    location: "Zoom Meeting",
    locationDetails: "Remote",
    capacity: "20 participants",
    status: "Coming Soon",
    featured: false,
    instructor: "Coming Soon",
    instructorRole: "Coming Soon",
    level: "Begginer",
    price: "TBA",
    image: "https://ruhsxjeiegdeshcnbuxy.supabase.co/storage/v1/object/public/tepa-images/September%202025/events/course/learn-website-funneling.jpg",
    certificate: "Marketing Certificate",
    topics: [
      "Funnel psychology and strategy",
      "Customer journey mapping",
      "Landing page optimization",
      "Conversion copywriting",
      "Lead generation tactics",
      "Email marketing automation",
      "Analytics and optimization",
      "A/B testing fundamentals"
    ],
    requirements: [
      "Basic understanding of digital marketing",
      "Laptop for hands-on exercises",
      "Existing business or business idea",
      "Willingness to share and collaborate"
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