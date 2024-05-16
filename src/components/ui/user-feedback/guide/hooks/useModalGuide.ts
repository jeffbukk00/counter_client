import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";
import useUserContext from "@/contexts/user/hooks/useUserContext";
import { useEffect, useRef } from "react";

const useModalGuide = (guideId: string) => {
  const counterRef = useRef(0);

  const { unreadGuideIds } = useUserContext();
  const { updateModalGuide } = useNotBoxGuideContext();

  const isUnread = unreadGuideIds.includes(guideId);

  useEffect(() => {
    if (isUnread && counterRef.current === 0) {
      setTimeout(() => {
        counterRef.current++;
        updateModalGuide(true, guideId);
      }, 200);
    }
  }, [isUnread, guideId, updateModalGuide]);

  return null;
};

export default useModalGuide;
