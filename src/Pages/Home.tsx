import AboutUs from "@/components/Layouts/HomePages/AboutUs";
import HeroSection from "@/components/Layouts/HomePages/HeroSection";
import KeyFeatures from "@/components/Layouts/HomePages/KeyFeatures";
import PartnerShip from "@/components/Layouts/HomePages/PartnerShip";
import FAQSection from "./FAQSection";

function Home() {
  return (
    <div className="container mx-auto">
      <HeroSection />
      <PartnerShip />
      <AboutUs />
      <KeyFeatures />
      <FAQSection />
    </div>
  );
}

export default Home;
