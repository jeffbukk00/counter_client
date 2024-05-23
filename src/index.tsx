import ReactDOM from "react-dom/client";
import App from "@/components/app/App.tsx";
import "./index.css";

import { AuthContextProvider } from "./contexts/auth/AuthContext.tsx";
import TanstackQueryProvider from "./tanstack-query/QueryClient.tsx";
import { AsyncErrorContextProvider } from "./contexts/async-error/AsyncErrorContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TanstackQueryProvider>
    <AsyncErrorContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AsyncErrorContextProvider>
  </TanstackQueryProvider>
);
