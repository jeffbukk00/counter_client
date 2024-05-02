import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <h1>Landing</h1>
      <Outlet />
    </>
  );
};

export default LandingPage;
