import { Outlet } from "react-router-dom";

import Login from "@/components/auth/Login";

const AuthPage = () => {
  return (
    <>
      <h1>Auth</h1>
      <Outlet />
      <Login />
    </>
  );
};

export default AuthPage;
