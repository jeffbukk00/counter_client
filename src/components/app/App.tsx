import useAuthContext from "@/contexts/auth/hooks/useAuthContext";
import { UserContextProvider } from "@/contexts/user/UserContext";

import AfterLoginApp from "@/components/app/AfterLoginApp";
import BeforeLoginApp from "@/components/app/BeforeLoginApp";

const App = () => {
  const { loggedIn, isLoading } = useAuthContext();

  if (isLoading) return <p>로그인 상태 확인 중...</p>;

  const app = loggedIn ? (
    <UserContextProvider>
      <AfterLoginApp />
    </UserContextProvider>
  ) : (
    <BeforeLoginApp />
  );
  return <>{app}</>;
};

export default App;