import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

export default function Post() {
  const handleCreatePost = () => {
    console.log('Create post clicked');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-post-title">
              Share Your Story
            </h1>
            <p className="text-muted-foreground" data-testid="text-post-description">
              Share your entrepreneurial journey, insights, and achievements with the E-Cell community.
            </p>
          </div>

          <Card className="hover-elevate border border-card-border">
            <CardContent className="p-8 text-center">
              <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-bold text-card-foreground mb-4" data-testid="text-create-post-title">
                Create a New Post
              </h2>
              <p className="text-muted-foreground mb-6" data-testid="text-create-post-description">
                Share your entrepreneurial experiences, startup journey, or insights with fellow entrepreneurs.
              </p>
              <Button 
                size="lg" 
                className="hover-elevate"
                onClick={handleCreatePost}
                data-testid="button-create-post"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Post
              </Button>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Feature coming soon - stay tuned for updates!
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