import LandingContainer from "@/components/landing/LandingContainer";
import { Outlet } from "react-router-dom";

// /landing
// 랜딩 페이지
const LandingPage = () => {
  return (
    <>
      <LandingContainer />
      <Outlet />
    </>
  );
};

export default LandingPage;
