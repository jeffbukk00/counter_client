import { useEffect, useRef } from "react";

import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";
import useUserContext from "@/contexts/user/hooks/useUserContext";

// box-creator에 유저 가이드를 띄우는 역할을 하는 커스텀 훅.
const useBoxCreatorGuide = (guideId: string) => {
  // 중복해서 같은 유저 가이드를 띄우는 것들 방지하지 위한 변수.
  const countRef = useRef(0);

  // 유저가 아직 읽지 않은 가이드들의 id 목록.
  const { unreadGuideIds } = useUserContext();

  // box-creator에 대한 가이드들을 업데이트.
  const { updateBoxCreatorGuide } = useNotBoxGuideContext();

  // 띄우려는 유저 가이드가 유저가 이전에 읽지 않은 가이드인지 확인.
  const isUnread = unreadGuideIds.includes(guideId);

  useEffect(() => {
    if (isUnread && countRef.current === 0) {
      // 유저가 아직 읽지 않은 가이드라면, 가이드를 띄움.
      setTimeout(() => {
        countRef.current++;
        updateBoxCreatorGuide(true, guideId);
      }, 200);
    }

    return () => {
      updateBoxCreatorGuide(false, "");
    };
  }, [isUnread, updateBoxCreatorGuide, guideId]);

  return null;
};

export default useBoxCreatorGuide;
