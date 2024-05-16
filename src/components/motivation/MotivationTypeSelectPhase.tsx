import { motivationConstants } from "./constants";

import ChangeToMotivationTextButtonVector from "./assets/ChangeToMotivationText";
import LinkVector from "@/shared/assets/link/LinkVector";
import useBoxGuide from "../ui/user-feedback/guide/hooks/useBoxGuide";
import { guideConstants } from "../ui/user-feedback/guide/constants";

const MotivationTypeSelectPhase = ({
  changeMotivationType,
  boxId,
}: {
  changeMotivationType: (changedMotivationType: number) => void;
  boxId: string;
}) => {
  useBoxGuide(guideConstants.guideIds["guideId8"], boxId);

  return (
    <>
      <button
        onClick={() =>
          changeMotivationType(motivationConstants.motivationType.text)
        }
      >
        <ChangeToMotivationTextButtonVector />
        <span>텍스트</span>
      </button>
      <button
        onClick={() =>
          changeMotivationType(motivationConstants.motivationType.link)
        }
      >
        <LinkVector classes="w-6 h-6 inline-block" />
        <span>링크</span>
      </button>
    </>
  );
};

export default MotivationTypeSelectPhase;
