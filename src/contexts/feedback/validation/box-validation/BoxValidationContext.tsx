import { createContext, useState } from "react";
import { BoxValidationContextType } from "./types";
import { HasChildren } from "@/shared/types";

export const BoxValidationContext = createContext<BoxValidationContextType>({
  invalidBoxes: [{ id: "", messages: [""] }],
  addInvalidBox: () => {},
  removeInvalidBox: () => {},
});

export const BoxValidationContextProvider = ({ children }: HasChildren) => {
  const [invalidBoxes, setInvalidBoxes] = useState<
    {
      id: string;
      messages: string[];
    }[]
  >([]);

  const addInvalidBox = (invalidBoxId: string, messages: string[]) => {
    const foundIdx = invalidBoxes.findIndex((e) => e.id === invalidBoxId);

    if (foundIdx !== -1)
      return setInvalidBoxes((prev) => {
        const updated = [...prev];
        updated[foundIdx].messages = messages;

        return updated;
      });

    return setInvalidBoxes((prev) => [...prev, { id: invalidBoxId, messages }]);
  };

  const removeInvalidBox = (invalidBoxIdx: number) => {
    if (!invalidBoxes[invalidBoxIdx]) return;

    setInvalidBoxes((prev) => [...prev].filter((_, i) => i !== invalidBoxIdx));
  };

  const contextValue = {
    invalidBoxes,
    addInvalidBox,
    removeInvalidBox,
  };

  return (
    <BoxValidationContext.Provider value={contextValue}>
      {children}
    </BoxValidationContext.Provider>
  );
};
