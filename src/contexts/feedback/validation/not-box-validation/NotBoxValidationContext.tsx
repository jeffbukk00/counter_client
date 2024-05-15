import { HasChildren } from "@/shared/types";
import { createContext, useState } from "react";

export const NotBoxValidationContext = createContext({
  isBoxCreatorInvalid: { isInvalid: false, messages: [""] },
  isModalInvalid: { isInvalid: false, messages: [""] },
  updateIsBoxCreatorInvalid: (isInvalid: boolean, messages?: string[]) => {
    // 상관 없음
    console.log(isInvalid);
    console.log(messages);
  },
  updateIsModalInvalid: (isInvalid: boolean, messages?: string[]) => {
    // 상관 없음
    console.log(isInvalid);
    console.log(messages);
  },
});

export const NotBoxValidationContextProvider = ({ children }: HasChildren) => {
  const [isBoxCreatorInvalid, setIsBoxCreatorInvalid] = useState<{
    isInvalid: boolean;
    messages: string[];
  }>({
    isInvalid: false,
    messages: [],
  });
  const [isModalInvalid, setIsModalInvalid] = useState<{
    isInvalid: boolean;
    messages: string[];
  }>({
    isInvalid: false,
    messages: [],
  });

  const updateIsBoxCreatorInvalid = (
    isInvalid: boolean,
    messages?: string[]
  ) => {
    if (!isInvalid) return setIsBoxCreatorInvalid({ isInvalid, messages: [] });

    if (messages) return setIsBoxCreatorInvalid({ isInvalid, messages });
  };

  const updateIsModalInvalid = (isInvalid: boolean, messages?: string[]) => {
    if (!isInvalid) return setIsModalInvalid({ isInvalid, messages: [] });
    if (messages) return setIsModalInvalid({ isInvalid, messages });
  };

  const contextValue = {
    isBoxCreatorInvalid,
    isModalInvalid,
    updateIsBoxCreatorInvalid,
    updateIsModalInvalid,
  };

  return (
    <NotBoxValidationContext.Provider value={contextValue}>
      {children}
    </NotBoxValidationContext.Provider>
  );
};
