import { FinishCreationButtonPropsType } from "./types";

import CloseVector from "@/shared/assets/CloseVector";

const FinishCreationButton = ({
  finishCreation,
}: FinishCreationButtonPropsType) => {
  return (
    <button onClick={finishCreation}>
      <CloseVector classes="w-6 h-6 inline-block" />
    </button>
  );
};

export default FinishCreationButton;
