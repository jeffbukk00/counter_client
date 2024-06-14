import { GotoNextPhaseButtonPropsType } from "./types";

import HoverWrapper from "@/components/styles/HoverWrapper";
import GotoNextPhaseButtonVector from "./assets/GotoNextPhaseButtonVector";

// 클릭하면, 네비게이터 상 다음 페이즈로 가는 버튼 컴포넌트.
const GotoNextPhaseButton = ({
  gotoNextPhase,
  classes,
}: GotoNextPhaseButtonPropsType) => {
  return (
    <HoverWrapper classes="p-1">
      <button onClick={gotoNextPhase}>
        <GotoNextPhaseButtonVector classes={classes} />
      </button>
    </HoverWrapper>
  );
};

export default GotoNextPhaseButton;
