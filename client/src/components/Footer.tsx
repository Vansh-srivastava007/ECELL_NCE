import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Linkedin, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import logoImage from '@assets/image_1758399325836.png';

export default function Footer() {
  const handleSocialClick = (platform: string, url: string) => {
    console.log(`${platform} clicked: ${url}`);
    window.open(url, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:ecellncechandi@gmail.com';
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <img src={logoImage} alt="E-Cell NCE Logo" className="h-12 w-12 rounded-lg object-cover" />
              <div>
                <h3 className="text-xl font-bold text-card-foreground" data-testid="text-footer-brand">E-Cell NCE</h3>
                <p className="text-sm text-muted-foreground">Entrepreneurship Cell</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md" data-testid="text-footer-description">
              Nalanda College of Engineering's Entrepreneurship Cell is dedicated to fostering innovation and entrepreneurial spirit among students. We are proudly associated with IIT Bombay E-Cell.
            </p>
            
            <div className="flex space-x-4">
              <Button 
                size="icon" 
                variant="outline" 
                className="hover-elevate"
                onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com/ecellncechandiofficial?igsh=MWQxNG1meTI4anJxdQ==')}
                data-testid="button-instagram"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              
              <Button 
                size="icon" 
                variant="outline" 
                className="hover-elevate"
                onClick={() => handleSocialClick('LinkedIn', 'https://www.linkedin.com/in/e-cell-nce-chandi-785980326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app')}
                data-testid="button-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              
              <Button 
                size="icon" 
                variant="outline" 
                className="hover-elevate"
                onClick={handleEmailClick}
                data-testid="button-email"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-card-foreground mb-4" data-testid="text-footer-links-title">Quick Links</h4>
            <ul className="space-y-2">
              <li><Button variant="ghost" className="justify-start p-0 h-auto hover-elevate" data-testid="button-footer-about">About Us</Button></li>
              <li><Button variant="ghost" className="justify-start p-0 h-auto hover-elevate" data-testid="button-footer-events">Events</Button></li>
              <li><Button variant="ghost" className="justify-start p-0 h-auto hover-elevate" data-testid="button-footer-team">Our Team</Button></li>
              <li><Button variant="ghost" className="justify-start p-0 h-auto hover-elevate" data-testid="button-footer-gallery">Gallery</Button></li>
              <li><Button variant="ghost" className="justify-start p-0 h-auto hover-elevate" data-testid="button-footer-achievements">Achievements</Button></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-card-foreground mb-4" data-testid="text-footer-contact-title">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground" data-testid="text-footer-address">
                    Nalanda College of Engineering<br />
                    Chandi, Bihar, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <Button 
                  variant="ghost" 
                  className="justify-start p-0 h-auto text-sm hover-elevate"
                  onClick={handleEmailClick}
                  data-testid="button-footer-email"
                >
                  ecellncechandi@gmail.com
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground" data-testid="text-footer-phone">+91 7372066583
</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground mb-4 sm:mb-0" data-testid="text-footer-copyright">
              © 2024 E-Cell NCE. All rights reserved. Proudly associated with IIT Bombay E-Cell.
            </p>
            
            <div className="flex items-center space-x-4 text-sm">
              <Button variant="ghost" className="p-0 h-auto text-sm hover-elevate" data-testid="button-footer-privacy">Privacy Policy</Button>
              <span className="text-muted-foreground">•</span>
              <Button variant="ghost" className="p-0 h-auto text-sm hover-elevate" data-testid="button-footer-terms">Terms of Service</Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}