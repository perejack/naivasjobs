import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/hero-naivas-team.jpg";

export function HeroSection() {
  const scrollToJobs = () => {
    document.getElementById('job-listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Naivas team members in professional retail environment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 hero-gradient opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Start Your Career at{" "}
              <span className="text-gradient-primary bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-200 to-orange-300">
                Naivas
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Kenya's leading supermarket chain is hiring! Join thousands of Kenyans building 
              their careers with competitive salaries, medical benefits, and growth opportunities.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary-glow">11</div>
              <div className="text-sm text-gray-300">Open Positions</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-secondary">KSh 17K-34K</div>
              <div className="text-sm text-gray-300">Salary Range</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-accent">100+</div>
              <div className="text-sm text-gray-300">Locations</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="glow-effect transition-bounce text-lg px-8 py-6 group"
              onClick={scrollToJobs}
            >
              Explore Opportunities
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300 pt-8">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Nationwide Opportunities</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Immediate Start Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Equal Opportunity Employer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}