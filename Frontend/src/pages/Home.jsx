import HeroSection from "../components/HeroSection";
import ProblemSection from "../components/ProblemSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <FeaturesSection />
      <ProblemSection />

      <HowItWorks />

      <Footer />
    </>
  );
}