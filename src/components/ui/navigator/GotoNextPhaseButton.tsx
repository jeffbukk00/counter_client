import HoverWrapper from "@/components/styles/HoverWrapper";
import GotoNextPhaseButtonVector from "./assets/GotoNextPhaseButtonVector";
import { GotoNextPhaseButtonPropsType } from "./types";

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
