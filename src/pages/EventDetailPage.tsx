import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, User, ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { eventsData, Event } from '../data/events';

interface EventDetailPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
  eventId?: string;
}

export function EventDetailPage({ navigate, currentPath, eventId }: EventDetailPageProps) {
  // Extract event ID from current path if not provided
  const id = eventId || currentPath?.split('/events/')[1];
  
  // Find the event by ID
  const event = eventsData.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  const handleBack = () => {
    navigate?.('/events');
  };

  const isUpcoming = new Date(event.date) > new Date();
  const statusColor = event.status === 'registration-open' ? 'default' : 
                     event.status === 'sold-out' ? 'destructive' : 'secondary';

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
            Back to Events
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Event Details */}
          <div className="lg:col-span-2">
            {/* Event Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{event.category}</Badge>
                <Badge variant={statusColor}>
                  {event.status.replace('-', ' ').toUpperCase()}
                </Badge>
                {event.featured && <Badge variant="default">Featured</Badge>}
                <Badge variant="outline">{event.level}</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {event.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </motion.header>

            {/* Event Image */}
            {event.image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl"
                />
              </motion.div>
            )}

            {/* Topics Covered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {event.topics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Agenda */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">Event Agenda</h2>
              <div className="space-y-3">
                {Object.entries(event.agenda).map(([time, activity], index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm font-mono text-muted-foreground min-w-[120px]">
                      {time}
                    </div>
                    <div>{activity}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {event.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Event Info Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Date & Time */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-sm text-muted-foreground">{event.time}</div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span>{event.duration}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">{event.location}</div>
                      {event.locationDetails && (
                        <div className="text-sm text-muted-foreground">{event.locationDetails}</div>
                      )}
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">{event.instructor}</div>
                      <div className="text-sm text-muted-foreground">{event.instructorRole}</div>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span>{event.capacity}</span>
                  </div>

                  {/* Price */}
                  {event.price && (
                    <div className="text-center py-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold">{event.price}</div>
                      {event.price === 'Free' && (
                        <div className="text-sm text-muted-foreground">No registration fee</div>
                      )}
                    </div>
                  )}

                  {/* Certificate */}
                  {event.certificate && (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">{event.certificate}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    {isUpcoming && event.status === 'registration-open' ? (
                      <Button className="w-full" size="lg" onClick={() => navigate?.('/contact-us/event-hosting')}>
                        Register Now
                      </Button>
                    ) : (
                      <Button variant="secondary" className="w-full" size="lg" disabled>
                        {event.status === 'sold-out' ? 'Sold Out' : 'Registration Closed'}
                      </Button>
                    )}
                    
                    <Button variant="outline" className="w-full" onClick={() => navigate?.('/contact-us/event-hosting')}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Get Event Updates
                    </Button>
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