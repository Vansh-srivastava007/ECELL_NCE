import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react';

export default function EventsSection() {

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

        <div className="text-center">
          <Card className="max-w-2xl mx-auto hover-elevate border border-card-border">
            <CardContent className="p-8">
              <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-card-foreground mb-4" data-testid="text-events-coming-soon">
                Events Coming Soon
              </h3>
              <p className="text-muted-foreground" data-testid="text-events-description">
                We're planning exciting workshops, competitions, and networking sessions. Stay tuned for updates on our upcoming events!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}