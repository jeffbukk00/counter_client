import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";
import useMutationUpdateUnreadGuideIds from "@/contexts/user/hooks/http/useMutationUpdateUnreadGuideIds";
import { guideConstants } from "./constants";

const GuideModal = ({ unreadGuideId }: { unreadGuideId: string }) => {
  const { mutateUpdateUnreadGuideIds } = useMutationUpdateUnreadGuideIds();
  const { updateModalGuide } = useNotBoxGuideContext();

  const check = () => {
    mutateUpdateUnreadGuideIds(unreadGuideId);
    updateModalGuide(false, "");
  };

  return (
    <div key={unreadGuideId}>
      <div>
        <p>
          다음부터 표시하지 않길 원하신다면, 오른쪽 끝의 박스를 체크해주세요
        </p>
        <input type="checkbox" onChange={check} />
      </div>
      <p>{guideConstants.guides[unreadGuideId]}</p>
    </div>
  );
};

export default GuideModal;
