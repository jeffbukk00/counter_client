import { FinishCreationButtonPropsType } from "./types";

import FinishCreationButtonVector from "./assets/FinishCreationButtonVector";

const FinishCreationButton = ({
  finishCreation,
}: FinishCreationButtonPropsType) => {
  return (
    <button onClick={finishCreation}>
      <FinishCreationButtonVector />
    </button>
  );
};

export default FinishCreationButton;
