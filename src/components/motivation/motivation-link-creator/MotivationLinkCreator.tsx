import useCreationStart from "@/components/ui/creator/hooks/useCreationStart";
import { BoxDataType } from "../types";
import StartCreationButton from "@/components/ui/creator/StartCreationButton";
import MotivationLinkCreationPhase from "./MotivationLinkCreationPhase";

const MotivationLinkCreator = ({ boxData }: { boxData: BoxDataType }) => {
  const { creationIsStarted, startCreation, finishCreation } =
    useCreationStart();

  return (
    <>
      {!creationIsStarted && (
        <StartCreationButton startCreation={startCreation} />
      )}
      {creationIsStarted && (
        <MotivationLinkCreationPhase
          boxData={boxData}
          finishCreation={finishCreation}
        />
      )}
    </>
  );
};

export default MotivationLinkCreator;
