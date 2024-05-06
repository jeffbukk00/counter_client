import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/components/app/App.tsx";
import "./index.css";

import { AuthContextProvider } from "./contexts/auth/AuthContext.tsx";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/tanstack-query/queryClient.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);