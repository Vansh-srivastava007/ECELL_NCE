import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnhancedBottomNavigation from '@/components/EnhancedBottomNavigation';
import EnhancedProfile from '@/components/EnhancedProfile';

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <EnhancedProfile />
        </div>
      </main>
      <Footer />
      <EnhancedBottomNavigation />
      <div className="h-20"></div>
    </div>
  );
}