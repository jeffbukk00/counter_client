import { createContext, ReactNode } from "react";

import { UserContextType } from "@/contexts/user/types";
import useQueryUserData from "@/contexts/user/hooks/http/useQueryUserData";
import LoadingFeedbackGlobal from "@/components/ui/user-feedback/loading/LoadingFeedbackGlobal";

export const UserContext = createContext<UserContextType>({
  email: "",
  username: "",
  profilePictureUrl: "",
  unreadGuideIds: [""],
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { userData, isLoading } = useQueryUserData();

  if (isLoading) return <LoadingFeedbackGlobal />;

  const contextValue = {
    email: userData!.email,
    username: userData!.username,
    profilePictureUrl: userData!.profilePictureUrl,
    unreadGuideIds: userData!.unreadGuideIds,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
