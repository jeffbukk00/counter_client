import { createContext, useCallback, useState } from "react";

import { BoxLoadingContextType } from "./type";
import { HasChildren } from "@/shared/types";

// box에서의 비동기 요청이 로딩 상태일 때 띄워야하는 유저 피드백을 관리하는 context.
export const BoxLoadingContext = createContext<BoxLoadingContextType>({
  activatedBoxIds: [],

  activate: () => {},
  inactivate: () => {},
});

// context provider.
export const BoxLoadingContextProvider = ({ children }: HasChildren) => {
  // 어떤 box에서의 비동기 요청이 로딩 상태인지 여부를 관리하는 상태.
  const [activatedBoxIds, setActivatedBoxIds] = useState<string[]>([]);

  // 어떤 box에서의 비동기 요청의 로딩 상태가 활성화 되었음을 업데이트.
  const activate = useCallback(
    (activatedBoxId: string) =>
      setActivatedBoxIds((prev) => [...prev, activatedBoxId]),
    []
  );

  // 어떤 box에서의 비동기 요청의 로딩 상태가 비활성화 되었음을 업데이트.
  const inactivate = useCallback(
    (inactivatedBoxId: string) =>
      setActivatedBoxIds((prev) => prev.filter((e) => e !== inactivatedBoxId)),
    []
  );

  const contextValue = {
    activatedBoxIds,

    activate,
    inactivate,
  };

  return (
    <BoxLoadingContext.Provider value={contextValue}>
      {children}
    </BoxLoadingContext.Provider>
  );
};
