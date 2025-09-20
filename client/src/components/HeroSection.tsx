import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@assets/stock_images/entrepreneurship_stu_b33c6b00.jpg';

export default function HeroSection() {
  const handleJoinClick = () => {
    console.log('Join E-Cell clicked');
  };

  const handleLearnMore = () => {
    console.log('Learn more clicked');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-chart-2/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 mr-3 text-yellow-400" />
          <span className="text-lg font-medium">Shaping the Future</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-hero-title">
          Shaping the Future of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Entrepreneurship at NCE Chandi
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl mb-8 text-white/90 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          "The way to get started is to quit talking and begin doing." - Walt Disney
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm text-lg px-8 py-3 hover-elevate"
            onClick={handleJoinClick}
            data-testid="button-join-ecell"
          >
            Join E-Cell <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm text-lg px-8 py-3 hover-elevate"
            onClick={handleLearnMore}
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-3xl font-bold" data-testid="text-stat-students">500+</h3>
            <p className="text-sm text-white/80">Students Inspired</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-3xl font-bold" data-testid="text-stat-events">50+</h3>
            <p className="text-sm text-white/80">Events Conducted</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-3xl font-bold" data-testid="text-stat-startups">25+</h3>
            <p className="text-sm text-white/80">Startups Launched</p>
          </div>
        </div>
      </div>
    </section>
  );
}