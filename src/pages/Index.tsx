import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { JobListings } from "@/components/sections/job-listings";
import { AboutNaivas } from "@/components/sections/about-naivas";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <JobListings />
      <AboutNaivas />
    </div>
  );
};

export default Index;
