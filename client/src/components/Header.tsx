import { User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import logoImage from '@assets/image_1758399325836.png';

export default function Header() {
  const [, setLocation] = useLocation();
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      setLocation('/');
    }
  };

  return (
    <>
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
            
            <nav className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover-elevate" data-testid="button-nav-home">Home</Button>
              </Link>
              <Link href="/events">
                <Button variant="ghost" size="sm" className="hover-elevate" data-testid="button-nav-events">Events</Button>
              </Link>
              {user && (
                <Link href="/post">
                  <Button variant="ghost" size="sm" className="hover-elevate" data-testid="button-nav-posts">Posts</Button>
                </Link>
              )}
            </nav>

            <div className="flex items-center space-x-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-testid="button-user-menu">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || ''} />
                        <AvatarFallback>{profile?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{profile?.full_name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {profile?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem data-testid="menu-profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={handleSignOut} data-testid="menu-signout">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-1">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" data-testid="button-login">Sign In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" data-testid="button-signup">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {user && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-center" data-testid="welcome-message">
              Welcome back, <span className="font-semibold">{profile?.full_name || 'User'}</span>! 
              {profile?.department && profile?.batch && (
                <span className="ml-2 opacity-90">
                  {profile.department} • Batch {profile.batch}
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}