import HoverWrapper from "@/components/styles/HoverWrapper";
import GotoPrevPhaseButtonVector from "./assets/GotoPrevPhaseButtonVector";
import { GotoPrevPhaseButtonPropsType } from "./types";

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
