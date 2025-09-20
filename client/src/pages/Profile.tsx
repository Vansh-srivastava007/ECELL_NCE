import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Settings, LogIn } from 'lucide-react';

export default function Profile() {
  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleSignup = () => {
    console.log('Sign up clicked');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-profile-title">
              Your Profile
            </h1>
            <p className="text-muted-foreground" data-testid="text-profile-description">
              Join the E-Cell community to access exclusive events and resources.
            </p>
          </div>

          <Card className="hover-elevate border border-card-border">
            <CardContent className="p-8 text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  <User className="w-10 h-10" />
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-xl font-bold text-card-foreground mb-4" data-testid="text-auth-title">
                Welcome to E-Cell NCE
              </h2>
              <p className="text-muted-foreground mb-6" data-testid="text-auth-description">
                Sign in to your account or create a new one to access exclusive content, register for events, and connect with the entrepreneurial community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex-1 hover-elevate"
                  onClick={handleLogin}
                  data-testid="button-login"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 hover-elevate"
                  onClick={handleSignup}
                  data-testid="button-signup"
                >
                  Create Account
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Authentication and user profiles coming soon!
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  );
}