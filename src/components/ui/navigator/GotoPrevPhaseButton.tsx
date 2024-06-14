import { GotoPrevPhaseButtonPropsType } from "./types";

import HoverWrapper from "@/components/styles/HoverWrapper";
import GotoPrevPhaseButtonVector from "./assets/GotoPrevPhaseButtonVector";

// 클릭하면, 네비게이터 상 이전 페이즈로 가는 버튼 컴포넌트.
const GotoPrevPhaseButton = ({
  classes,
  gotoPrevPhase,
}: GotoPrevPhaseButtonPropsType) => {
  return (
    <HoverWrapper classes="p-1">
      <button onClick={gotoPrevPhase}>
        <GotoPrevPhaseButtonVector classes={classes} />
      </button>
    </HoverWrapper>
  );
};

export default GotoPrevPhaseButton;
