import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TeamSection from '@/components/TeamSection';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/BottomNavigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <TeamSection />
        <EventsSection />
      </main>
      <Footer />
      <BottomNavigation />
      {/* Add bottom padding to account for fixed bottom navigation */}
      <div className="h-20"></div>
    </div>
  );
}