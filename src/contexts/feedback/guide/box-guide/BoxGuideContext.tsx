import { createContext, useCallback, useState } from "react";
import { BoxGuideContextType } from "./types";
import { HasChildren } from "@/shared/types";

export const BoxGuideContext = createContext<BoxGuideContextType>({
  unreadGuides: [{ guideId: "", boxId: "" }],

  addUnreadGuide: (guideId: string, boxId: string) => {
    // 상관 없음
    console.log(guideId);
    console.log(boxId);
  },
  removeUnreadGuide: (guideId: string) => {
    // 상관 없음
    console.log(guideId);
  },
  resetUnreadGuide: () => {},
});

export const BoxGuideContextProvider = ({ children }: HasChildren) => {
  const [unreadGuides, setUnreadGuides] = useState<
    { guideId: string; boxId: string }[]
  >([]);

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

  const removeUnreadGuide = useCallback(
    (guideId: string) => {
      const updated = [...unreadGuides].filter((e) => e.guideId !== guideId);
      setUnreadGuides(updated);
    },
    [unreadGuides]
  );

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
