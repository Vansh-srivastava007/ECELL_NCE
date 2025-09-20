import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Clock, ExternalLink, Filter, Grid, List, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  maxParticipants: number;
  registeredCount: number;
  status: string;
  image?: string;
}

export default function EnhancedEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [rsvpStatus, setRsvpStatus] = useState<Record<string, boolean>>({});
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
    loadRSVPStatus();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedCategory]);

  const loadEvents = () => {
    setIsLoading(true);
    try {
      const savedEvents = localStorage.getItem('ecell-events');
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      } else {
        // Sample events data
        const sampleEvents: Event[] = [
          {
            id: '1',
            title: 'Startup Pitch Workshop',
            description: 'Learn how to create compelling pitches that attract investors. Interactive workshop with real-world case studies and practice sessions.',
            date: '2024-01-20',
            time: '2:00 PM',
            location: 'Main Auditorium',
            category: 'Workshop',
            maxParticipants: 100,
            registeredCount: 45,
            status: 'Open'
          },
          {
            id: '2',
            title: 'Innovation Challenge 2024',
            description: 'Annual innovation competition where students present their breakthrough ideas. Prizes worth ₹50,000 up for grabs!',
            date: '2024-02-15',
            time: '10:00 AM',
            location: 'Conference Hall A',
            category: 'Competition',
            maxParticipants: 50,
            registeredCount: 23,
            status: 'Open'
          },
          {
            id: '3',
            title: 'Alumni Entrepreneur Meet',
            description: 'Network with successful alumni entrepreneurs. Share experiences, get mentorship, and build valuable connections.',
            date: '2024-01-28',
            time: '6:00 PM',
            location: 'Student Center',
            category: 'Networking',
            maxParticipants: 75,
            registeredCount: 62,
            status: 'Limited Seats'
          },
          {
            id: '4',
            title: 'Digital Marketing Masterclass',
            description: 'Comprehensive masterclass on digital marketing strategies for startups. Covers social media, content marketing, and growth hacking.',
            date: '2024-02-10',
            time: '11:00 AM',
            location: 'Computer Lab 2',
            category: 'Workshop',
            maxParticipants: 40,
            registeredCount: 18,
            status: 'Open'
          }
        ];
        setEvents(sampleEvents);
        localStorage.setItem('ecell-events', JSON.stringify(sampleEvents));
      }
    } catch (error) {
      console.error('Error loading events:', error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRSVPStatus = () => {
    try {
      const savedRSVP = localStorage.getItem('ecell-rsvp');
      if (savedRSVP) {
        setRsvpStatus(JSON.parse(savedRSVP));
      }
    } catch (error) {
      console.error('Error loading RSVP status:', error);
    }
  };

  const filterEvents = () => {
    if (selectedCategory === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => 
        event.category.toLowerCase() === selectedCategory.toLowerCase()
      ));
    }
  };

  const handleRSVP = async (eventId: string) => {
    const isCurrentlyRSVPed = rsvpStatus[eventId] || false;
    const newRSVPStatus = !isCurrentlyRSVPed;
    
    try {
      // Update RSVP status
      const updatedRSVPStatus = { ...rsvpStatus, [eventId]: newRSVPStatus };
      setRsvpStatus(updatedRSVPStatus);
      localStorage.setItem('ecell-rsvp', JSON.stringify(updatedRSVPStatus));
      
      // Update event registration count
      const updatedEvents = events.map(event => {
        if (event.id === eventId) {
          return {
            ...event,
            registeredCount: newRSVPStatus 
              ? event.registeredCount + 1 
              : Math.max(0, event.registeredCount - 1)
          };
        }
        return event;
      });
      
      setEvents(updatedEvents);
      localStorage.setItem('ecell-events', JSON.stringify(updatedEvents));
      
      toast({
        title: newRSVPStatus ? "RSVP Confirmed!" : "RSVP Cancelled",
        description: newRSVPStatus 
          ? "You have successfully registered for this event." 
          : "Your registration has been cancelled.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update RSVP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'workshop': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'competition': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'networking': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'masterclass': return 'bg-purple-500/10 text-purple-700 border-purple-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-green-500';
      case 'limited seats': return 'bg-yellow-500';
      case 'full': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const categories = ['All', ...Array.from(new Set(events.map(event => event.category)))];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border border-card-border">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                <div className="h-20 bg-muted rounded animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="text-events-page-title">
            Upcoming Events
          </h1>
          <p className="text-muted-foreground">
            Discover and register for exciting entrepreneurship events
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40" data-testid="select-category-filter">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase() === 'all' ? 'all' : category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* View Mode Toggle */}
          <div className="flex border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              data-testid="button-grid-view"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              data-testid="button-list-view"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Events Grid/List */}
      {filteredEvents.length === 0 ? (
        <Card className="border border-card-border">
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-bold text-card-foreground mb-2">No Events Found</h3>
            <p className="text-muted-foreground">
              {selectedCategory === 'all' 
                ? "No events scheduled at the moment. Check back soon!"
                : `No events found in the ${selectedCategory} category.`
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' 
          : 'space-y-4'
        }>
          {filteredEvents.map((event) => {
            const isRSVPed = rsvpStatus[event.id] || false;
            const isFull = event.registeredCount >= event.maxParticipants;
            
            return (
              <Card key={event.id} className="hover-elevate border border-card-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge 
                          variant="outline" 
                          className={getCategoryColor(event.category)}
                          data-testid={`badge-event-category-${event.id}`}
                        >
                          {event.category}
                        </Badge>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(event.status)} mr-2`}></div>
                          <span className="text-xs text-muted-foreground">{event.status}</span>
                        </div>
                        {isRSVPed && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                            <Check className="w-3 h-3 mr-1" />
                            Registered
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-card-foreground mb-2" data-testid={`text-event-title-${event.id}`}>
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`text-event-description-${event.id}`}>
                    {event.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      <span>{event.registeredCount}/{event.maxParticipants} registered</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className={`flex-1 hover-elevate ${
                        isRSVPed 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : isFull 
                            ? 'opacity-50 cursor-not-allowed' 
                            : ''
                      }`}
                      onClick={() => handleRSVP(event.id)}
                      disabled={isFull && !isRSVPed}
                      data-testid={`button-rsvp-${event.id}`}
                    >
                      {isRSVPed ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Registered
                        </>
                      ) : isFull ? (
                        'Event Full'
                      ) : (
                        'RSVP Now'
                      )}
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="hover-elevate"
                          onClick={() => setSelectedEvent(event)}
                          data-testid={`button-details-${event.id}`}
                        >
                          Details <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>{event.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getCategoryColor(event.category)}>
                              {event.category}
                            </Badge>
                            {isRSVPed && (
                              <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                                <Check className="w-3 h-3 mr-1" />
                                You're registered
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground">{event.description}</p>
                          
                          <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center text-sm">
                              <Calendar className="w-4 h-4 mr-3 text-primary" />
                              <span className="font-medium mr-2">Date:</span>
                              <span>{new Date(event.date).toDateString()}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="w-4 h-4 mr-3 text-primary" />
                              <span className="font-medium mr-2">Time:</span>
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <MapPin className="w-4 h-4 mr-3 text-primary" />
                              <span className="font-medium mr-2">Location:</span>
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Users className="w-4 h-4 mr-3 text-primary" />
                              <span className="font-medium mr-2">Participants:</span>
                              <span>{event.registeredCount}/{event.maxParticipants} registered</span>
                            </div>
                          </div>

                          <div className="pt-4">
                            <Button 
                              className={`w-full hover-elevate ${
                                isRSVPed 
                                  ? 'bg-green-500 hover:bg-green-600' 
                                  : isFull 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : ''
                              }`}
                              onClick={() => handleRSVP(event.id)}
                              disabled={isFull && !isRSVPed}
                            >
                              {isRSVPed ? (
                                <>
                                  <Check className="w-4 h-4 mr-2" />
                                  Cancel Registration
                                </>
                              ) : isFull ? (
                                'Event Full'
                              ) : (
                                'Register for Event'
                              )}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      
      {/* Stats Summary */}
      {filteredEvents.length > 0 && (
        <Card className="border border-card-border">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-2xl font-bold text-primary" data-testid="text-total-events">
                  {filteredEvents.length}
                </h3>
                <p className="text-sm text-muted-foreground">Total Events</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-chart-2" data-testid="text-your-registrations">
                  {Object.values(rsvpStatus).filter(Boolean).length}
                </h3>
                <p className="text-sm text-muted-foreground">Your RSVPs</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-500" data-testid="text-total-participants">
                  {filteredEvents.reduce((sum, event) => sum + event.registeredCount, 0)}
                </h3>
                <p className="text-sm text-muted-foreground">Total Registrations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}