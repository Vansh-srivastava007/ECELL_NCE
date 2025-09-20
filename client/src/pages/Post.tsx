import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnhancedBottomNavigation from '@/components/EnhancedBottomNavigation';
import PostTimeline from '@/components/PostTimeline';

export default function Post() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-post-title">
              Community Posts
            </h1>
            <p className="text-muted-foreground" data-testid="text-post-description">
              Share your entrepreneurial journey, insights, and connect with the E-Cell community.
            </p>
          </div>

          <PostTimeline />
        </div>
      </main>
      <Footer />
      <EnhancedBottomNavigation />
      <div className="h-20"></div>
    </div>
  );
}