import GotoPrevPhaseButtonVector from "./assets/GotoPrevPhaseButtonVector";
import { GotoPrevPhaseButtonPropsType } from "./types";

const GotoPrevPhaseButton = ({
  gotoPrevPhase,
}: GotoPrevPhaseButtonPropsType) => {
  return (
    <button onClick={gotoPrevPhase}>
      <GotoPrevPhaseButtonVector />
    </button>
  );
};

export default GotoPrevPhaseButton;
