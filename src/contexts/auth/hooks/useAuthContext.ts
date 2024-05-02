import { useContext } from "react";

import { AuthContext } from "@/contexts/auth/AuthContext";

const useAuthContext = () => {
  const { loggedIn, isLoading } = useContext(AuthContext);

  return { loggedIn, isLoading };
};

export default useAuthContext;
