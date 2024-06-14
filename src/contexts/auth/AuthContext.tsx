import { createContext, ReactNode } from "react";

import useQueryLoggedIn from "@/contexts/auth/hooks/http/useQueryLoggedIn";

import { AuthContextType } from "@/contexts/auth/types";
import LoadingFeedbackGlobal from "@/components/ui/user-feedback/loading/LoadingFeedbackGlobal";

// 유저의 로그인 상태를 관리하는 context.
export const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
});

// context provider.
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // 유저의 로그인 여부를 확인하는 비동기 요청을 호출하는 커스텀 훅.
  const { authData, isLoading } = useQueryLoggedIn();

  const contextValue = {
    loggedIn: authData?.loggedIn,
  };

  // 로그인 여부를 확인하는 중에, 로딩 상태에 대한 유저 피드백.
  if (isLoading) return <LoadingFeedbackGlobal />;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
