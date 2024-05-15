import { useContext } from "react";
import { BoxGuideContext } from "../BoxGuideContext";

const useBoxGuideContext = () => {
  const {
    unreadGuides,

    addUnreadGuide,
    removeUnreadGuide,
  } = useContext(BoxGuideContext);

  return {
    unreadGuides,

    addUnreadGuide,
    removeUnreadGuide,
  };
};

export default useBoxGuideContext;
