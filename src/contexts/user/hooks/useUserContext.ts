import { useContext } from "react";

import { UserContext } from "@/contexts/user/UserContext";

const useUserContext = () => {
  const {
    email,
    username,
    profilePictureUrl,
    unreadPositivePopupIds,
    isLoading,
  } = useContext(UserContext);

  return {
    email,
    username,
    profilePictureUrl,
    unreadPositivePopupIds,
    isLoading,
  };
};

export default useUserContext;
