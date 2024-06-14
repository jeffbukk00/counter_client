import LandingTop from "./LandingTop";
import LandingFooter from "./footer/LandingFooter";
import HeroSection from "./hero/HeroSection";
import BucketIntroduction from "./introductions/BucketIntroduction";
import CounterIntroduction from "./introductions/CounterIntroduction";
import HistoryIntroduction from "./introductions/HistoryIntroduction";
import MotivationIntroduction from "./introductions/MotivationIntroduction";
import ShareIntroduction from "./introductions/ShareIntroduction";

// 랜딩 페이지의 최상위 컴포넌트.
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
