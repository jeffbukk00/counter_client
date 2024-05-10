import useCreationStart from "@/components/ui/creator/hooks/useCreationStart";
import { BoxDataType } from "../types";
import StartCreationButton from "@/components/ui/creator/StartCreationButton";
import MotivationTextCreationPhase from "./MotivationTextCreationPhase";

const MotivationTextCreator = ({ boxData }: { boxData: BoxDataType }) => {
  const { creationIsStarted, startCreation, finishCreation } =
    useCreationStart();

  return (
    <>
      {!creationIsStarted && (
        <StartCreationButton startCreation={startCreation} />
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
