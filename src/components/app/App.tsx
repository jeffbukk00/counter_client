import useAuthContext from "@/contexts/auth/hooks/useAuthContext";
import { UserContextProvider } from "@/contexts/user/UserContext";
import UserFeedbackContextProviders from "./UserFeedbackContexts";

import AfterLoginApp from "@/components/app/AfterLoginApp";
import BeforeLoginApp from "@/components/app/BeforeLoginApp";

const App = () => {
  const { loggedIn } = useAuthContext();

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
