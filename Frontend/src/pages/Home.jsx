import HeroSection from "../components/HeroSection";
import ProblemSection from "../components/ProblemSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative Glowing Orbs - fixed position, behind content */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ProblemSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}