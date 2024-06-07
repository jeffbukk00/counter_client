import useBoxGuideContext from "@/contexts/feedback/guide/box-guide/hooks/useBoxGuideContext";
import useUserContext from "@/contexts/user/hooks/useUserContext";
import { useEffect, useRef } from "react";

const useBoxGuide = (guideId: string, boxId: string) => {
  const countRef = useRef(0);

  const { unreadGuideIds } = useUserContext();
  const { addUnreadGuide, removeUnreadGuide } = useBoxGuideContext();

  const isUnread = unreadGuideIds.includes(guideId);

  useEffect(() => {
    if (isUnread && countRef.current === 0) {
      setTimeout(() => {
        countRef.current++;

        addUnreadGuide(guideId, boxId);
      }, 200);
    }

    return () => {
      removeUnreadGuide(boxId, guideId);
    };
  }, [isUnread, addUnreadGuide, removeUnreadGuide, guideId, boxId]);

  return null;
};

export default useBoxGuide;
