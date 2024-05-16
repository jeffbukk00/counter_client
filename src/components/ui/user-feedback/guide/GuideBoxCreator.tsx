import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";
import { guideConstants } from "./constants";
import useMutationUpdateUnreadGuideIds from "@/contexts/user/hooks/http/useMutationUpdateUnreadGuideIds";

const GuideBoxCreator = ({ unreadGuideId }: { unreadGuideId: string }) => {
  const { mutateUpdateUnreadGuideIds } = useMutationUpdateUnreadGuideIds();
  const { updateBoxCreatorGuide } = useNotBoxGuideContext();

  const check = () => {
    mutateUpdateUnreadGuideIds(unreadGuideId);
    updateBoxCreatorGuide(false, "");
  };

  return (
    <div key={unreadGuideId}>
      <div>
        <p>
          다음부터 표시하지 않길 원하신다면, 오른쪽 끝의 박스를 체크해주세요
        </p>
        <input type="checkbox" onChange={check} />
      </div>
      <p>{guideConstants.guides[unreadGuideId].title}</p>
      <p>{guideConstants.guides[unreadGuideId].text}</p>
    </div>
  );
};

export default GuideBoxCreator;
