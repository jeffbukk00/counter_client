import { useContext } from "react";

import { UserContext } from "@/contexts/user/UserContext";

// UserContext에 접근하기 위한 커스텀 훅.
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
