import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, FileText, Calendar, User } from 'lucide-react';

export default function BottomNavigation() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'post', label: 'Post', icon: FileText },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleTabClick = (tabId: string) => {
    console.log(`${tabId} tab clicked`);
    setActiveTab(tabId);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={`flex-1 flex flex-col items-center space-y-1 py-3 h-auto hover-elevate ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => handleTabClick(tab.id)}
                data-testid={`button-nav-${tab.id}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-primary' : ''}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}