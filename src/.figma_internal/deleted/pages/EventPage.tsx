import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Send, CheckCircle, Trophy, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { events } from './EventsPage';

interface EventPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
  eventSlug?: string;
}

export function EventPage({ navigate, eventSlug }: EventPageProps) {
  const event = events.find(e => e.slug === eventSlug);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-8">The event you're looking for doesn't exist.</p>
          <Button onClick={() => navigate?.('/events')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate?.('/events');
  };

  const handleRegisterClick = () => {
    navigate?.(`/contact-us/event-hosting?event=${event.slug}`);
  };

  const isEventPast = new Date(event.date) < new Date();
  const isRegistrationOpen = event.status === 'registration-open' && !isEventPast;

  return (
    <div className="min-h-screen bg-background">
      {/* Event Header */}
      <div className="relative">
        {/* Hero Image */}
        <div className="h-96 relative overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Header Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 pb-12">
              <Button
                variant="ghost"
                onClick={handleBackClick}
                className="mb-8 text-white hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl text-white"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-white/20 text-white border-white/30">{event.type}</Badge>
                  <Badge className="bg-white/20 text-white border-white/30">{event.level}</Badge>
                  <Badge className="bg-green-600 text-white">{event.price}</Badge>
                  {isRegistrationOpen && (
                    <Badge className="bg-blue-600 text-white">Registration Open</Badge>
                  )}
                  {isEventPast && (
                    <Badge className="bg-gray-600 text-white">Past Event</Badge>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {event.title}
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Date</p>
                          <p className="text-muted-foreground">{new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Time & Duration</p>
                          <p className="text-muted-foreground">{event.time}</p>
                          <p className="text-muted-foreground">{event.duration}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">{event.location}</p>
                          <p className="text-muted-foreground text-sm">{event.locationDetails}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Capacity</p>
                          <p className="text-muted-foreground">{event.capacity}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* About the Event */}
              {event.fullDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>About This Event</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: event.fullDescription }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Topics Covered */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      What You'll Learn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {event.topics.map((topic, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {event.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Registration Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {isRegistrationOpen ? 'Register for This Event' : 
                         isEventPast ? 'Event Completed' : 'Registration Coming Soon'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{event.price}</div>
                        <p className="text-sm text-muted-foreground">Per participant</p>
                      </div>
                      
                      {isRegistrationOpen && (
                        <>
                          <Button onClick={handleRegisterClick} className="w-full" size="lg">
                            Register Now
                            <Send className="w-4 h-4 ml-2" />
                          </Button>
                          <p className="text-xs text-muted-foreground text-center">
                            Secure your spot - limited capacity available
                          </p>
                        </>
                      )}
                      
                      {isEventPast && (
                        <div className="text-center">
                          <p className="text-muted-foreground mb-4">This event has already taken place.</p>
                          <Button variant="outline" onClick={() => navigate?.('/events')}>
                            View Other Events
                          </Button>
                        </div>
                      )}
                      
                      {event.status === 'coming-soon' && (
                        <div className="text-center">
                          <p className="text-muted-foreground mb-4">Registration opens soon. Stay tuned!</p>
                          <Button variant="outline" onClick={() => navigate?.('/contact-us/support')}>
                            Get Notified
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Instructor Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Instructor
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold">{event.instructor}</h4>
                          <p className="text-sm text-muted-foreground">{event.instructorRole}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Certificate Info */}
                {event.certificate && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="w-5 h-5" />
                          Certificate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Participants will receive a <strong>{event.certificate}</strong> upon successful completion of the event.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Have Questions?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Need more information about this event? We're here to help!
                      </p>
                      <Button variant="outline" size="sm" onClick={() => navigate?.('/contact-us/support')}>
                        Contact Us
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Events */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-2xl font-bold mb-8">Other Events You Might Like</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {events
                .filter(e => e.id !== event.id && e.category === event.category)
                .slice(0, 2)
                .map(relatedEvent => (
                  <Card
                    key={relatedEvent.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => navigate?.(`/events/${relatedEvent.slug}`)}
                  >
                    <div className="relative h-48">
                      <img
                        src={relatedEvent.image}
                        alt={relatedEvent.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary">{relatedEvent.type}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 line-clamp-2">{relatedEvent.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {relatedEvent.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{new Date(relatedEvent.date).toLocaleDateString()}</span>
                        <span>{relatedEvent.price}</span>
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