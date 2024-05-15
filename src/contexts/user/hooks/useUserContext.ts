import { useContext } from "react";

import { UserContext } from "@/contexts/user/UserContext";

const useUserContext = () => {
  const { email, username, profilePictureUrl, unreadGuideIds } =
    useContext(UserContext);

  return {
    email,
    username,
    profilePictureUrl,
    unreadGuideIds,
  };
};

export default useUserContext;
