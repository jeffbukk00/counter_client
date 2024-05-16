import useCreationStart from "../ui/creator/hooks/useCreationStart";

import CounterCreationPhase from "./CounterCreationPhase";
import CounterCreationStart from "./CounterCreationStart";

const CounterCreator = ({ bucketId }: { bucketId: string }) => {
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
