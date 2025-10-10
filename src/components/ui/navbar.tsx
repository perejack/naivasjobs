import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase, Users, MapPin, Phone } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Naivas Jobs
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('job-listings')}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              Jobs
            </button>
            <button
              onClick={() => scrollToSection('about-naivas')}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              About
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Kenya Wide</span>
            </div>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection('job-listings')}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="flex items-center space-x-3 w-full text-left text-gray-700 hover:text-orange-600 font-medium py-2 transition-colors duration-200"
              >
                <Briefcase className="w-5 h-5" />
                <span>Home</span>
              </button>
              <button
                onClick={() => scrollToSection('job-listings')}
                className="flex items-center space-x-3 w-full text-left text-gray-700 hover:text-orange-600 font-medium py-2 transition-colors duration-200"
              >
                <Users className="w-5 h-5" />
                <span>Available Jobs</span>
              </button>
              <button
                onClick={() => scrollToSection('about-naivas')}
                className="flex items-center space-x-3 w-full text-left text-gray-700 hover:text-orange-600 font-medium py-2 transition-colors duration-200"
              >
                <MapPin className="w-5 h-5" />
                <span>About Naivas</span>
              </button>
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-200">
                <Button
                  onClick={() => scrollToSection('job-listings')}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium py-3 rounded-lg shadow-lg"
                >
                  Apply for Jobs
                </Button>
              </div>
              
              {/* Contact Info */}
              <div className="pt-2 text-center">
                <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>Kenya's #1 Retail Employer</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
