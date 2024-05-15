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
});

export const BoxGuideContextProvider = ({ children }: HasChildren) => {
  const [unreadGuides, setUnreadGuides] = useState<
    { guideId: string; boxId: string }[]
  >([]);

  const addUnreadGuide = useCallback((guideId: string, boxId: string) => {
    setUnreadGuides((prev) => {
      const guideIsDuplicated = prev.find((e) => e.guideId === guideId);
      const boxIsUnGuided = prev.find((e) => e.boxId === boxId);

      const updated = [...prev];

      if (guideIsDuplicated) {
        if (boxIsUnGuided) {
          const boxIdx = updated.findIndex((e) => e.boxId === boxId);
          updated.splice(boxIdx, 1);
          return updated;
        } else {
          return updated;
        }
      } else {
        if (boxIsUnGuided) {
          const boxIdx = updated.findIndex((e) => e.boxId === boxId);
          updated[boxIdx].guideId = guideId;
          return updated;
        } else {
          updated.push({ guideId, boxId });
          return updated;
        }
      }
    });
  }, []);

  const removeUnreadGuide = useCallback(
    (guideId: string) => {
      const updated = [...unreadGuides].filter((e) => e.guideId !== guideId);
      setUnreadGuides(updated);
    },
    [unreadGuides]
  );

  const contextValue = {
    unreadGuides,

    addUnreadGuide,
    removeUnreadGuide,
  };

  return (
    <BoxGuideContext.Provider value={contextValue}>
      {children}
    </BoxGuideContext.Provider>
  );
};
