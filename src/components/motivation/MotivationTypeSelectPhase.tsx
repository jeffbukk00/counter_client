import { motivationConstants } from "./constants";

import ChangeToMotivationTextButtonVector from "./assets/ChangeToMotivationText";
import LinkVector from "@/shared/assets/link/LinkVector";
import useBoxGuide from "../ui/user-feedback/guide/hooks/useBoxGuide";
import { guideConstants } from "../ui/user-feedback/guide/constants";
import HoverWrapper from "../styles/HoverWrapper";

const MotivationTypeSelectPhase = ({
  changeMotivationType,
  boxId,
}: {
  changeMotivationType: (changedMotivationType: number) => void;
  boxId: string;
}) => {
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
