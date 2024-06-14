import { useContext } from "react";
import { BoxGuideContext } from "../BoxGuideContext";

// BoxGuideContext에 접근하기 위한 커스텀 훅.
const useBoxGuideContext = () => {
  const {
    unreadGuides,

    addUnreadGuide,
    removeUnreadGuide,
    resetUnreadGuide,
  } = useContext(BoxGuideContext);

  return {
    unreadGuides,

    addUnreadGuide,
    removeUnreadGuide,
    resetUnreadGuide,
  };
};

export default useBoxGuideContext;
