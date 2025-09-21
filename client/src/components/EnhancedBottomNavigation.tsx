import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Home, FileText, Calendar, User } from 'lucide-react';

export default function EnhancedBottomNavigation() {
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Update active tab based on current route
    if (location === '/') {
      setActiveTab('home');
    } else if (location === '/post') {
      setActiveTab('post');
    } else if (location === '/events') {
      setActiveTab('events');
    } else if (location === '/profile') {
      setActiveTab('profile');
    }
  }, [location]);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'post', label: 'Post', icon: FileText, path: '/post' },
    { id: 'events', label: 'Events', icon: Calendar, path: '/events' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const handleTabClick = async (tab: typeof tabs[0]) => {
    if (tab.id === activeTab) return;
    
    setIsLoading(true);
    setActiveTab(tab.id);
    
    // Add smooth transition
    await new Promise(resolve => setTimeout(resolve, 100));
    
    setLocation(tab.path);
    setIsLoading(false);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border shadow-lg">
      <div className="w-full">
        <div className="flex items-center justify-around py-3 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={`flex-1 flex flex-col items-center space-y-1 py-3 h-auto transition-all duration-200 hover-elevate ${
                  isActive 
                    ? 'text-primary bg-primary/10 scale-105' 
                    : 'text-muted-foreground hover:text-foreground hover:scale-105'
                } ${isLoading ? 'opacity-50' : ''}`}
                onClick={() => handleTabClick(tab)}
                disabled={isLoading}
                data-testid={`button-nav-${tab.id}`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-all duration-200 ${
                    isActive ? 'text-primary scale-110' : ''
                  }`} />
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  )}
                </div>
                <span className={`text-xs font-medium transition-all duration-200 ${
                  isActive ? 'text-primary font-semibold' : ''
                }`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full transition-all duration-300"></div>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}