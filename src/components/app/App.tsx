import useAuthContext from "@/contexts/auth/hooks/useAuthContext";
import { UserContextProvider } from "@/contexts/user/UserContext";

import AfterLoginApp from "@/components/app/AfterLoginApp";
import BeforeLoginApp from "@/components/app/BeforeLoginApp";
import UserFeedbackContextProviders from "./UserFeedbackContexts";

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
