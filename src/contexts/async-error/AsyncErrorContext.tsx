import { createContext, useCallback, useState } from "react";

import { AsyncErrorContextType } from "./types";
import { HasChildren } from "@/shared/types";

// 이 어플리케이션 내에서 발생하는 모든 비동기 요청 에러들을 중앙 처리하는 context.
export const AsyncErrorContext = createContext<AsyncErrorContextType>({
  asyncErrorState: { isError: false, message: "" },
  openAsyncError: () => {},
  closeAsyncError: () => {},
});

// context provider.
export const AsyncErrorContextProvider = ({ children }: HasChildren) => {
  // 현재 이 어플리케이션 내에서 비동기 요청에 대한 에러가 발생했는지 여부를 관리하는 상태.
  const [asyncErrorState, setAsyncErrorState] = useState({
    isError: false,
    message: "",
  });

  // 에러를 유저들에게 보여주는 팝업을 연다.
  const openAsyncError = useCallback(
    (message: string) => setAsyncErrorState({ isError: true, message }),
    []
  );

  // 에러를 유저들에게 보여주는 팝업을 닫는다.
  const closeAsyncError = () =>
    setAsyncErrorState({ isError: false, message: "" });

  const contextValue = { asyncErrorState, openAsyncError, closeAsyncError };

  return (
    <AsyncErrorContext.Provider value={contextValue}>
      {children}
    </AsyncErrorContext.Provider>
  );
};
