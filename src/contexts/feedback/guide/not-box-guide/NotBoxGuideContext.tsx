import { createContext, useCallback, useState } from "react";

import { HasChildren } from "@/shared/types";

// box가 아닌 메인 요소들에 대한 유저 가이드들을 관리하는 context.
// box-creator, modal.
export const NotBoxGuideContext = createContext({
  boxCreatorGuide: { isUnguided: false, guideId: "" },
  modalGuide: { isUnguided: false, guideId: "" },
  updateBoxCreatorGuide: (isUnguided: boolean, guideId: string) => {
    // 상관 없음
    console.log(isUnguided);
    console.log(guideId);
  },
  updateModalGuide: (isUnguided: boolean, guideId: string) => {
    // 상관 없음
    console.log(isUnguided);
    console.log(guideId);
  },
});

// context provider.
export const NotBoxGuideContextProvider = ({ children }: HasChildren) => {
  // box-creator에 대한 유저 가이드를 관리하는 상태.
  const [boxCreatorGuide, setBoxCreatorGuide] = useState<{
    isUnguided: boolean;
    guideId: string;
  }>({ isUnguided: false, guideId: "" });

  // modal에 대한 유저 가이드를 관리하는 상태.
  const [modalGuide, setModalGuide] = useState<{
    isUnguided: boolean;
    guideId: string;
  }>({ isUnguided: false, guideId: "" });

  // box-creator에 대한 유저 가이드를 업데이트.
  const updateBoxCreatorGuide = useCallback(
    (isUnguided: boolean, guideId: string) =>
      setBoxCreatorGuide({ isUnguided, guideId }),
    []
  );

  // modal에 대한 유저 가이드를 업데이트.
  const updateModalGuide = useCallback(
    (isUnguided: boolean, guideId: string) =>
      setModalGuide({ isUnguided, guideId }),
    []
  );

  const contextValue = {
    boxCreatorGuide,
    modalGuide,
    updateBoxCreatorGuide,
    updateModalGuide,
  };

  return (
    <NotBoxGuideContext.Provider value={contextValue}>
      {children}
    </NotBoxGuideContext.Provider>
  );
};
