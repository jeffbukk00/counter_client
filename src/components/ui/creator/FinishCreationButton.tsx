import HoverWrapper from "@/components/styles/HoverWrapper";
import { FinishCreationButtonPropsType } from "./types";

import CloseVector from "@/shared/assets/CloseVector";

const FinishCreationButton = ({
  finishCreation,
  classes,
  hover,
}: FinishCreationButtonPropsType) => {
  return (
    <HoverWrapper classes={`flex justify-center items-center ${hover}`}>
      <button
        className="flex justify-center items-center"
        onClick={finishCreation}
      >
        <CloseVector classes={classes} />
      </button>
    </HoverWrapper>
  );
};

export default FinishCreationButton;
