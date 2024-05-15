import { createContext, ReactNode } from "react";

import { AuthContextType } from "@/contexts/auth/types";
import useQueryLoggedIn from "@/contexts/auth/hooks/http/useQueryLoggedIn";
import LoadingFeedbackGlobal from "@/components/ui/user-feedback/loading/LoadingFeedbackGlobal";

export const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { authData, isLoading } = useQueryLoggedIn();
  const contextValue = {
    loggedIn: authData?.loggedIn,
  };

  if (isLoading) return <LoadingFeedbackGlobal />;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
