import { createContext, useState } from "react";

import { BoxValidationContextType } from "./types";
import { HasChildren } from "@/shared/types";

// box에서 유효하지 않은 입력이 발생할 경우에 띄워야하는 유저 피드백을 관리하는 context.
export const BoxValidationContext = createContext<BoxValidationContextType>({
  invalidBoxes: [{ id: "", messages: [""] }],
  addInvalidBox: () => {},
  removeInvalidBox: () => {},
});

export const BoxValidationContextProvider = ({ children }: HasChildren) => {
  // 특정 box에서 어떤 message의 유저 피드백을 띄워야하는지 관리하는 상태.
  const [invalidBoxes, setInvalidBoxes] = useState<
    {
      id: string;
      messages: string[];
    }[]
  >([]);

  // 특정 box에서 유효한 유저 입력이 발생했음을 업데이트.
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

  // 유저 피드백을 닫음.
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
