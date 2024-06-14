import ReactDOM from "react-dom/client";
import App from "@/components/app/App.tsx";
import "./index.css";

// tanstack-query client.
import TanstackQueryProvider from "./tanstack-query/QueryClient.tsx";
// 비동기 요청 에러에 대한 context provider.
import { AsyncErrorContextProvider } from "./contexts/async-error/AsyncErrorContext.tsx";
// 인증에 대한 context provider.
import { AuthContextProvider } from "./contexts/auth/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TanstackQueryProvider>
    <AsyncErrorContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AsyncErrorContextProvider>
  </TanstackQueryProvider>
);
