import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ActivityTags from "@/components/ActivityTags";
import MissionSection from "@/components/MissionSection";
import PopularRoutes from "@/components/PopularRoutes";
import Communities from "@/components/Communities";
import PastEvents from "@/components/PastEvents";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ActivityTags />
        <MissionSection />
        <PopularRoutes />
        <Communities />
        <PastEvents />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
