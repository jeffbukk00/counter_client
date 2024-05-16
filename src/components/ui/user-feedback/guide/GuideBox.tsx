import { guideConstants } from "./constants";

import useMutationUpdateUnreadGuideIds from "@/contexts/user/hooks/http/useMutationUpdateUnreadGuideIds";
import useBoxGuideContext from "@/contexts/feedback/guide/box-guide/hooks/useBoxGuideContext";

const GuideBox = ({ unreadGuideId }: { unreadGuideId: string }) => {
  const { removeUnreadGuide } = useBoxGuideContext();
  const { mutateUpdateUnreadGuideIds } = useMutationUpdateUnreadGuideIds();

  const check = (guideId: string) => {
    mutateUpdateUnreadGuideIds(guideId);
    removeUnreadGuide(guideId);
  };

  return (
    <div key={unreadGuideId}>
      <div>
        <p>
          다음부터 표시하지 않길 원하신다면, 오른쪽 끝의 박스를 체크해주세요
        </p>
        <input type="checkbox" onChange={() => check(unreadGuideId)} />
      </div>
      <p>{guideConstants.guides[unreadGuideId].title}</p>
      <p>{guideConstants.guides[unreadGuideId].text}</p>
    </div>
  );
};

export default GuideBox;
