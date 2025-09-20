import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Mail, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import teamImage1 from '@assets/stock_images/diverse_student_team_d50e2ef7.jpg';
import teamImage2 from '@assets/stock_images/diverse_student_team_3a6597ef.jpg';
import teamImage3 from '@assets/stock_images/diverse_student_team_b3352adf.jpg';

export default function TeamSection() {
  // Mock team data - todo: remove mock functionality
  const teamMembers = [
    { name: "Rahul Sharma", role: "President", department: "CSE", initials: "RS" },
    { name: "Priya Singh", role: "Vice President", department: "ECE", initials: "PS" },
    { name: "Arjun Patel", role: "Technical Head", department: "IT", initials: "AP" },
    { name: "Sneha Kumar", role: "Marketing Head", department: "CSE", initials: "SK" },
    { name: "Vikram Yadav", role: "Event Manager", department: "ME", initials: "VY" },
    { name: "Anjali Gupta", role: "Finance Head", department: "ECE", initials: "AG" },
    { name: "Rohan Das", role: "Design Lead", department: "CSE", initials: "RD" },
    { name: "Kavya Reddy", role: "Operations", department: "IT", initials: "KR" },
    { name: "Amit Joshi", role: "Outreach", department: "ME", initials: "AJ" },
    { name: "Nisha Tiwari", role: "Content Lead", department: "ECE", initials: "NT" },
    { name: "Saurabh Modi", role: "Social Media", department: "CSE", initials: "SM" },
    { name: "Divya Agrawal", role: "Partnership", department: "IT", initials: "DA" },
  ];

  const handleConnect = (member: string) => {
    console.log(`Connect with ${member} clicked`);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-team-title">
            MEET OUR TEAM MEMBERS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground" data-testid="text-team-description">
            We are a team of 12 enthusiastic students working together to promote innovation, creativity, and entrepreneurship on our campus. Connected with IIT Bombay's E-Cell, our mission is to nurture entrepreneurial spirit and create impactful opportunities for budding changemakers.
          </p>
        </div>

        {/* Team Images Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src={teamImage1} 
              alt="Team collaboration session" 
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              data-testid="img-team-1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold">Innovation Workshop</h3>
              <p className="text-sm">Brainstorming session with our core team</p>
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src={teamImage2} 
              alt="Team planning event" 
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              data-testid="img-team-2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-chart-2/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold">Event Planning</h3>
              <p className="text-sm">Organizing our next startup competition</p>
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src={teamImage3} 
              alt="Team networking" 
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              data-testid="img-team-3"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold">Networking Event</h3>
              <p className="text-sm">Connecting with industry mentors</p>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="hover-elevate border border-card-border">
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="text-lg font-bold text-card-foreground mb-1" data-testid={`text-member-name-${index}`}>
                  {member.name}
                </h3>
                
                <Badge variant="secondary" className="mb-2" data-testid={`badge-member-role-${index}`}>
                  {member.role}
                </Badge>
                
                <p className="text-sm text-muted-foreground mb-4">{member.department} Department</p>
                
                <div className="flex justify-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="hover-elevate"
                    onClick={() => handleConnect(member.name)}
                    data-testid={`button-connect-${index}`}
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* IIT Bombay Connection */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto hover-elevate border border-card-border">
            <CardContent className="p-8">
              <Users className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-card-foreground mb-4" data-testid="text-iit-connection-title">
                Connected with IIT Bombay E-Cell
              </h3>
              <p className="text-muted-foreground" data-testid="text-iit-connection-description">
                We are proud to be associated with one of India's most prestigious entrepreneurship ecosystems, giving our students access to world-class resources, mentorship, and networking opportunities.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}