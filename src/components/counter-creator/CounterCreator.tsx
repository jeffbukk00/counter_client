import useCreationStart from "../ui/creator/hooks/useCreationStart";

import CounterCreationPhase from "./CounterCreationPhase";
import CounterCreationStart from "./CounterCreationStart";

// counter 생성을 위한 컴포넌트.
const CounterCreator = ({ bucketId }: { bucketId: string }) => {
  // counter 생성이 진행 중인지 상태를 관리하는 커스텀 훅.
  const { creationIsStarted, startCreation, finishCreation } =
    useCreationStart();

  return (
    <>
      {creationIsStarted && (
        <CounterCreationPhase
          finishCreation={finishCreation}
          bucketId={bucketId}
        />
      )}
      {!creationIsStarted && (
        <CounterCreationStart startCreation={startCreation} />
      )}
    </>
  );
};

export default CounterCreator;
