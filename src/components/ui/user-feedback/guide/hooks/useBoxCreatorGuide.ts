import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";
import useUserContext from "@/contexts/user/hooks/useUserContext";
import { useEffect, useRef } from "react";

const useBoxCreatorGuide = (guideId: string) => {
  const countRef = useRef(0);

  const { unreadGuideIds } = useUserContext();
  const { updateBoxCreatorGuide } = useNotBoxGuideContext();

  const isUnread = unreadGuideIds.includes(guideId);

  useEffect(() => {
    if (isUnread && countRef.current === 0) {
      countRef.current++;
      return updateBoxCreatorGuide(true, guideId);
    }
  }, [isUnread, updateBoxCreatorGuide, guideId]);

  return null;
};

export default useBoxCreatorGuide;
