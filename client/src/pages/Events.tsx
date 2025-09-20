import Header from '@/components/Header';
import EnhancedEventsPage from '@/components/EnhancedEventsPage';
import Footer from '@/components/Footer';
import EnhancedBottomNavigation from '@/components/EnhancedBottomNavigation';

export default function Events() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <EnhancedEventsPage />
        </div>
      </main>
      <Footer />
      <EnhancedBottomNavigation />
      <div className="h-20"></div>
    </div>
  );
}