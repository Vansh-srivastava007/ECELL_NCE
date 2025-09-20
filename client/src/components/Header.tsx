import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@assets/image_1758399325836.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <img src={logoImage} alt="E-Cell NCE Logo" className="h-10 w-10 rounded-lg object-cover" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-primary" data-testid="text-brand-name">E-Cell NCE</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Entrepreneurship Cell - Nalanda College of Engineering</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="hover-elevate" data-testid="button-nav-home">Home</Button>
            <Button variant="ghost" className="hover-elevate" data-testid="button-nav-events">Events</Button>
            <Button variant="ghost" className="hover-elevate" data-testid="button-nav-team">Team</Button>
            <Button variant="ghost" className="hover-elevate" data-testid="button-nav-contact">Contact</Button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover-elevate"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            <Button variant="ghost" className="w-full justify-start hover-elevate" data-testid="button-mobile-home">Home</Button>
            <Button variant="ghost" className="w-full justify-start hover-elevate" data-testid="button-mobile-events">Events</Button>
            <Button variant="ghost" className="w-full justify-start hover-elevate" data-testid="button-mobile-team">Team</Button>
            <Button variant="ghost" className="w-full justify-start hover-elevate" data-testid="button-mobile-contact">Contact</Button>
          </div>
        )}
      </div>
    </header>
  );
}