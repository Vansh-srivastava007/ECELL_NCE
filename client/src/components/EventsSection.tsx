import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react';

export default function EventsSection() {


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