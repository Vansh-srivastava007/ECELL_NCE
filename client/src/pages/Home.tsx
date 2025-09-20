import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TeamSection from '@/components/TeamSection';
import EventsSection from '@/components/EventsSection';
import PostTimeline from '@/components/PostTimeline';
import Footer from '@/components/Footer';
import EnhancedBottomNavigation from '@/components/EnhancedBottomNavigation';

export default function Home() {
  const [showPosts, setShowPosts] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <TeamSection />
        <EventsSection />
        
        {/* Community Posts Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Community Updates
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full mb-6"></div>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Stay connected with the latest posts and updates from our E-Cell community.
              </p>
            </div>
            
            <PostTimeline />
          </div>
        </section>
      </main>
      <Footer />
      <EnhancedBottomNavigation />
      {/* Add bottom padding to account for fixed bottom navigation */}
      <div className="h-20"></div>
    </div>
  );
}