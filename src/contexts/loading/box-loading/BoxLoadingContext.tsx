import { createContext, useCallback, useState } from "react";
import { BoxLoadingContextType } from "./type";
import { HasChildren } from "@/shared/types";

export const BoxLoadingContext = createContext<BoxLoadingContextType>({
  activatedBoxIds: [],

  activate: () => {},
  inactivate: () => {},
});

export const BoxLoadingContextProvider = ({ children }: HasChildren) => {
  const [activatedBoxIds, setActivatedBoxIds] = useState<string[]>([]);

  const activate = useCallback(
    (activatedBoxId: string) =>
      setActivatedBoxIds((prev) => [...prev, activatedBoxId]),
    []
  );
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
