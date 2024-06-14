import { createContext, useCallback, useState } from "react";

import { BoxGuideContextType } from "./types";
import { HasChildren } from "@/shared/types";

// box에서 띄워야 하는 유저 가이드들을 관리하는 context.
export const BoxGuideContext = createContext<BoxGuideContextType>({
  unreadGuides: [{ guideId: "", boxId: "" }],

  addUnreadGuide: (guideId: string, boxId: string) => {
    // 상관 없음
    console.log(guideId);
    console.log(boxId);
  },
  removeUnreadGuide: (boxId: string, guideId: string) => {
    // 상관 없음
    console.log(boxId);
    console.log(guideId);
  },
  resetUnreadGuide: () => {},
});

// context provider.
export const BoxGuideContextProvider = ({ children }: HasChildren) => {
  // 어떤 box에서 어떤 유저 가이드를 띄워야하는지 관리하는 상태.
  const [unreadGuides, setUnreadGuides] = useState<
    { guideId: string; boxId: string }[]
  >([]);

  // 특정 box에 특정 유저 가이드를 띄워야 함을 업데이트.
  /*
    box에 유저 가이드를 띄울 때 고려해야하는 전제 조건 2가지.

    1. 다른 box가 같은 유저 가이드를 띄우고 있는지.
    2. 같은 box가 다른 유저 가이드를 띄우고 있는지.
  */
  const addUnreadGuide = useCallback((guideId: string, boxId: string) => {
    setUnreadGuides((prev) => {
      let guideIsDuplicated = false;
      let boxHasGuide = false;
      let boxHasSameGuide = false;

      const idxHasDuplicatedGuide = prev.findIndex(
        (e) => e.guideId === guideId
      );
      if (idxHasDuplicatedGuide !== -1) guideIsDuplicated = true;
      const boxIdx = prev.findIndex((e) => e.boxId === boxId);
      if (boxIdx !== -1) boxHasGuide = true;
      if (boxHasGuide && prev[boxIdx].guideId === guideId)
        boxHasSameGuide = true;

      const updated = [...prev];

      // if (guideIsDuplicated && boxHasGuide && boxHasSameGuide) return updated;
      if (guideIsDuplicated && boxHasGuide && !boxHasSameGuide) {
        updated.splice(boxIdx, 1);
        return updated;
      }
      // if (guideIsDuplicated && !boxHasGuide && !boxHasSameGuide) return updated;
      if (!guideIsDuplicated && boxHasGuide && !boxHasSameGuide) {
        updated[boxIdx].guideId = guideId;
        return updated;
      }
      if (!guideIsDuplicated && !boxHasGuide && !boxHasSameGuide) {
        updated.push({ guideId, boxId });
        return updated;
      }

      return updated;
    });
  }, []);

  // 특정 box로부터 특정 유저 가이드를 제거.
  const removeUnreadGuide = useCallback((boxId: string, guideId: string) => {
    setUnreadGuides((prev) => {
      const updated = [...prev].filter(
        (e) => !(boxId === e.boxId && guideId === e.guideId)
      );
      return updated;
    });
  }, []);

  // 모든 box에 대한 유저 가이드들을 리셋(제거).
  const resetUnreadGuide = useCallback(() => setUnreadGuides([]), []);

  const contextValue = {
    unreadGuides,
    addUnreadGuide,
    removeUnreadGuide,
    resetUnreadGuide,
  };

  return (
    <BoxGuideContext.Provider value={contextValue}>
      {children}
    </BoxGuideContext.Provider>
  );
};
