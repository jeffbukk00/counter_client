import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";
import { guideConstants } from "./constants";
import useMutationUpdateUnreadGuideIds from "@/contexts/user/hooks/http/useMutationUpdateUnreadGuideIds";
import WarnTriangleVector from "@/shared/assets/warn/WarnTriangleVector";
import WarnCircleVector from "@/shared/assets/warn/WarnCircleVector";

const GuideBoxCreator = ({ unreadGuideId }: { unreadGuideId: string }) => {
  const { mutateUpdateUnreadGuideIds } = useMutationUpdateUnreadGuideIds();
  const { updateBoxCreatorGuide } = useNotBoxGuideContext();

  const check = () => {
    mutateUpdateUnreadGuideIds(unreadGuideId);
    updateBoxCreatorGuide(false, "");
  };

  return (
    <div
      key={unreadGuideId}
      className="border border-positive rounded-md w-80 p-2 flex flex-col"
    >
      <div className="flex justify-start items-center gap-1 mb-2 w-full">
        <WarnTriangleVector classes="w-7 h-7 inline-block" color="#7FD69D" />
        <div className="border border-gray-300 px-1 w-full flex justify-between items-center gap-2">
          <p className="text-xs font-medium">
            다음부터 이 가이드를 표시하지 않길 원합니다
          </p>
          <span className="mt-[3px]">
            <input
              type="checkbox"
              onChange={check}
              className="inline-block w-4 h-4 hover:cursor-pointer"
            />
          </span>
        </div>
      </div>
      <div className="w-full p-2 flex flex-col border border-gray-300">
        <div className="flex justify-start items-center gap-1 mt-1 mb-2">
          <WarnCircleVector
            classes="w-5 h-5 flex justify-center items-center"
            color="#7FD69D"
          />
          <p className="text-xs text-positive">
            {guideConstants.guides[unreadGuideId].title}
          </p>
        </div>
        <div className="border border-gray-300 p-2 w-full">
          <p className="text-xs  w-full whitespace-pre-wrap leading-4">
            {guideConstants.guides[unreadGuideId].text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideBoxCreator;
