import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react';

export default function EventsSection() {
  // Mock events data - todo: remove mock functionality
  const upcomingEvents = [
    {
      id: 1,
      title: "Startup Pitch Competition 2024",
      description: "Present your innovative ideas to a panel of industry experts and investors. Win exciting prizes and funding opportunities.",
      date: "2024-01-15",
      time: "10:00 AM",
      location: "Main Auditorium, NCE",
      category: "Competition",
      participants: 150,
      status: "Open for Registration"
    },
    {
      id: 2,
      title: "Entrepreneurship Workshop with Industry Leader",
      description: "Learn from successful entrepreneurs about building and scaling startups. Interactive session with Q&A.",
      date: "2024-01-22",
      time: "2:00 PM",
      location: "Conference Hall A",
      category: "Workshop",
      participants: 80,
      status: "Limited Seats"
    },
    {
      id: 3,
      title: "Investor Connect - Networking Session",
      description: "Network with angel investors, VCs, and successful alumni. Perfect opportunity to pitch your ideas informally.",
      date: "2024-01-28",
      time: "6:00 PM",
      location: "Student Center",
      category: "Networking",
      participants: 60,
      status: "By Invitation"
    },
    {
      id: 4,
      title: "Tech Innovation Bootcamp",
      description: "3-day intensive bootcamp on building tech products. Hands-on sessions with industry mentors.",
      date: "2024-02-05",
      time: "9:00 AM",
      location: "Computer Lab 1-3",
      category: "Bootcamp",
      participants: 40,
      status: "Early Bird"
    }
  ];

  const handleRegister = (eventTitle: string) => {
    console.log(`Register for ${eventTitle} clicked`);
  };

  const handleLearnMore = (eventId: number) => {
    console.log(`Learn more about event ${eventId} clicked`);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'competition': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'workshop': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'networking': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'bootcamp': return 'bg-purple-500/10 text-purple-700 border-purple-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open for registration': return 'bg-green-500';
      case 'limited seats': return 'bg-yellow-500';
      case 'by invitation': return 'bg-blue-500';
      case 'early bird': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-events-title">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground" data-testid="text-events-description">
            Join us for exciting workshops, competitions, and networking opportunities designed to fuel your entrepreneurial journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover-elevate border border-card-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge 
                        variant="outline" 
                        className={getCategoryColor(event.category)}
                        data-testid={`badge-category-${event.id}`}
                      >
                        {event.category}
                      </Badge>
                      <div className="flex items-center">
                        <div 
                          className={`w-2 h-2 rounded-full ${getStatusColor(event.status)} mr-2`}
                        ></div>
                        <span className="text-xs text-muted-foreground">{event.status}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2" data-testid={`text-event-title-${event.id}`}>
                      {event.title}
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4" data-testid={`text-event-description-${event.id}`}>
                  {event.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span data-testid={`text-event-date-${event.id}`}>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    <span data-testid={`text-event-time-${event.id}`}>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    <span data-testid={`text-event-location-${event.id}`}>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    <span data-testid={`text-event-participants-${event.id}`}>{event.participants} participants</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1 hover-elevate"
                    onClick={() => handleRegister(event.title)}
                    data-testid={`button-register-${event.id}`}
                  >
                    Register Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="hover-elevate"
                    onClick={() => handleLearnMore(event.id)}
                    data-testid={`button-learn-more-${event.id}`}
                  >
                    Learn More <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Highlights */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4" data-testid="text-achievements-title">
              Recent Achievements
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover-elevate border border-card-border">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2" data-testid="text-achievement-1">
                  🏆 1st Place
                </div>
                <h4 className="font-bold text-card-foreground mb-2">Inter-College Startup Competition</h4>
                <p className="text-sm text-muted-foreground">Our team won the regional startup competition with an innovative EdTech solution.</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate border border-card-border">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-chart-2 mb-2" data-testid="text-achievement-2">
                  💡 5 Startups
                </div>
                <h4 className="font-bold text-card-foreground mb-2">Successfully Launched</h4>
                <p className="text-sm text-muted-foreground">Five startups from our incubation program are now operational and generating revenue.</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate border border-card-border">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-500 mb-2" data-testid="text-achievement-3">
                  ₹10L+ Funding
                </div>
                <h4 className="font-bold text-card-foreground mb-2">Raised by Alumni</h4>
                <p className="text-sm text-muted-foreground">E-Cell alumni have raised significant funding for their innovative ventures.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}