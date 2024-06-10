import LandingContainer from "@/components/landing/LandingContainer";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <LandingContainer />
      <Outlet />
    </>
  );
};

export default LandingPage;
