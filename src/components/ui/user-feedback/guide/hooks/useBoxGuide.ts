import useBoxGuideContext from "@/contexts/feedback/guide/box-guide/hooks/useBoxGuideContext";
import useUserContext from "@/contexts/user/hooks/useUserContext";
import { useEffect, useRef } from "react";

const useBoxGuide = (guideId: string, boxId: string) => {
  const countRef = useRef(0);

  const { unreadGuideIds } = useUserContext();
  const { addUnreadGuide } = useBoxGuideContext();

  const isUnread = unreadGuideIds.includes(guideId);

  useEffect(() => {
    if (isUnread && countRef.current === 0) {
      setTimeout(() => {
        countRef.current++;

        return addUnreadGuide(guideId, boxId);
      }, 200);
    }
  }, [isUnread, addUnreadGuide, guideId, boxId]);

  return null;
};

export default useBoxGuide;
