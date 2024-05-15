import { HasChildren } from "@/shared/types";
import { createContext, useCallback, useState } from "react";

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

export const NotBoxGuideContextProvider = ({ children }: HasChildren) => {
  const [boxCreatorGuide, setBoxCreatorGuide] = useState<{
    isUnguided: boolean;
    guideId: string;
  }>({ isUnguided: false, guideId: "" });
  const [modalGuide, setModalGuide] = useState<{
    isUnguided: boolean;
    guideId: string;
  }>({ isUnguided: false, guideId: "" });

  const updateBoxCreatorGuide = useCallback(
    (isUnguided: boolean, guideId: string) =>
      setBoxCreatorGuide({ isUnguided, guideId }),
    []
  );
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
