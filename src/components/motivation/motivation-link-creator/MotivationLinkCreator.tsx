import { BoxDataType } from "../types";

import useCreationStart from "@/components/ui/creator/hooks/useCreationStart";

import MotivationLinkCreationPhase from "./MotivationLinkCreationPhase";
import MotivationLinkCreationStart from "./MotivationLinkCreationStart";

// motivationLink를 생성하는 컴포넌트.
const MotivationLinkCreator = ({ boxData }: { boxData: BoxDataType }) => {
  // motivationLink 생성을 시작할지 여부에 대한 상태를 관리하는 커스텀 훅.
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
