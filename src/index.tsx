import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/components/app/App.tsx";
import "./index.css";

import { AuthContextProvider } from "./contexts/auth/AuthContext.tsx";
import TanstackQueryProvider from "./tanstack-query/QueryClient.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TanstackQueryProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </TanstackQueryProvider>
  </React.StrictMode>
);
