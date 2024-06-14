import { UserContextProvider } from "@/contexts/user/UserContext";
import UserFeedbackContextProviders from "./UserFeedbackContexts";

import useAuthContext from "@/contexts/auth/hooks/useAuthContext";

import AfterLoginApp from "@/components/app/AfterLoginApp";
import BeforeLoginApp from "@/components/app/BeforeLoginApp";

const App = () => {
  const { loggedIn } = useAuthContext();

  // 로그인 여부에 따라 서로 다른 라우터 제공.
  const app = loggedIn ? (
    <UserFeedbackContextProviders>
      <UserContextProvider>
        <AfterLoginApp />
      </UserContextProvider>
    </UserFeedbackContextProviders>
  ) : (
    <BeforeLoginApp />
  );
  return <>{app}</>;
};

export default App;
