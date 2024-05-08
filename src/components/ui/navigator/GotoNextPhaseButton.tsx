import GotoNextPhaseButtonVector from "./assets/GotoNextPhaseButtonVector";
import { GotoNextPhaseButtonPropsType } from "./types";

const GotoNextPhaseButton = ({
  gotoNextPhase,
}: GotoNextPhaseButtonPropsType) => {
  return (
    <button onClick={gotoNextPhase}>
      <GotoNextPhaseButtonVector />
    </button>
  );
};

export default GotoNextPhaseButton;
