import { BoxDataType } from "../types";

import useCreationStart from "@/components/ui/creator/hooks/useCreationStart";

import MotivationTextCreationPhase from "./MotivationTextCreationPhase";
import MotivationTextCreationStart from "./MotivationTextCreationStart";

// motivationText를 생성하는 컴포넌트.
const MotivationTextCreator = ({ boxData }: { boxData: BoxDataType }) => {
  // motivationText 생성을 시작할지 여부에 대한 상태를 관리하는 커스텀 훅.
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
