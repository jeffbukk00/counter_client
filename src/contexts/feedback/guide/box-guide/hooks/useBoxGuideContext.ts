import { useContext } from "react";
import { BoxGuideContext } from "../BoxGuideContext";

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
