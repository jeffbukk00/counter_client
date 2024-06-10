import LandingFooter from "./footer/LandingFooter";
import HeroSection from "./hero/HeroSection";
import BucketIntroduction from "./introductions/BucketIntroduction";
import CounterIntroduction from "./introductions/CounterIntroduction";
import HistoryIntroduction from "./introductions/HistoryIntroduction";
import MotivationIntroduction from "./introductions/MotivationIntroduction";
import ShareIntroduction from "./introductions/ShareIntroduction";
import LandingTop from "./LandingTop";

const LandingContainer = () => {
  return (
    <main className="w-full">
      <LandingTop />
      <HeroSection />
      <CounterIntroduction />
      <BucketIntroduction />
      <MotivationIntroduction />
      <ShareIntroduction />
      <HistoryIntroduction />
      <LandingFooter />
    </main>
  );
};

export default LandingContainer;
