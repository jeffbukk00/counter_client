import useCreationStart from "@/components/ui/creator/hooks/useCreationStart";
import { BoxDataType } from "../types";

import MotivationLinkCreationPhase from "./MotivationLinkCreationPhase";
import MotivationLinkCreationStart from "./MotivationLinkCreationStart";

const MotivationLinkCreator = ({ boxData }: { boxData: BoxDataType }) => {
  const { creationIsStarted, startCreation, finishCreation } =
    useCreationStart();

  return (
    <>
      {!creationIsStarted && (
        <MotivationLinkCreationStart startCreation={startCreation} />
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
