import { createContext, ReactNode } from "react";

import { UserContextType } from "@/contexts/user/types";
import useQueryUserData from "@/contexts/user/hooks/useQueryUserData";

export const UserContext = createContext<UserContextType>({
  email: "",
  username: "",
  profilePictureUrl: "",
  unreadPositivePopupIds: [],
  isLoading: false,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { userData, isLoading } = useQueryUserData();

  const contextValue = {
    email: userData?.email,
    username: userData?.username,
    profilePictureUrl: userData?.profilePictureUrl,
    unreadPositivePopupIds: userData?.unreadPositivePopupIds,
    isLoading: isLoading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
