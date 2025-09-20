import Header from '@/components/Header';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/BottomNavigation';

export default function Events() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        <EventsSection />
      </main>
      <Footer />
      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  );
}