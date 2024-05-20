import Container from "@/components/landing/Container";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <Container />;
      <Outlet />
    </>
  );
};

export default LandingPage;
