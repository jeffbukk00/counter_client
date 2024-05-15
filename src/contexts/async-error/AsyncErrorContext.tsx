import { createContext, useCallback, useState } from "react";
import { AsyncErrorContextType } from "./types";
import { HasChildren } from "@/shared/types";

export const AsyncErrorContext = createContext<AsyncErrorContextType>({
  asyncErrorState: { isError: false, message: "" },
  openAsyncError: () => {},
  closeAsyncError: () => {},
});

export const AsyncErrorContextProvider = ({ children }: HasChildren) => {
  const [asyncErrorState, setAsyncErrorState] = useState({
    isError: false,
    message: "",
  });

  const openAsyncError = useCallback(
    (message: string) => setAsyncErrorState({ isError: true, message }),
    []
  );

  const closeAsyncError = () =>
    setAsyncErrorState({ isError: false, message: "" });

  const contextValue = { asyncErrorState, openAsyncError, closeAsyncError };

  return (
    <AsyncErrorContext.Provider value={contextValue}>
      {children}
    </AsyncErrorContext.Provider>
  );
};
