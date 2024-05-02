import { Outlet } from "react-router-dom";

import useUserContext from "@/contexts/user/hooks/useUserContext";
import useMutationLogout from "@/contexts/auth/hooks/useMutationLogout";

const MainPage = () => {
  const { email, username, profilePictureUrl, isLoading } = useUserContext();
  const { mutatePostLogout } = useMutationLogout();

  const profile = isLoading ? null : (
    <div>
      <p>email: {email}</p>
      <p>username: {username}</p>
      <img src={profilePictureUrl} />
    </div>
  );
  return (
    <>
      <h1>Main</h1>
      {profile}
      <button onClick={() => mutatePostLogout()}>logout</button>
      <Outlet />
    </>
  );
};

export default MainPage;
