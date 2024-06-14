import { createContext, ReactNode } from "react";

import { UserContextType } from "@/contexts/user/types";

import useQueryUserData from "@/contexts/user/hooks/http/useQueryUserData";
import LoadingFeedbackGlobal from "@/components/ui/user-feedback/loading/LoadingFeedbackGlobal";

// 로그인 한 유저 정보를 관리하는 context.
export const UserContext = createContext<UserContextType>({
  email: "",
  username: "",
  profilePictureUrl: "",
  unreadGuideIds: [""],
});

// context provider.
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  // 로그인 한 유저의 정보를 불러오는 비동기 요청을 호출하는 커스텀 훅.
  const { userData, isLoading } = useQueryUserData();

  // 로그인 한 유저의 정보를 불러오는 비동기 요청이 로딩 상태 일 때, 유저 피드백.
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
