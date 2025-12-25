import AboutUs from "@/components/Layouts/HomePages/AboutUs";
import HeroSection from "@/components/Layouts/HomePages/HeroSection";
import KeyFeatures from "@/components/Layouts/HomePages/KeyFeatures";
import PartnerShip from "@/components/Layouts/HomePages/PartnerShip";
import FAQSection from "./FAQSection";
import BlogListPage from "./Blog/BlogPage";

function Home() {
  return (
    <div className="container mx-auto">
      <HeroSection />
      <PartnerShip />
      <AboutUs />
      <KeyFeatures />
      <BlogListPage />
      <FAQSection />
    </div>
  );
}

export default Home;
