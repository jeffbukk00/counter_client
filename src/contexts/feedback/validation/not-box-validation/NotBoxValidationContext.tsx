import { createContext, useState } from "react";

import { HasChildren } from "@/shared/types";

// box가 아닌 box-creator, modal에서 유효하지 않은 유저 입력이 발생함에 따라 유저 피드백을 띄워야할지 여부를 관리하는 context.
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

// context provider.
export const NotBoxValidationContextProvider = ({ children }: HasChildren) => {
  // box-creator에서 어떤 message의 유저 피드백을 띄워야 할지 관리하는 상태.
  const [isBoxCreatorInvalid, setIsBoxCreatorInvalid] = useState<{
    isInvalid: boolean;
    messages: string[];
  }>({
    isInvalid: false,
    messages: [],
  });

  // modal에서 어떤 message의 유저 피드백을 띄워야 할지 관리하는 상태.
  const [isModalInvalid, setIsModalInvalid] = useState<{
    isInvalid: boolean;
    messages: string[];
  }>({
    isInvalid: false,
    messages: [],
  });

  // box-creator에서의 유저 피드백에 관한 업데이트.
  const updateIsBoxCreatorInvalid = (
    isInvalid: boolean,
    messages?: string[]
  ) => {
    if (!isInvalid) return setIsBoxCreatorInvalid({ isInvalid, messages: [] });

    if (messages) return setIsBoxCreatorInvalid({ isInvalid, messages });
  };

  // modal에서의 유저 피드백에 관한 업데이트.
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
