import { useContext } from "react";

import { AuthContext } from "@/contexts/auth/AuthContext";

// AuthContext에 접근하기 위한 커스텀 훅.
const useAuthContext = () => {
  const { loggedIn } = useContext(AuthContext);

  return { loggedIn };
};

export default useAuthContext;
