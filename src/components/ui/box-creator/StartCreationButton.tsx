import { StartCreationButtonPropsType } from "./types";

import StartCreationButtonVector from "./assets/StartCreationButtonVector";

const StartCreationButton = ({
  startCreation,
}: StartCreationButtonPropsType) => {
  return (
    <button
      onClick={startCreation}
      className="w-full h-full flex justify-center items-center"
    >
      <StartCreationButtonVector />
    </button>
  );
};

export default StartCreationButton;
