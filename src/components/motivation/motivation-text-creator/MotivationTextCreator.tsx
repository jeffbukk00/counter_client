import useCreationStart from "@/components/ui/creator/hooks/useCreationStart";
import { BoxDataType } from "../types";

import MotivationTextCreationPhase from "./MotivationTextCreationPhase";
import MotivationTextCreationStart from "./MotivationTextCreationStart";

const MotivationTextCreator = ({ boxData }: { boxData: BoxDataType }) => {
  const { creationIsStarted, startCreation, finishCreation } =
    useCreationStart();

  return (
    <>
      {!creationIsStarted && (
        <MotivationTextCreationStart startCreation={startCreation} />
      )}
      {creationIsStarted && (
        <MotivationTextCreationPhase
          boxData={boxData}
          finishCreation={finishCreation}
        />
      )}
    </>
  );
};

export default MotivationTextCreator;
