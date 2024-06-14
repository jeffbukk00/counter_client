import { motivationConstants } from "./constants";
import { guideConstants } from "../ui/user-feedback/guide/constants";

import useBoxGuide from "../ui/user-feedback/guide/hooks/useBoxGuide";

import ChangeToMotivationTextButtonVector from "./assets/ChangeToMotivationText";
import LinkVector from "@/shared/assets/link/LinkVector";
import HoverWrapper from "../styles/HoverWrapper";

// 유저에게 보여줄 motivation 타입을 선택하는 페이즈.
// motivation의 타입이 "notSelected"일 때 이 컴포넌트가 해당.
const MotivationTypeSelectPhase = ({
  changeMotivationType,
  boxId,
}: {
  changeMotivationType: (changedMotivationType: number) => void;
  boxId: string;
}) => {
  // 유저가 화면 상에서 이 컴포넌트를 보게 되었을 때, 해당하는 가이드를 동반하여 표시하기 위해 호출.
  useBoxGuide(guideConstants.guideIds["guideId8"], boxId);

  return (
    <div className="w-full h-full grid grid-cols-2">
      <div className="flex justify-center items-center">
        <HoverWrapper classes="p-2">
          <button
            onClick={() =>
              changeMotivationType(motivationConstants.motivationType.text)
            }
            className="flex justify-center items-center gap-2"
          >
            <ChangeToMotivationTextButtonVector classes="w-7 h-7 inline-block" />
            <span>텍스트</span>
          </button>
        </HoverWrapper>
      </div>
      <div className="flex justify-center items-center">
        <HoverWrapper classes="p-2">
          <button
            onClick={() =>
              changeMotivationType(motivationConstants.motivationType.link)
            }
            className="flex justify-center items-center gap-2"
          >
            <LinkVector classes="w-7 h-7 inline-block" />
            <span>링크</span>
          </button>
        </HoverWrapper>
      </div>
    </div>
  );
};

export default MotivationTypeSelectPhase;
