import { createContext, ReactNode } from "react";

import { AuthContextType } from "@/contexts/auth/types";
import useQueryLoggedIn from "@/contexts/auth/hooks/useQueryLoggedIn";

export const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  isLoading: false,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { authData, isLoading } = useQueryLoggedIn();
  const contextValue = {
    loggedIn: authData?.loggedIn,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
