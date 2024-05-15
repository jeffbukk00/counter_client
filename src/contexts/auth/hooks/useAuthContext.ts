import { useContext } from "react";

import { AuthContext } from "@/contexts/auth/AuthContext";

const useAuthContext = () => {
  const { loggedIn } = useContext(AuthContext);

  return { loggedIn };
};

export default useAuthContext;
