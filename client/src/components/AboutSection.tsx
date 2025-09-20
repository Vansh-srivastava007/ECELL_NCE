import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Lightbulb, Network, Trophy, MessageCircle } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Who We Are Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-who-we-are-title">
              WHO WE ARE..?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="hover-elevate border border-card-border">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg text-card-foreground leading-relaxed" data-testid="text-who-we-are-description">
                      The Entrepreneurship Cell of Nalanda College of Engineering is a student-driven initiative that aims to promote entrepreneurial thinking and innovation. We are proudly associated with IIT Bombay E-Cell, enabling students to learn, build, and launch impactful startups.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What We Do Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-what-we-do-title">
              WHAT WE DO..?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-elevate border border-card-border">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3" data-testid="text-workshops-title">
                    Workshops & Talks
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-workshops-description">
                    Sessions with industry experts to share knowledge and insights about entrepreneurship and innovation.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate border border-card-border">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-chart-2" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3" data-testid="text-competitions-title">
                    Startup Competitions
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-competitions-description">
                    Platforms to showcase ideas and compete with fellow entrepreneurs to win exciting prizes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate border border-card-border">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Network className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3" data-testid="text-networking-title">
                    Networking & Mentorship
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-networking-description">
                    Connect with investors, successful entrepreneurs, and alumni to build valuable relationships.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}